<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MedicalNews;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MedicalNewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy hoặc tạo user admin để làm tác giả
        $author = User::first();
        if (!$author) {
            $author = User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'), // password mặc định
                'role' => 'admin',
                'birthdate' => '1990-01-01',
                'gender' => 'male',
                'phone' => '0123456789'
            ]);
        }
        $authorId = $author->id;

        $news = [
            // TIN TỨC
            [
                'title' => 'Cảnh báo gia tăng bệnh hô hấp trong giai đoạn giao mùa',
                'category' => 'Tin tức',
                'image_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
                'content' => '
                    <p>Trong những ngày gần đây, số lượng bệnh nhân đến khám các bệnh lý về hô hấp tại bệnh viện tăng đột biến. Các bác sĩ khuyến cáo người dân cần chủ động phòng tránh.</p>
                    <p>Theo thống kê, mỗi ngày khoa Hô hấp tiếp nhận hơn 200 lượt bệnh nhân, tăng 30% so với tháng trước. Đa số các bệnh nhân nhập viện trong tình trạng ho kéo dài, sốt cao, khó thở.</p>
                    <h4>Các biện pháp phòng ngừa:</h4>
                    <ul>
                        <li>Giữ ấm cơ thể khi ra đường.</li>
                        <li>Đeo khẩu trang nơi đông người.</li>
                        <li>Bổ sung vitamin C và uống đủ nước.</li>
                    </ul>
                    <p>Bác sĩ CKII Nguyễn Văn A cho biết: "Thời tiết thay đổi thất thường là điều kiện thuận lợi cho vi khuẩn và virus phát triển. Người già và trẻ em là đối tượng dễ bị tấn công nhất."</p>
                ',
            ],
            [
                'title' => 'Ứng dụng công nghệ AI trong chẩn đoán hình ảnh sớm',
                'category' => 'Tin tức',
                'image_url' => 'https://images.unsplash.com/photo-1581056771107-24ca5f03386f?w=800&q=80',
                'content' => '
                    <p>Bệnh viện vừa chính thức đưa vào sử dụng hệ thống AI hỗ trợ chẩn đoán hình ảnh, giúp phát hiện sớm các khối u nhỏ mà mắt thường khó nhìn thấy.</p>
                    <p>Hệ thống này được tích hợp vào máy chụp CT và MRI, cho phép phân tích dữ liệu trong thời gian thực với độ chính xác lên đến 98%.</p>
                    <img src="https://images.unsplash.com/photo-1516549655169-df83a063b36c?w=800&q=80" alt="Công nghệ y tế">
                    <p>Đây là bước tiến lớn trong việc nâng cao chất lượng khám chữa bệnh, giúp bệnh nhân tiết kiệm thời gian và chi phí điều trị.</p>
                ',
            ],
            [
                'title' => 'Lịch nghỉ lễ và trực cấp cứu dịp Tết Nguyên Đán 2026',
                'category' => 'Tin tức',
                'image_url' => 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
                'content' => '
                    <p>Ban giám đốc Bệnh viện xin thông báo lịch nghỉ Tết Nguyên Đán 2026 tới toàn thể cán bộ nhân viên và Quý bệnh nhân như sau.</p>
                    <p><strong>Thời gian nghỉ:</strong> Từ ngày 16/02/2026 đến hết ngày 22/02/2026.</p>
                    <p>Trong thời gian nghỉ lễ, khoa Cấp cứu vẫn hoạt động 24/24 để phục vụ các trường hợp khẩn cấp.</p>
                ',
            ],

            // SỰ KIỆN
            [
                'title' => 'Hội thảo: "Dinh dưỡng hợp lý cho người bệnh tiểu đường"',
                'category' => 'Sự kiện',
                'image_url' => 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ff?w=800&q=80',
                'content' => '
                    <p>Kính mời Quý bệnh nhân và người nhà tham dự hội thảo miễn phí về dinh dưỡng cho người bệnh đái tháo đường.</p>
                    <ul>
                        <li><strong>Thời gian:</strong> 8:00 - 11:00, Chủ nhật ngày 25/01/2026</li>
                        <li><strong>Địa điểm:</strong> Hội trường A, Tầng 3 - Tòa nhà Chính</li>
                        <li><strong>Diễn giả:</strong> Chuyên gia dinh dưỡng Lê Thị C</li>
                    </ul>
                    <p>Tại hội thảo, người tham dự sẽ được tư vấn thực đơn mẫu và giải đáp các thắc mắc liên quan đến chế độ ăn uống hàng ngày.</p>
                ',
            ],
            [
                'title' => 'Lễ ký kết hợp tác chuyên môn với Bệnh viện Đại học Quốc Gia',
                'category' => 'Sự kiện',
                'image_url' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
                'content' => '
                    <p>Sáng nay, lễ ký kết thỏa thuận hợp tác toàn diện giữa Bệnh viện chúng tôi và Bệnh viện Đại học Quốc Gia đã diễn ra thành công tốt đẹp.</p>
                    <p>Hợp tác này mở ra cơ hội trao đổi chuyên môn, đào tạo nhân lực và chuyển giao các kỹ thuật y tế cao giữa hai đơn vị.</p>
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" alt="Lễ ký kết">
                ',
            ],
            [
                'title' => 'Chương trình Hiến máu tình nguyện: "Giọt hồng yêu thương"',
                'category' => 'Sự kiện',
                'image_url' => 'https://images.unsplash.com/photo-1615461066841-6116e61058f5?w=800&q=80',
                'content' => '
                    <p>Hưởng ứng ngày toàn dân hiến máu, bệnh viện tổ chức ngày hội hiến máu với sự tham gia của hơn 500 cán bộ nhân viên và người dân trong khu vực.</p>
                    <p>"Một giọt máu cho đi, một cuộc đời ở lại" - Hãy cùng chúng tôi lan tỏa thông điệp nhân văn này.</p>
                ',
            ],

            // BÁO CHÍ
            [
                'title' => '[VnExpress] Top 10 bệnh viện có chất lượng dịch vụ tốt nhất 2025',
                'category' => 'Báo chí',
                'image_url' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
                'content' => '
                    <p>Theo bình chọn mới nhất của độc giả báo VnExpress, Bệnh viện Team 4 vinh dự lọt vào Top 10 bệnh viện có dịch vụ chăm sóc khách hàng xuất sắc nhất năm 2025.</p>
                    <p>Bệnh viện được đánh giá cao ở quy trình khám chữa bệnh nhanh gọn, ứng dụng đặt lịch hẹn thông minh và thái độ phục vụ tận tình của đội ngũ y bác sĩ.</p>
                    <p><em>(Nguồn: VnExpress.net)</em></p>
                ',
            ],
            [
                'title' => '[Dân Trí] Phẫu thuật nội soi thành công ca bệnh hiếm gặp',
                'category' => 'Báo chí',
                'image_url' => 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
                'content' => '
                    <p>Báo Dân Trí đưa tin về ca phẫu thuật hy hữu vừa được thực hiện thành công tại khoa Ngoại tổng quát.</p>
                    <p>Bệnh nhân nam 45 tuổi nhập viện với khối u kích thước lớn chèn ép nội tạng. Sau 6 giờ căng thẳng, ê-kíp phẫu thuật đã loại bỏ hoàn toàn khối u bằng phương pháp nội soi xâm lấn tối thiểu.</p>
                    <p>Đây là minh chứng cho trình độ chuyên môn ngày càng cao của đội ngũ y bác sĩ tại bệnh viện.</p>
                ',
            ],

            // TUYỂN DỤNG
            [
                'title' => 'Tuyển dụng 05 Điều dưỡng viên khoa Nhi',
                'category' => 'Tuyển dụng',
                'image_url' => 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
                'content' => '
                    <p>Do nhu cầu mở rộng quy mô, khoa Nhi cần tuyển dụng thêm nhân sự với chế độ đãi ngộ hấp dẫn.</p>
                    <h4>Yêu cầu:</h4>
                    <ul>
                        <li>Tốt nghiệp Cao đẳng Điều dưỡng trở lên.</li>
                        <li>Có chứng chỉ hành nghề.</li>
                        <li>Yêu trẻ, kiên nhẫn và cẩn thận.</li>
                    </ul>
                    <h4>Quyền lợi:</h4>
                    <ul>
                        <li>Lương thưởng cạnh tranh + phụ cấp trực.</li>
                        <li>Bảo hiểm xã hội, bảo hiểm y tế đầy đủ.</li>
                        <li>Được đào tạo nâng cao chuyên môn định kỳ.</li>
                    </ul>
                    <p>Hồ sơ gửi về phòng Tổ chức cán bộ trước ngày 30/03/2026.</p>
                ',
            ],
            [
                'title' => 'Tìm kiếm đồng đội: Kỹ thuật viên xét nghiệm y học',
                'category' => 'Tuyển dụng',
                'image_url' => 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?w=800&q=80',
                'content' => '
                    <p>Khoa Xét nghiệm thông báo tuyển dụng 03 Kỹ thuật viên.</p>
                    <p>Công việc bao gồm thực hiện các xét nghiệm huyết học, sinh hóa, vi sinh theo quy trình chuẩn.</p>
                    <p>Yêu cầu: Có kinh nghiệm ít nhất 1 năm sử dụng các máy xét nghiệm tự động.</p>
                ',
            ],
        ];

        foreach ($news as $item) {
            MedicalNews::create(array_merge($item, [
                'author_id' => $authorId,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
