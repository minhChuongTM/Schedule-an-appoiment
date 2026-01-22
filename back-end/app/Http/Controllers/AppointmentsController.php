<?php

namespace App\Http\Controllers;

use App\Models\Appointments;
use App\Models\Doctors;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AppointmentsController extends Controller
{
    /**
     * Tạo lịch hẹn mới (cho patient đã đăng nhập)
     */
    public function createAppointment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'nullable|exists:users,id|required_without:department_id',
            'department_id' => 'nullable|exists:departments,id|required_without:doctor_id',
            'appointment_date' => 'required|date|after:now',
            'reason' => 'nullable|string',
            'notes' => 'nullable|string',
        ], [
            'doctor_id.exists' => 'Bác sĩ không tồn tại',
            'doctor_id.required_without' => 'Vui lòng chọn bác sĩ hoặc khoa',
            'department_id.exists' => 'Khoa không tồn tại',
            'department_id.required_without' => 'Vui lòng chọn bác sĩ hoặc khoa',
            'appointment_date.required' => 'Ngày hẹn là bắt buộc',
            'appointment_date.date' => 'Ngày hẹn không hợp lệ',
            'appointment_date.after' => 'Ngày hẹn phải sau thời điểm hiện tại',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $appointmentDate = Carbon::parse($request->appointment_date);
            
            // Nếu chọn bác sĩ, kiểm tra bác sĩ có lịch trùng không
            if ($request->doctor_id) {
                // Lấy thông tin bác sĩ để lấy department_id
                $doctor = Doctors::find($request->doctor_id);
                if (!$doctor) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bác sĩ không tồn tại'
                    ], 404);
                }

                if ($doctor->status !== 'active') {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bác sĩ hiện không nhận lịch hẹn. Vui lòng chọn bác sĩ khác.'
                    ], 409);
                }

                // Kiểm tra lịch trùng (trong khoảng ±30 phút)
                $existingAppointment = Appointments::where('doctor_id', $request->doctor_id)
                    ->where('status', '!=', 'cancelled')
                    ->whereBetween('appointment_date', [
                        $appointmentDate->copy()->subMinutes(30),
                        $appointmentDate->copy()->addMinutes(30)
                    ])
                    ->first();

                if ($existingAppointment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bác sĩ đã có lịch hẹn vào thời gian này. Vui lòng chọn thời gian khác.',
                        'suggested_time' => $appointmentDate->copy()->addHour()->format('Y-m-d H:i:s')
                    ], 409);
                }

                // Tự động set department_id từ bác sĩ
                $departmentId = $doctor->department_id;
            } else {
                $departmentId = $request->department_id;
            }

            // Tạo appointment
            $appointment = Appointments::create([
                'patient_id' => $request->user()->id,
                'doctor_id' => $request->doctor_id,
                'department_id' => $departmentId,
                'appointment_date' => $appointmentDate,
                'reason' => $request->reason,
                'notes' => $request->notes,
                'status' => 'un-active', // Chờ xác nhận
            ]);

            // Notify Doctor if doctor_id is present
            if ($appointment->doctor_id) {
                Notification::create([
                    'user_id' => $appointment->doctor_id, // Doctor's user_id
                    'sender_id' => $request->user()->id,
                    'appointment_id' => $appointment->id,
                    'type' => 'appointment_request',
                    'title' => 'Lịch hẹn mới',
                    'message' => 'Bạn có một yêu cầu lịch hẹn mới từ ' . $request->user()->name,
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Đặt lịch hẹn thành công. Chúng tôi sẽ liên hệ với bạn sớm.',
                'data' => $appointment->load(['patient', 'doctor.user', 'department'])
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Đã có lỗi xảy ra khi đặt lịch',
                'error' => $e->getMessage()
            ], 500);
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

        return response()->json([
            'success' => true,
            'data' => $appointments
        ]);
    }

    /**
     * Lấy danh sách tất cả lịch hẹn (admin, doctor)
     */
    public function getAllAppointments(Request $request)
    {
        $query = Appointments::with(['patient', 'doctor.user', 'department']);

        // Nếu là doctor, chỉ xem lịch của mình
        if ($request->user()->role === 'doctor') {
            $query->where('doctor_id', $request->user()->id);
        }

        $appointments = $query->orderBy('appointment_date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $appointments
        ]);
    }

    /**
     * Cập nhật trạng thái lịch hẹn (admin, doctor)
     */
    public function updateAppointment(Request $request, $id)
    {
        $appointment = Appointments::find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy lịch hẹn'
            ], 404);
        }

        // Doctor chỉ được update lịch của mình
        if ($request->user()->role === 'doctor' && $appointment->doctor_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền cập nhật lịch hẹn này'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|in:un-active,active,completed,cancelled',
            'notes' => 'sometimes|nullable|string',
            'appointment_date' => 'sometimes|date|after:now',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $originalStatus = $appointment->status;

        $appointment->update($request->only(['status', 'notes', 'appointment_date']));

        // Notify Patient if status changed
        if ($request->has('status') && $originalStatus !== $request->status) {
            $title = 'Cập nhật lịch hẹn';
            $message = 'Trạng thái lịch hẹn của bạn đã thay đổi thành: ' . $request->status;
            $type = 'system';
            
            if ($request->status === 'active') { // Assuming 'active' means confirmed, based on logic
                $title = 'Lịch hẹn được xác nhận';
                $message = 'Bác sĩ đã chấp nhận lịch hẹn của bạn vào ' . $appointment->appointment_date;
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
            'data' => $appointment->load(['patient', 'doctor.user', 'department'])
        ]);
    }

    /**
     * Xóa lịch hẹn (admin, doctor)
     */
    public function deleteAppointment(Request $request, $id)
    {
        $appointment = Appointments::find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy lịch hẹn'
            ], 404);
        }

        // Doctor chỉ được xóa lịch của mình
        if ($request->user()->role === 'doctor' && $appointment->doctor_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền xóa lịch hẹn này'
            ], 403);
        }

        $appointment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa lịch hẹn thành công'
        ]);
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

        return response()->json([
            'success' => true,
            'data' => $doctors
        ]);
    }
}
