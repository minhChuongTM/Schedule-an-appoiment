<?php

namespace App\Http\Controllers;

use App\Models\Patients;
use Illuminate\Http\Request;

class PatientsController extends Controller
{
    public function getPatients()
    {
        $patients = Patients::with('user')->get();

        return response()->json([
            'success' => true,
            'data' => $patients
        ]);
    }

    public function detailPatient($id)
    {
        $patient = Patients::with('user')->find($id);

        if (!$patient) {
            return response()->json([
                'success' => false,
                'message' => 'Patient not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $patient
        ]);
    }
}
