<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo tài khoản admin mặc định
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('admin123'),
                'birthdate' => '1990-01-01',
                'gender' => 'other',
                'phone' => '0123456789',
                'address' => 'Admin Address',
                'role' => 'admin',
            ]
        );

        $this->command->info('Tài khoản admin đã được tạo thành công!');
        $this->command->info('Email: admin@gmail.com');
        $this->command->info('Password: admin123');
    }
}

