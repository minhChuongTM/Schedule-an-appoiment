import React from "react";
import { Link } from "react-router-dom";
import HospitalBanner from "~/components/common/HospitalBanner";
import StickyMennu from "~/components/stickyMenu/StickyMennu";

const HospitalHotline = () => {
  return (
    <>
      <HospitalBanner
        currentLabel="Đường dây nóng"
        title="Đường dây nóng"
        subtitle="Nơi hội tụ đội ngũ chuyên gia, công nghệ hiện đại và dịch vụ y tế chất lượng cao"
      />

      <section className="container my-5">
        <div className="row">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">
              ĐƯỜNG DÂY <span style={{ color: 'var(--brandColor)' }}>NÓNG</span>
            </h2>

            {/* TỔNG ĐÀI CHĂM SÓC KHÁCH HÀNG */}
            <div className="mb-5">
              <h5 className="fw-semibold text-uppercase mb-3">
                Tổng đài chăm sóc khách hàng
              </h5>

              <ul className="list-unstyled text-secondary">
                <li className="mb-2">
                   <strong>Tổng đài chính:</strong> 028 3839 4747
                </li>
                <li className="mb-2">
                   <strong>Hỗ trợ đặt lịch khám:</strong> 028 3839 1111
                </li>
                <li className="mb-2">
                   <strong>Email:</strong> cskh@binhdanhospital.vn
                </li>
                <li>
                   <strong>Thời gian làm việc:</strong> Thứ 2 – Thứ 6 (7:30 – 16:30)
                </li>
              </ul>
            </div>

            {/* CÁC ĐƯỜNG DÂY NÓNG */}
            <div>
              <h5 className="fw-semibold text-uppercase mb-3">
                Các đường dây nóng
              </h5>

              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Khoa / Bộ phận</th>
                      <th>Số điện thoại</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ban Giám đốc</td>
                      <td>028 3839 2222</td>
                    </tr>
                    <tr>
                      <td>Khoa Cấp cứu</td>
                      <td className="fw-bold text-danger">115</td>
                    </tr>
                    <tr>
                      <td>Khoa Khám bệnh</td>
                      <td>028 3839 3333</td>
                    </tr>
                    <tr>
                      <td>Khoa Ngoại tổng quát</td>
                      <td>028 3839 4444</td>
                    </tr>
                    <tr>
                      <td>Phòng Công tác xã hội</td>
                      <td>028 3839 5555</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                             text-dark text-decoration-none 
                             border-bottom border-dark pb-2"
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
                             fw-semibold text-decoration-none 
                             pb-2"
                  style={{ 
                    color: 'var(--brandColor)', 
                    borderBottom: '1px solid var(--brandColor)' 
                  }}
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

export default HospitalHotline;
