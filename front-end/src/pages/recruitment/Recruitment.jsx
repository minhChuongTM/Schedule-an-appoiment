import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router";
import HospitalBanner from "~/components/common/HospitalBanner";

const Recruitment = () => {
  return (
    <div>
      <HospitalBanner parentLabel="Tuyển dụng" title="Tuyển dụng"/>
      <Container className="my-5">
        <div class="recruitment-card shadow-lg border-0 rounded-4 overflow-hidden">
          <div class="header-banner p-5 text-center text-white">
            <span class="badge bg-warning text-dark mb-2 px-3 py-2 fw-bold">HẠN CHÓT: 31/12/2025</span>
            <h2 class="display-5 fw-bold text-uppercase">Tuyển dụng vị trí Chuyên viên</h2>
            <p class="lead mb-0">Phòng Tổ chức cán bộ - Cập nhật tháng 12/2025</p>
          </div>

          <div class="card-body p-4 p-md-5">
            <section class="mb-5">
              <h2 class="section-title border-4 ps-3 mb-4 text-uppercase fw-bold page-recruitment">A. Vị trí đăng tin tuyển dụng</h2>

              <div class="row g-4">
                <div class="col-lg-6">
                  <div class="h-100 p-4 bg-light rounded-3">
                    <h3 class="h5 fw-bold page-recruitment mb-3">
                      <i class="fas fa-user-check me-2 "></i>1. Yêu cầu:
                    </h3>
                    <ul class="list-unstyled custom-list">
                      <li>Có đủ sức khỏe để làm việc;</li>
                      <li>
                        Tốt nghiệp Đại học trở lên, thành thạo hệ thống máy chủ, công cụ giám sát (
                        <strong>Zabbix, Nagios...</strong>) hoặc ATTT;
                      </li>
                      <li>
                        Chứng chỉ <strong>CEH V13</strong>, AI, thành thạo công cụ pentest;
                      </li>
                      <li>Giao tiếp tốt, tác phong chuyên nghiệp;</li>
                      <li>
                        Tiếng Anh: <strong>Bậc 2/6 (CEFR)</strong> trở lên.
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="h-100 p-4 bg-light rounded-3 border-start border-info border-3">
                    <h3 class="h5 fw-bold page-recruitment mb-3">
                      <i class="fas fa-briefcase me-2 "></i>2. Mô tả công việc:
                    </h3>
                    <ol class="ps-3 mb-0 job-desc-list">
                      <li>Quản lý, vận hành hạ tầng CNTT, Data Center;</li>
                      <li>Đánh giá tính tuân thủ an toàn thông tin;</li>
                      <li>Thực hiện các đề án, dự án CNTT;</li>
                      <li>Thiết kế, lập trình và bảo mật hệ thống;</li>
                      <li>Xây dựng quy trình, tập huấn nghiệp vụ;</li>
                      <li>Nghiên cứu khoa học và triển khai thực tiễn;</li>
                      <li>Phối hợp thực hiện nhiệm vụ an ninh mạng.</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div class="text-center mt-4">
                <Link href="#" class="btn btn-primary btn-lg px-5 rounded-pill shadow">
                  <i class="fas fa-paper-plane me-2"></i>ĐĂNG KÝ NGAY TẠI ĐÂY
                </Link>
              </div>
            </section>

            <section class="p-4 rounded-3 border">
              <h2 class="section-title border-start border-4 ps-3 mb-4  text-uppercase fw-bold page-recruitment">
                B. Cách thức nộp hồ sơ
              </h2>

              <div class="row">
                <div class="col-md-7">
                  <p class="fw-bold page-recruitment">
                    <i class="fas fa-file-medical me-2"></i>Hồ sơ online bao gồm (Scan bản chính):
                  </p>
                  <div class="row g-2 ms-1">
                    <div class="col-6">
                      <i class="far fa-check-circle me-2"></i>Phiếu ứng tuyển BM01
                    </div>
                    <div class="col-6">
                      <i class="far fa-check-circle me-2"></i>Văn bằng chứng chỉ
                    </div>
                    <div class="col-6">
                      <i class="far fa-check-circle me-2"></i>Giấy khám sức khỏe
                    </div>
                    <div class="col-6">
                      <i class="far fa-check-circle me-2"></i>CCCD & Giấy khai sinh
                    </div>
                    <div class="col-12">
                      <i class="far fa-check-circle me-2"></i>Chứng chỉ hành nghề (nếu có)
                    </div>
                  </div>
                </div>
                <div class="col-md-5 mt-4 mt-md-0 border-start ps-md-4">
                  <p class="fw-bold page-recruitment">
                    <i class="fas fa-address-book me-2"></i>Thông tin liên hệ:
                  </p>
                  <p class="mb-1">
                    <i class="fas fa-phone-alt me-2 text-muted"></i>028 1324 5678 (số nội bộ: 1136)
                  </p>
                  <p class="mb-1">
                    <i class="fas fa-user text-muted me-2"></i>CV. Ngọc Dững (P. TCCB)
                  </p>
                  <p class="mb-0">
                    <i class="fas fa-map-marker-alt text-muted me-2"></i>371 ABC-XYZ Điện Biên Phủ, P. Bàn Cờ, TP.HCM
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Recruitment;
