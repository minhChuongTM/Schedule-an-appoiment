<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Doctors;
use App\Models\Departments;
use Illuminate\Support\Facades\Hash;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $doctors = [
            [
                'name' => 'BS. Phùng Thị Hương',
                'email' => 'phungthihuong@hospital.vn',
                'birthdate' => '1985-03-15',
                'gender' => 'female',
                'phone' => '0901234567',
                'address' => 'Hà Nội',
                'department_id' => 1,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Trần Ngọc Thảo Linh',
                'email' => 'tranngocthaolinhd@hospital.vn',
                'birthdate' => '1982-07-20',
                'gender' => 'female',
                'phone' => '0901234568',
                'address' => 'Hà Nội',
                'department_id' => 2,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 7:30 - 16:30'
            ],
            [
                'name' => 'THS.BS. Hồ Chí Linh',
                'email' => 'hochilinhdoctor@hospital.vn',
                'birthdate' => '1988-11-10',
                'gender' => 'female',
                'phone' => '0901234569',
                'address' => 'TP. Hồ Chí Minh',
                'department_id' => 1,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 3 - Thứ 7, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Nguyễn Chí Quang',
                'email' => 'nguyenchiquangdr@hospital.vn',
                'birthdate' => '1980-05-25',
                'gender' => 'male',
                'phone' => '0901234570',
                'address' => 'Đà Nẵng',
                'department_id' => 3,
                'level' => 'Trưởng khoa',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS.CKII Nguyễn Việt Trung',
                'email' => 'nguyenviettrung@hospital.vn',
                'birthdate' => '1979-09-12',
                'gender' => 'male',
                'phone' => '0901234571',
                'address' => 'Hà Nội',
                'department_id' => 4,
                'level' => 'Phó trưởng khoa',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 7, 7:30 - 16:30'
            ],
            [
                'name' => 'THS.BS Nguyễn Huỳnh Hoàng Huy',
                'email' => 'nguyenhuynhhoanghuy@hospital.vn',
                'birthdate' => '1986-01-30',
                'gender' => 'male',
                'phone' => '0901234572',
                'address' => 'TP. Hồ Chí Minh',
                'department_id' => 1,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Trần Quang Sinh',
                'email' => 'tranquangsinh@hospital.vn',
                'birthdate' => '1984-04-18',
                'gender' => 'male',
                'phone' => '0901234573',
                'address' => 'Hải Phòng',
                'department_id' => 2,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 3 - Thứ 7, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Nguyễn Tăng Duy',
                'email' => 'nguyentangduy@hospital.vn',
                'birthdate' => '1987-12-05',
                'gender' => 'male',
                'phone' => '0901234574',
                'address' => 'Cần Thơ',
                'department_id' => 3,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 7:30 - 16:30'
            ],
            [
                'name' => 'BS. Lê Thị Minh Châu',
                'email' => 'lethiminhchau@hospital.vn',
                'birthdate' => '1990-06-22',
                'gender' => 'female',
                'phone' => '0901234575',
                'address' => 'Hà Nội',
                'department_id' => 4,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Võ Văn Hùng',
                'email' => 'vovanhung@hospital.vn',
                'birthdate' => '1983-08-14',
                'gender' => 'male',
                'phone' => '0901234576',
                'address' => 'Đà Nẵng',
                'department_id' => 1,
                'level' => 'Trưởng khoa',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 7, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Đặng Thu Hằng',
                'email' => 'dangthuhang@hospital.vn',
                'birthdate' => '1991-02-28',
                'gender' => 'female',
                'phone' => '0901234577',
                'address' => 'TP. Hồ Chí Minh',
                'department_id' => 2,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 3 - Thứ 7, 7:30 - 16:30'
            ],
            [
                'name' => 'THS.BS. Phan Minh Tuấn',
                'email' => 'phanminhtuan@hospital.vn',
                'birthdate' => '1981-10-09',
                'gender' => 'male',
                'phone' => '0901234578',
                'address' => 'Hải Phòng',
                'department_id' => 3,
                'level' => 'Phó trưởng khoa',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Nguyễn Thanh Hương',
                'email' => 'nguyenthanhhuong@hospital.vn',
                'birthdate' => '1989-07-03',
                'gender' => 'female',
                'phone' => '0901234579',
                'address' => 'Hà Nội',
                'department_id' => 4,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Hoàng Văn Khoa',
                'email' => 'hoangvankhoa@hospital.vn',
                'birthdate' => '1978-03-17',
                'gender' => 'male',
                'phone' => '0901234580',
                'address' => 'Đà Nẵng',
                'department_id' => 1,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 3 - Thứ 7, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Trần Thị Lan Anh',
                'email' => 'tranthilananh@hospital.vn',
                'birthdate' => '1992-11-20',
                'gender' => 'female',
                'phone' => '0901234581',
                'address' => 'TP. Hồ Chí Minh',
                'department_id' => 2,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 7:30 - 16:30'
            ],
            [
                'name' => 'THS.BS. Lý Quốc Tuấn',
                'email' => 'lyquoctuan@hospital.vn',
                'birthdate' => '1985-05-11',
                'gender' => 'male',
                'phone' => '0901234582',
                'address' => 'Cần Thơ',
                'department_id' => 3,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 7, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Mai Thị Bích Ngọc',
                'email' => 'maithibichngoc@hospital.vn',
                'birthdate' => '1993-09-25',
                'gender' => 'female',
                'phone' => '0901234583',
                'address' => 'Hà Nội',
                'department_id' => 4,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Ngô Đức Thắng',
                'email' => 'ngoducthang@hospital.vn',
                'birthdate' => '1980-01-08',
                'gender' => 'male',
                'phone' => '0901234584',
                'address' => 'Hải Phòng',
                'department_id' => 1,
                'level' => 'Phó trưởng khoa',
                'description' => 'Khung giờ làm việc: Thứ 3 - Thứ 7, 7:30 - 16:30'
            ],
            [
                'name' => 'BS. Phạm Thị Thu Hà',
                'email' => 'phamthithuha@hospital.vn',
                'birthdate' => '1991-06-16',
                'gender' => 'female',
                'phone' => '0901234585',
                'address' => 'Đà Nẵng',
                'department_id' => 2,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Đinh Văn Long',
                'email' => 'dinhvanlong@hospital.vn',
                'birthdate' => '1984-12-01',
                'gender' => 'male',
                'phone' => '0901234586',
                'address' => 'TP. Hồ Chí Minh',
                'department_id' => 3,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Vũ Thị Kim Oanh',
                'email' => 'vuthikimoanh@hospital.vn',
                'birthdate' => '1994-04-13',
                'gender' => 'female',
                'phone' => '0901234587',
                'address' => 'Hà Nội',
                'department_id' => 4,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 3 - Thứ 7, 7:30 - 16:30'
            ],
            [
                'name' => 'THS.BS. Bùi Minh Đức',
                'email' => 'buiminhduc@hospital.vn',
                'birthdate' => '1982-08-27',
                'gender' => 'male',
                'phone' => '0901234588',
                'address' => 'Cần Thơ',
                'department_id' => 1,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Lương Thị Mai Anh',
                'email' => 'luongthimaianh@hospital.vn',
                'birthdate' => '1990-10-19',
                'gender' => 'female',
                'phone' => '0901234589',
                'address' => 'Hải Phòng',
                'department_id' => 2,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 7, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Trịnh Quang Huy',
                'email' => 'trinhquanghuy@hospital.vn',
                'birthdate' => '1986-02-14',
                'gender' => 'male',
                'phone' => '0901234590',
                'address' => 'Đà Nẵng',
                'department_id' => 3,
                'level' => 'Trưởng khoa',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Đỗ Thị Ngọc Diệp',
                'email' => 'dothingocdiep@hospital.vn',
                'birthdate' => '1993-07-08',
                'gender' => 'female',
                'phone' => '0901234591',
                'address' => 'TP. Hồ Chí Minh',
                'department_id' => 4,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 3 - Thứ 7, 7:30 - 16:30'
            ],
            [
                'name' => 'THS.BS. Nguyễn Văn Thành',
                'email' => 'nguyenvanthanh@hospital.vn',
                'birthdate' => '1981-11-23',
                'gender' => 'male',
                'phone' => '0901234592',
                'address' => 'Hà Nội',
                'department_id' => 1,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Hồ Thị Phương Thảo',
                'email' => 'hothiphuongthao@hospital.vn',
                'birthdate' => '1992-05-06',
                'gender' => 'female',
                'phone' => '0901234593',
                'address' => 'Cần Thơ',
                'department_id' => 2,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00'
            ],
            [
                'name' => 'THS.BS. Cao Minh Tuấn',
                'email' => 'caominhtuan@hospital.vn',
                'birthdate' => '1983-09-30',
                'gender' => 'male',
                'phone' => '0901234594',
                'address' => 'Hải Phòng',
                'department_id' => 3,
                'level' => 'Phó trưởng khoa',
                'description' => 'Khung giờ làm việc: Thứ 3 - Thứ 7, 8:00 - 17:00'
            ],
            [
                'name' => 'BS. Phan Thị Hồng Nhung',
                'email' => 'phanthihongnhung@hospital.vn',
                'birthdate' => '1995-01-21',
                'gender' => 'female',
                'phone' => '0901234595',
                'address' => 'Đà Nẵng',
                'department_id' => 4,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 7:30 - 16:30'
            ],
            [
                'name' => 'THS.BS. Lê Quang Minh',
                'email' => 'lequangminh@hospital.vn',
                'birthdate' => '1987-03-04',
                'gender' => 'male',
                'phone' => '0901234596',
                'address' => 'TP. Hồ Chí Minh',
                'department_id' => 1,
                'level' => 'Bác sĩ điều trị',
                'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 7, 8:00 - 17:00'
            ],
        ];

        $avatarUrl = 'https://bvbinhdan.com.vn/vnt_upload/treatment/thumbs/(270x320)__OQ6UTW0.jpg';

        $departmentIds = Departments::pluck('id')->all();
        if (empty($departmentIds)) {
            $departmentIds = [1];
        }
        foreach ($doctors as $doctorData) {
            $user = User::updateOrCreate(
                ['email' => $doctorData['email']],
                [
                    'name' => $doctorData['name'],
                    'password' => Hash::make('1234567'),
                    'birthdate' => $doctorData['birthdate'],
                    'gender' => $doctorData['gender'],
                    'phone' => $doctorData['phone'],
                    'address' => $doctorData['address'],
                    'avatar_url' => $avatarUrl,
                    'role' => 'doctor',
                ]
            );

            Doctors::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'department_id' => $doctorData['department_id'],
                    'level' => $doctorData['level'],
                    'description' => $doctorData['description'],
                    'status' => 'active',
                ]
            );
        }

        $faker = \Faker\Factory::create('vi_VN');
        $levels = ['Bác sĩ điều trị', 'Phó trưởng khoa', 'Trưởng khoa'];
        $targetCount = 100;
        $currentDoctorCount = Doctors::count();

        if ($currentDoctorCount < $targetCount) {
            $created = 0;
            $index = $currentDoctorCount + 1;

            while (($currentDoctorCount + $created) < $targetCount) {
                $email = 'doctor' . str_pad((string) $index, 3, '0', STR_PAD_LEFT) . '@hospital.vn';
                if (User::where('email', $email)->exists()) {
                    $index++;
                    continue;
                }

                $gender = $faker->randomElement(['male', 'female']);
                $user = User::create([
                    'name' => 'BS. ' . $faker->name($gender === 'male' ? 'male' : 'female'),
                    'email' => $email,
                    'password' => Hash::make('1234567'),
                    'birthdate' => $faker->date('Y-m-d', '-30 years'),
                    'gender' => $gender,
                    'phone' => $faker->numerify('09########'),
                    'address' => $faker->randomElement(['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng']),
                    'avatar_url' => $avatarUrl,
                    'role' => 'doctor',
                ]);

                Doctors::create([
                    'user_id' => $user->id,
                    'department_id' => $faker->randomElement($departmentIds),
                    'level' => $faker->randomElement($levels),
                    'description' => 'Khung giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00',
                    'status' => 'active',
                ]);

                $created++;
                $index++;
            }
        }

        $this->command->info('Đã seed tối đa 100 bác sĩ.');
    }
}
