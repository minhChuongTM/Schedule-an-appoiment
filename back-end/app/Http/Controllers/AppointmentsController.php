<?php

namespace App\Http\Controllers;

use App\Models\Appointments;
use App\Models\Doctors;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AppointmentsController extends Controller
{
    /**
     * Check if a specific time slot is available for a doctor.
     * @param int $doctorId
     * @param Carbon $appointmentDate
     * @param int|null $ignoreAppointmentId
     * @return bool
     */
    private function isSlotAvailable(int $doctorId, Carbon $appointmentDate, ?int $ignoreAppointmentId = null): bool
    {
        $query = Appointments::where('doctor_id', $doctorId)
            ->whereIn('status', ['active', 'un-active']) // Check against pending and confirmed appointments
            ->whereBetween('appointment_date', [
                $appointmentDate->copy()->subMinutes(29),
                $appointmentDate->copy()->addMinutes(29) // Check in a ~1 hour window
            ]);

        if ($ignoreAppointmentId) {
            $query->where('id', '!=', $ignoreAppointmentId);
        }

        return !$query->exists();
    }

    /**
     * Check if a specific time slot is available for a patient.
     * @param int $patientId
     * @param Carbon $appointmentDate
     * @param int|null $ignoreAppointmentId
     * @return bool
     */
    private function isPatientSlotAvailable(int $patientId, Carbon $appointmentDate, ?int $ignoreAppointmentId = null): bool
    {
        $query = Appointments::where('patient_id', $patientId)
            ->whereIn('status', ['active', 'un-active'])
            ->whereBetween('appointment_date', [
                $appointmentDate->copy()->subMinutes(29),
                $appointmentDate->copy()->addMinutes(29)
            ]);

        if ($ignoreAppointmentId) {
            $query->where('id', '!=', $ignoreAppointmentId);
        }

        return !$query->exists();
    }

    /**
     * Check if patient has any appointment on a specific day.
     * @param int $patientId
     * @param Carbon $appointmentDate
     * @param int|null $ignoreAppointmentId
     * @return bool
     */
    private function isPatientDayAvailable(int $patientId, Carbon $appointmentDate, ?int $ignoreAppointmentId = null): bool
    {
        $startOfDay = $appointmentDate->copy()->startOfDay();
        $endOfDay = $appointmentDate->copy()->endOfDay();

        $query = Appointments::where('patient_id', $patientId)
            ->whereIn('status', ['active', 'un-active'])
            ->whereBetween('appointment_date', [$startOfDay, $endOfDay]);

        if ($ignoreAppointmentId) {
            $query->where('id', '!=', $ignoreAppointmentId);
        }

        return !$query->exists();
    }

    /**
     * Tạo lịch hẹn mới (cho patient đã đăng nhập)
     */
    public function createAppointment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,user_id',
            'appointment_date' => 'required|date|after:now',
            'reason' => 'nullable|string',
            'notes' => 'nullable|string',
        ], [
            'doctor_id.required' => 'Vui lòng chọn một bác sĩ',
            'doctor_id.exists' => 'Bác sĩ được chọn không hợp lệ',
            'appointment_date.required' => 'Ngày hẹn là bắt buộc',
            'appointment_date.date' => 'Ngày hẹn không hợp lệ',
            'appointment_date.after' => 'Ngày hẹn phải sau thời điểm hiện tại',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        try {
            return DB::transaction(function () use ($request) {
                $appointmentDate = Carbon::parse($request->appointment_date);
                $doctor = Doctors::where('user_id', $request->doctor_id)->first();

                if (!$doctor || $doctor->status !== 'active') {
                    return response()->json(['success' => false, 'message' => 'Bác sĩ hiện không nhận lịch hẹn hoặc không tồn tại.'], 409);
                }

                if (!$this->isPatientDayAvailable($request->user()->id, $appointmentDate)) {
                    return response()->json(['success' => false, 'message' => 'Trong ngày bạn chỉ có thể đặt 1 lịch khám. Vui lòng chọn ngày khác.'], 409);
                }

                if (!$this->isSlotAvailable($doctor->user_id, $appointmentDate)) {
                    return response()->json(['success' => false, 'message' => 'Bác sĩ đã có lịch hẹn vào thời gian này. Vui lòng chọn thời gian khác.'], 409);
                }

                $appointment = Appointments::create([
                    'patient_id' => $request->user()->id,
                    'doctor_id' => $doctor->user_id,
                    'department_id' => $doctor->department_id,
                    'appointment_date' => $appointmentDate,
                    'reason' => $request->reason,
                    'notes' => $request->notes,
                    'status' => 'un-active', // Chờ xác nhận
                ]);

                Notification::create([
                    'user_id' => $appointment->doctor_id,
                    'sender_id' => $request->user()->id,
                    'appointment_id' => $appointment->id,
                    'type' => 'appointment_request',
                    'title' => 'Lịch hẹn mới',
                    'message' => 'Bạn có một yêu cầu lịch hẹn mới từ ' . $request->user()->name,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Đặt lịch hẹn thành công. Chúng tôi sẽ liên hệ với bạn sớm.',
                    'data' => $appointment->load(['patient', 'doctor.user', 'department'])
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Đã có lỗi xảy ra khi đặt lịch', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Lấy danh sách lịch hẹn của patient đang đăng nhập
     */
    public function getMyAppointments(Request $request)
    {
        $appointments = Appointments::where('patient_id', $request->user()->id)
            ->with(['doctor.user', 'department'])
            ->orderBy('appointment_date', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $appointments]);
    }

    /**
     * Lấy danh sách tất cả lịch hẹn (admin, doctor)
     */
    public function getAllAppointments(Request $request)
    {
        $query = Appointments::with(['patient', 'doctor.user', 'department']);

        if ($request->user()->role === 'doctor') {
            $query->where('doctor_id', $request->user()->id);
        }

        $appointments = $query->orderBy('appointment_date', 'desc')->get();

        return response()->json(['success' => true, 'data' => $appointments]);
    }

    /**
     * Cập nhật trạng thái lịch hẹn (admin, doctor)
     */
    public function updateAppointment(Request $request, $id)
    {
        $appointment = Appointments::find($id);

        if (!$appointment) {
            return response()->json(['success' => false, 'message' => 'Không tìm thấy lịch hẹn'], 404);
        }

        if ($request->user()->role === 'doctor' && $appointment->doctor_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền cập nhật lịch hẹn này'], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|in:un-active,active,completed,cancelled',
            'notes' => 'sometimes|nullable|string',
            'appointment_date' => 'sometimes|date|after_or_equal:now',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }
        
        try {
            return DB::transaction(function () use ($request, $appointment) {
                // Re-validate slot if date is changed
                if ($request->has('appointment_date') && $appointment->doctor_id) {
                    $newAppointmentDate = Carbon::parse($request->appointment_date);
                    if ($newAppointmentDate->toDateTimeString() !== $appointment->appointment_date->toDateTimeString()) {
                        if (!$this->isPatientDayAvailable($appointment->patient_id, $newAppointmentDate, $appointment->id)) {
                            throw new \Exception('Trong ngày bạn chỉ có thể đặt 1 lịch khám. Vui lòng chọn ngày khác.');
                        }
                        if (!$this->isSlotAvailable($appointment->doctor_id, $newAppointmentDate, $appointment->id)) {
                             // Using a direct return here breaks the transaction, so we throw an exception
                             throw new \Exception('Bác sĩ đã có lịch hẹn vào thời gian này. Vui lòng chọn thời gian khác.');
                        }
                    }
                }

                $originalStatus = $appointment->status;
                $appointment->update($request->only(['status', 'notes', 'appointment_date']));

                // Notify Patient if status changed
                if ($request->has('status') && $originalStatus !== $request->status) {
                    $title = 'Cập nhật lịch hẹn';
                    $message = 'Trạng thái lịch hẹn của bạn đã thay đổi thành: ' . $request->status;
                    $type = 'system';
                    
                    if ($request->status === 'active') {
                        $title = 'Lịch hẹn được xác nhận';
                        $message = 'Bác sĩ đã chấp nhận lịch hẹn của bạn vào ' . $appointment->appointment_date->format('H:i d/m/Y');
                        $type = 'appointment_confirmed';
                    } elseif ($request->status === 'cancelled') {
                        $title = 'Lịch hẹn bị hủy';
                        $message = 'Lịch hẹn của bạn đã bị hủy.';
                        $type = 'appointment_cancelled';
                    }

                    Notification::create([
                        'user_id' => $appointment->patient_id,
                        'sender_id' => $request->user()->id,
                        'appointment_id' => $appointment->id,
                        'type' => $type,
                        'title' => $title,
                        'message' => $message,
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Cập nhật lịch hẹn thành công',
                    'data' => $appointment->fresh()->load(['patient', 'doctor.user', 'department'])
                ]);
            });
        } catch (\Exception $e) {
             return response()->json(['success' => false, 'message' => $e->getMessage()], 409);
        }
    }

    /**
     * Xóa lịch hẹn (admin, doctor)
     */
    public function deleteAppointment(Request $request, $id)
    {
        $appointment = Appointments::find($id);

        if (!$appointment) {
            return response()->json(['success' => false, 'message' => 'Không tìm thấy lịch hẹn'], 404);
        }

        if ($request->user()->role === 'doctor' && $appointment->doctor_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền xóa lịch hẹn này'], 403);
        }

        $appointment->delete();

        return response()->json(['success' => true, 'message' => 'Xóa lịch hẹn thành công']);
    }

    /**
     * Lấy danh sách bác sĩ theo khoa (public)
     */
    public function getDoctorsByDepartment($departmentId)
    {
        $doctors = Doctors::where('department_id', $departmentId)
            ->where('status', 'active')
            ->with('user')
            ->get();

        return response()->json(['success' => true, 'data' => $doctors]);
    }

    /**
     * Lấy danh sách khung giờ bận của bác sĩ trong ngày (auth)
     */
    public function getDoctorAvailability(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,user_id',
            'date' => 'required|date',
        ], [
            'doctor_id.required' => 'Vui lòng chọn một bác sĩ',
            'doctor_id.exists' => 'Bác sĩ được chọn không hợp lệ',
            'date.required' => 'Ngày hẹn là bắt buộc',
            'date.date' => 'Ngày hẹn không hợp lệ',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $date = Carbon::parse($request->date);
        $startOfDay = $date->copy()->startOfDay();
        $endOfDay = $date->copy()->endOfDay();

        $appointments = Appointments::where('doctor_id', $request->doctor_id)
            ->whereIn('status', ['active', 'un-active'])
            ->whereBetween('appointment_date', [$startOfDay, $endOfDay])
            ->orderBy('appointment_date')
            ->get(['appointment_date']);

        $busyTimes = $appointments
            ->map(fn ($appointment) => Carbon::parse($appointment->appointment_date)->format('H:i'))
            ->unique()
            ->values();

        return response()->json([
            'success' => true,
            'data' => [
                'busy_times' => $busyTimes,
            ],
        ]);
    }
}
