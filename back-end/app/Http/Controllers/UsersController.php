<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Get all users (Admin only)
     */
    public function getUsers()
    {
        try {
            $users = User::select('id', 'name', 'email', 'phone', 'birthdate', 'gender', 'address', 'role', 'created_at', 'updated_at')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Không thể lấy danh sách người dùng',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user details by ID
     */
    public function getUserById($id)
    {
        try {
            $user = User::select('id', 'name', 'email', 'phone', 'birthdate', 'gender', 'address', 'role', 'created_at', 'updated_at')
                ->findOrFail($id);

            return response()->json($user, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update user role (Admin only)
     */
    public function updateUserRole(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|in:patient,doctor,admin'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = User::findOrFail($id);
            
            // Prevent admin from changing their own role
            if ($user->id === auth()->id()) {
                return response()->json([
                    'message' => 'Bạn không thể thay đổi vai trò của chính mình'
                ], 403);
            }

            $user->role = $request->role;
            $user->save();

            return response()->json([
                'message' => 'Cập nhật vai trò thành công',
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Không thể cập nhật vai trò',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete user (Admin only)
     */
    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Prevent admin from deleting themselves
            if ($user->id === auth()->id()) {
                return response()->json([
                    'message' => 'Bạn không thể xóa tài khoản của chính mình'
                ], 403);
            }

            $user->delete();

            return response()->json([
                'message' => 'Xóa người dùng thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Không thể xóa người dùng',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
