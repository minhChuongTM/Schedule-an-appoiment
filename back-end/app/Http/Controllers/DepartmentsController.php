<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\Request;

class DepartmentsController extends Controller
{
    public function getDepartments()
    {
        $departments = Departments::all();

        return response()->json([
            'success' => true,
            'data' => $departments
        ]);
    }

    public function detailDepartment($id)
    {
        $department = Departments::find($id);

        if (!$department) {
            return response()->json([
                'success' => false,
                'message' => 'Department not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $department
        ]);
    }

    public function registerDepartment(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
            'description' => 'nullable|string',
        ], [
            'name.required' => 'Tên khoa là bắt buộc',
            'name.unique' => 'Khoa đã tồn tại',
        ]);

        $department = Departments::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'success' => true,
            'data' => $department
        ], 201);
    }

    public function updateDepartment(Request $request, $id)
    {
        $department = Departments::find($id);

        if (!$department) {
            return response()->json([
                'success' => false,
                'message' => 'Khoa không tồn tại'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:departments,name,' . $id,
            'description' => 'nullable|string',
        ], [
            'name.required' => 'Tên khoa là bắt buộc',
            'name.unique' => 'Khoa đã tồn tại',
        ]);

        $department->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật khoa thành công',
            'data' => $department
        ]);
    }

    public function deleteDepartment($id)
    {
        $department = Departments::find($id);

        if (!$department) {
            return response()->json([
                'success' => false,
                'message' => 'Khoa không tồn tại'
            ], 404);
        }

        $department->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa khoa thành công'
        ]);
    }
}
