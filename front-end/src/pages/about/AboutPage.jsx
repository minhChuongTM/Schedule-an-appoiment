import React from "react";
import { Link } from "react-router-dom";
import hospitalImage from '../../assets/img/imgi_11_img1.jpg'
import HospitalBanner from "~/components/common/HospitalBanner";
import StickyMennu from "~/components/stickyMenu/StickyMennu";

const HospitalOverview = () => {
  return (
    <>
      {/* Banner */}
      <HospitalBanner
        title="Tổng quan bệnh viện"
        subtitle="Nơi hội tụ đội ngũ chuyên gia, công nghệ hiện đại và dịch vụ y tế chất lượng cao"
      />

      <section className="container my-5">
        <div className="row">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            {/* Title */}
            <h2 className="fw-bold mb-2">
              BỆNH VIỆN <span style={{ color: 'var(--brandColor)' }}>BÌNH DÂN</span>
            </h2>
            <p className="text-muted mb-4">
              Bệnh viện hàng đầu về phẫu thuật Tổng quát & Tiết niệu
            </p>

            {/* Image */}
            <div className="mb-4">
              <img
                src={hospitalImage}
                alt="Bệnh viện"
                className="img-fluid"
              />
            </div>

            {/* Text content */}
            <div className="text-secondary" style={{ lineHeight: "1.8" }}>
              <p>
                Thành lập từ năm 1954, Bệnh viện là một trong những cơ sở y tế
                chuyên sâu về ngoại khoa tại khu vực phía Nam. Trải qua nhiều
                giai đoạn phát triển, bệnh viện không ngừng nâng cao chất lượng
                chuyên môn và dịch vụ chăm sóc người bệnh.
              </p>

              <p>
                Hiện nay, bệnh viện có quy mô lớn với hơn 1.200 giường bệnh, mỗi
                năm tiếp nhận hàng trăm nghìn lượt khám ngoại trú và điều trị
                nội trú. Số lượng ca phẫu thuật thực hiện hàng năm lên đến hàng
                chục nghìn ca, trong đó có nhiều kỹ thuật cao và phẫu thuật
                chuyên sâu.
              </p>

              <p>
                Các chuyên ngành mũi nhọn bao gồm Ngoại tổng quát, Ngoại tiết
                niệu – Nam khoa, Ngoại lồng ngực và mạch máu, Gây mê hồi sức.
                Bệnh viện đồng thời là cơ sở đào tạo thực hành cho nhiều trường
                đại học y khoa.
              </p>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-lg-4">
            <h6 className="fw-bold text-uppercase mb-3" style={{ color: 'var(--brandColor)' }}>
              Giới thiệu
            </h6>

            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to="/gioi-thieu"
                  className="d-flex justify-content-between align-items-center 
                             fw-semibold text-decoration-none 
                             pb-2"
                  style={{ 
                    color: 'var(--brandColor)', 
                    borderBottom: '1px solid var(--brandColor)' 
                  }}
                >
                  <span>Tổng quan bệnh viện</span>
                  <span>›</span>
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/gioi-thieu/co-cau-to-chuc"
                  className="d-flex justify-content-between align-items-center 
                             text-dark text-decoration-none 
                             border-bottom border-dark pb-2"
                >
                  <span>Cơ cấu tổ chức</span>
                  <span>›</span>
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/gioi-thieu/chinh-sach-chat-luong"
                  className="d-flex justify-content-between align-items-center 
                             text-dark text-decoration-none 
                             border-bottom border-dark pb-2"
                >
                  <span>Chính sách chất lượng</span>
                  <span>›</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/gioi-thieu/duong-day-nong"
                  className="d-flex justify-content-between align-items-center 
                             text-dark text-decoration-none 
                             border-bottom border-dark pb-2"
                >
                  <span>Đường dây nóng</span>
                  <span>›</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <StickyMennu/>
    </>
  );
};

export default HospitalOverview;
