import React from "react";
import { Link } from "react-router-dom";
import HospitalBanner from "~/components/common/HospitalBanner";
import StickyMennu from "~/components/stickyMenu/StickyMennu";

const HospitalQualityPolicy = () => {
  return (
    <>
      <HospitalBanner
        currentLabel="Chính sách chất lượng"
        title="Chính sách chất lượng"
        subtitle="Nơi hội tụ đội ngũ chuyên gia, công nghệ hiện đại và dịch vụ y tế chất lượng cao"
      />

      <section className="container my-5">
        <div className="row">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">
              CHÍNH SÁCH <span style={{ color: 'var(--brandColor)' }}>CHẤT LƯỢNG</span>
            </h2>

            {/* CHUYÊN NGHIỆP */}
            <div className="mb-4">
              <h5 className="fw-bold d-flex align-items-center">
                <span className="me-2 text-primary">•</span>
                CHUYÊN NGHIỆP
              </h5>
              <ul className="text-secondary mt-2" style={{ lineHeight: 1.8 }}>
                <li>
                  Chuyên nghiệp trong mọi tác phong, thái độ đối với người bệnh,
                  thân nhân và đồng nghiệp.
                </li>
                <li>
                  Chuyên nghiệp hóa mọi quy trình chăm sóc, điều trị người bệnh
                  và hệ thống quản lý.
                </li>
              </ul>
            </div>

            {/* CHUYÊN SÂU */}
            <div className="mb-4">
              <h5 className="fw-bold d-flex align-items-center">
                <span className="me-2 text-primary">•</span>
                CHUYÊN SÂU
              </h5>
              <ul className="text-secondary mt-2" style={{ lineHeight: 1.8 }}>
                <li>
                  Liên tục phát triển những quy trình kỹ thuật chuyên sâu trong
                  chẩn đoán và điều trị người bệnh.
                </li>
                <li>
                  Chủ động, tích cực phát triển các chuyên ngành chuyên sâu theo
                  kịp trình độ các nước tiên tiến trên thế giới.
                </li>
              </ul>
            </div>

            {/* PHÁT TRIỂN BỀN VỮNG */}
            <div className="mb-4">
              <h5 className="fw-bold d-flex align-items-center">
                <span className="me-2 text-primary">•</span>
                PHÁT TRIỂN BỀN VỮNG
              </h5>
              <ul className="text-secondary mt-2" style={{ lineHeight: 1.8 }}>
                <li>
                  Xây dựng đội ngũ cán bộ nhân viên năng động, sáng tạo, tinh
                  thông nghiệp vụ và tận tâm trong công việc.
                </li>
                <li>
                  Tăng cường hợp tác quốc tế, nâng cấp cơ sở hạ tầng, trang thiết
                  bị, phát triển kỹ thuật cao.
                </li>
              </ul>
            </div>

            <p className="text-secondary mt-4 fst-italic">
              Thông tin về Chính sách chất lượng: Chính sách chất lượng Bệnh viện
              Bình Dân.
            </p>
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
                             fw-semibold text-decoration-none 
                             pb-2"
                  style={{ 
                    color: 'var(--brandColor)', 
                    borderBottom: '1px solid var(--brandColor)' 
                  }}
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

export default HospitalQualityPolicy;
