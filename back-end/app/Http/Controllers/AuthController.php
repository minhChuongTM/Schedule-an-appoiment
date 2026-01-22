<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Patients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

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
                'role' => 'patient',
            ]);

            Patients::create([
                'user_id' => $user->id,
            ]);

            // Create token for auto-login
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Đăng ký tài khoản bệnh nhân thành công',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Đã có lỗi xảy ra',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email hoặc mật khẩu không đúng'
            ], 401);
        }

        // Tạo token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công'
        ], 200);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Không tồn tại người dùng'
            ], 401);
        }
        
        if ($request->isMethod('put')) {
            $data = $request->validate([
                'birthdate'  => 'sometimes|date_format:Y-m-d',
                'gender'     => 'sometimes|in:male,female,other',
                'phone'      => 'sometimes|nullable|string|max:20',
                'address'    => 'sometimes|nullable|string',
                'avatar_url' => 'sometimes|nullable|string|max:512',
            ]);

            $user->update($data);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user->fresh()
            ]
        ]);
    }

    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Không tồn tại người dùng'
            ], 401);
        }

        try {
            $user->tokens()->delete();

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa tài khoản thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Đã có lỗi xảy ra',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
