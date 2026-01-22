<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MedicalNewsController;
use App\Http\Controllers\NotificationController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API is working']);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::match(['get', 'put'], '/me', [AuthController::class, 'me']);
        Route::delete('/delete-account', [AuthController::class, 'deleteAccount']);
    });
});

// Public routes - không cần authentication
Route::get('/doctors', [DoctorsController::class, 'getDoctors']);
Route::get('/doctors/{id}', [DoctorsController::class, 'detailDoctor']);
Route::get('/departments', [DepartmentsController::class, 'getDepartments']);
Route::get('/departments/{departmentId}/doctors', [AppointmentsController::class, 'getDoctorsByDepartment']);
Route::get('/medical', [MedicalNewsController::class, 'index']);
Route::get('/medical-news', [MedicalNewsController::class, 'index']);
Route::get('/medical/{id}', [MedicalNewsController::class, 'show']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/appointments', [AppointmentsController::class, 'createAppointment']);
    Route::get('/my-appointments', [AppointmentsController::class, 'getMyAppointments']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
});

Route::middleware(['auth:sanctum', 'role:admin,doctor'])->group(function () {
    Route::get('/patients', [PatientsController::class, 'getPatients']);
    Route::get('/patients/{id}', [PatientsController::class, 'detailPatient']);
    Route::get('/appointments', [AppointmentsController::class, 'getAllAppointments']);
    Route::put('/appointments/{id}', [AppointmentsController::class, 'updateAppointment']);
    Route::delete('/appointments/{id}', [AppointmentsController::class, 'deleteAppointment']);
    Route::get('/departments/{id}', [DepartmentsController::class, 'detailDepartment']);

    // Medical News protected routes
    Route::post('/medical-news', [MedicalNewsController::class, 'store']);
    Route::put('/medical-news/{id}', [MedicalNewsController::class, 'update']);
    Route::delete('/medical-news/{id}', [MedicalNewsController::class, 'destroy']);
});

Route::middleware('auth:sanctum', 'role:admin')->prefix('admin')->group(function () {
    Route::post('/register/doctor', [DoctorsController::class, 'registerDoctor']);
    Route::put('/doctors/{id}', [DoctorsController::class, 'updateDoctor']);
    Route::delete('/doctors/{id}', [DoctorsController::class, 'deleteDoctor']);
    Route::post('/register/department', [DepartmentsController::class, 'registerDepartment']);
    Route::put('/departments/{id}', [DepartmentsController::class, 'updateDepartment']);
    Route::delete('/departments/{id}', [DepartmentsController::class, 'deleteDepartment']);

    // Users management
    Route::get('/users', [UsersController::class, 'getUsers']);
    Route::get('/users/{id}', [UsersController::class, 'getUserById']);
    Route::put('/users/{id}/role', [UsersController::class, 'updateUserRole']);
    Route::delete('/users/{id}', [UsersController::class, 'deleteUser']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'getStats']);
});