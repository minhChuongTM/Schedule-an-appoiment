<?php

namespace App\Http\Controllers;

use App\Models\Doctors;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DoctorsController extends Controller
{
    public function getDoctors(Request $request)
    {
        $perPage = $request->input('per_page', 12);
        $doctors = Doctors::with(['user', 'department'])
            ->where('status', 'active');

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $doctors->where(function ($query) use ($searchTerm) {
                $query->whereHas('user', function ($q) use ($searchTerm) {
                    $q->where('name', 'like', "%{$searchTerm}%");
                })->orWhereHas('department', function ($q) use ($searchTerm) {
                    $q->where('name', 'like', "%{$searchTerm}%");
                });
            });
        }

        $doctors = $doctors->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $doctors
        ]);
    }

    public function detailDoctor($id)
    {
        $doctor = Doctors::with(['user', 'department'])->find($id);

        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $doctor
        ]);
    }

    public function registerDoctor(Request $request) // Chỉ cho admin
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'birthdate' => 'required|date_format:Y-m-d',
            'gender' => 'required|in:male,female,other',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'avatar_url' => 'nullable|string|max:512',
            'department_id' => 'required|exists:departments,id',
            'level' => ['required', 'string', Rule::in(['Trưởng khoa', 'Phó trưởng khoa', 'Bác sĩ điều trị'])],
            'description' => 'nullable|string',
        ], [
            'name.required' => 'Tên là bắt buộc',
            'email.required' => 'Email là bắt buộc',
            'email.email' => 'Email không hợp lệ',
            'email.unique' => 'Email đã được sử dụng',
            'password.required' => 'Mật khẩu là bắt buộc',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp',
            'birthdate.required' => 'Ngày sinh là bắt buộc',
            'birthdate.date_format' => 'Ngày sinh phải có định dạng YYYY-MM-DD (ví dụ: 2000-01-31)',
            'gender.required' => 'Giới tính là bắt buộc',
            'gender.in' => 'Giới tính phải là male, female hoặc other',
            'department_id.required' => 'Khoa là bắt buộc',
            'department_id.exists' => 'Khoa không tồn tại',
            'level.required' => 'Trình độ là bắt buộc',
            'level.in' => 'Trình độ phải là Trưởng khoa, Phó trưởng khoa hoặc bác sĩ điều trị',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'birthdate' => $request->birthdate,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'address' => $request->address,
                'avatar_url' => $request->avatar_url ?? 'https://res.cloudinary.com/dokyanh220/image/upload/v1767707662/453178253_471506465671661_2781666950760530985_n_bacb7s.png',
                'role' => 'doctor',
            ]);

            Doctors::create([
                'user_id' => $user->id,
                'department_id' => $request->department_id,
                'level' => $request->level,
                'description' => $request->description,
                'status' => 'active',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Tạo tài khoản bác sĩ thành công',
                'data' => [
                    'user' => $user->load('doctor'),
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Register Doctor Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Đã có lỗi xảy ra khi tạo bác sĩ',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateDoctor(Request $request, $id)
    {
        $doctor = Doctors::with('user')->find($id);
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not found'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($doctor->user_id)],
            'birthdate' => 'sometimes|required|date_format:Y-m-d',
            'gender' => 'sometimes|required|in:male,female,other',
            'phone' => 'sometimes|nullable|string|max:20',
            'address' => 'sometimes|nullable|string',
            'avatar_url' => 'sometimes|nullable|string|max:512',
            'department_id' => 'sometimes|required|exists:departments,id',
            'level' => ['sometimes', 'required', 'string', Rule::in(['Trưởng khoa', 'Phó trưởng khoa', 'Bác sĩ điều trị'])],
            'description' => 'sometimes|nullable|string',
            'status' => ['sometimes', 'required', 'string', Rule::in(['active', 'un-active'])],
        ], [
            'email.unique' => 'Email đã được sử dụng',
            'birthdate.date_format' => 'Ngày sinh phải có định dạng YYYY-MM-DD (ví dụ: 2000-01-31)',
            'gender.in' => 'Giới tính phải là male, female hoặc other',
            'department_id.exists' => 'Khoa không tồn tại',
            'level.in' => 'Trình độ phải là Trưởng khoa, Phó trưởng khoa hoặc bác sĩ điều trị',
            'status.in' => 'Trạng thái phải là active hoặc un-active',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $userData = $request->only(['name', 'email', 'birthdate', 'gender', 'phone', 'address', 'avatar_url']);
        $doctorData = $request->only(['department_id', 'level', 'description', 'status']);

        if (!empty($userData)) {
            $doctor->user->update($userData);
        }

        if (!empty($doctorData)) {
            $doctor->update($doctorData);
        }

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật bác sĩ thành công',
            'data' => $doctor
        ]);
    }

    public function deleteDoctor($id)
    {
        $doctor = Doctors::with('user')->find($id);
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bác sĩ'
            ], 404);
        }

        $doctor->user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xoa bác sĩ thành công'
        ]);
    }
}
