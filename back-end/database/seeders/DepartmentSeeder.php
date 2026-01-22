<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Departments;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            ['name' => 'Khoa Nội'],
            ['name' => 'Khoa Ngoại'],
            ['name' => 'Khoa Phụ Sản'],
            ['name' => 'Khoa Nhi'],
        ];

        foreach ($departments as $dept) {
            Departments::firstOrCreate(['name' => $dept['name']]);
        }
    }
}
