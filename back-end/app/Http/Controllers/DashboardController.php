<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Doctors;
use App\Models\Patients;
use App\Models\Appointments;
use App\Models\Departments;

class DashboardController extends Controller
{
    public function getStats()
    {
        try {
            $stats = [
                'doctors' => Doctors::count(),
                'patients' => Patients::count(),
                'appointments' => Appointments::count(), // Total appointments
                'today_appointments' => Appointments::whereDate('appointment_date', today())->count(),
                'departments' => Departments::count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy thống kê: ' . $e->getMessage()
            ], 500);
        }
    }
}
