import React from "react";
import { Link } from "react-router-dom";
import HospitalBanner from "~/components/common/HospitalBanner";
import organizationImage from "~/assets/img/imgi_11_CO_CAU_TO_CHUC_11.2025.png";
import StickyMennu from "~/components/stickyMenu/StickyMennu";

const HospitalOrganization = () => {
  return (
    <>
      <HospitalBanner
        currentLabel="Cơ cấu tổ chức"
        title="Cơ cấu tổ chức"
        subtitle="Nơi hội tụ đội ngũ chuyên gia, công nghệ hiện đại và dịch vụ y tế chất lượng cao"
      />

      <section className="container my-5">
        <div className="row">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">
              CƠ CẤU <span style={{ color: 'var(--brandColor)' }}>TỔ CHỨC</span>
            </h2>

            {/* ORGANIZATION IMAGE */}
            <div className="text-center">
              <img
                src={organizationImage}
                alt="Cơ cấu tổ chức bệnh viện"
                className="img-fluid"
              />
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
                             fw-semibold text-decoration-none 
                             pb-2"
                  style={{ 
                    color: 'var(--brandColor)', 
                    borderBottom: '1px solid var(--brandColor)' 
                  }}
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

export default HospitalOrganization;
