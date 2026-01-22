<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Patients;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = [
            [
                'name' => 'Bệnh nhân mẫu 1',
                'email' => 'user1@gmail.com',
                'password' => Hash::make('1234567'),
                'birthdate' => '1995-01-01',
                'gender' => 'male',
                'phone' => '0912345678',
                'address' => 'Hà Nội',
            ],
            [
                'name' => 'Bệnh nhân mẫu 2',
                'email' => 'user2@gmail.com',
                'password' => Hash::make('1234567'),
                'birthdate' => '1998-05-20',
                'gender' => 'female',
                'phone' => '0912345679',
                'address' => 'TP. Hồ Chí Minh',
            ],
        ];

        foreach ($patients as $data) {
            $user = User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => $data['password'],
                    'birthdate' => $data['birthdate'],
                    'gender' => $data['gender'],
                    'phone' => $data['phone'],
                    'address' => $data['address'],
                    'role' => 'patient',
                ]
            );

            Patients::updateOrCreate(
                ['user_id' => $user->id],
                []
            );
        }
    }
}
