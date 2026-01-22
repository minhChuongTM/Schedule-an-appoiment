import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <section className="top-footer bg-gradient py-5 border-top shadow-sm">
        <Container>
          <Row xs={1} md={2} className="g-4 g-md-5">
            <Col>
              <div className="card border-0 bg-white shadow-sm h-100 hover-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-circle bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="fa fa-headphones fs-4 text-color-icon-top-footer-left"></i>
                    </div>
                    <h5 className="txt text-uppercase fw-bold mb-0 text-dark">Chăm sóc khách hàng</h5>
                  </div>
                  <div className="contact">
                    <div className="d-flex align-items-center mb-3 contact-item">
                      <div className="icon-wrapper bg-light rounded-circle p-2 me-3">
                        <i className="fa fa-phone text-color-icon-top-footer-left"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">Hotline</small>
                        <a href="tel:0799325371" className="text-decoration-none text-dark fw-semibold fs-6">
                          0799 335 896
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center contact-item">
                      <div className="icon-wrapper bg-light rounded-circle p-2 me-3">
                        <i className="fa fa-envelope text-color-icon-top-footer-left"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">Email</small>
                        <a href="mailto:cskhbvbd@gmail.com" className="text-decoration-none text-dark fw-semibold fs-6">
                          cskhbvah@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col>
              <div className="card border-0 bg-white shadow-sm h-100 hover-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-circle bg-success bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="fa fa-briefcase fs-4 text-icon-top-footer-right"></i>
                    </div>
                    <h5 className="txt text-uppercase fw-bold mb-0 text-dark">Liên hệ công tác</h5>
                  </div>
                  <div className="contact">
                    <div className="d-flex align-items-center mb-3 contact-item">
                      <div className="icon-wrapper bg-light rounded-circle p-2 me-3">
                        <i className="fa fa-phone text-icon-top-footer-right"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">Điện thoại</small>
                        <a href="tel:(028) 1324 5678" className="text-decoration-none text-dark fw-semibold fs-6">
                          (028) 1324 5678
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center contact-item">
                      <div className="icon-wrapper bg-light rounded-circle p-2 me-3">
                        <i className="fa fa-envelope text-icon-top-footer-right"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">Email</small>
                        <a
                          href="mailto:bvbinhdan@hcm.vnn.vn"
                          className="text-decoration-none text-dark fw-semibold fs-6"
                        >
                          bvanhhungn@hcm.vnn.vn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="main-footer bg-dark text-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="footer-column">
                <h5 className="footer-title text-uppercase fw-bold mb-4">Hướng Dẫn</h5>
                <ul className="list-unstyled footer-links">
                  <li className="mb-3">
                    <Link to={"huong-dan/kham-benh"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Hướng dẫn khám bệnh
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"huong-dan/noi-quy-benh-vien"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Nội quy bệnh viện
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"huong-dan/tham-benh"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Hướng dẫn thăm bệnh
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"huong-dan/nhap-vien"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Hướng dẫn nhập viện
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"huong-dan/xuat-vien"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Hướng dẫn xuất viện
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"huong-dan/chuan-bi-phau-thuat"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Hướng dẫn chuẩn bị phẫu thuật
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"huong-dan/bao-hiem-y-te"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Hướng dẫn bảo hiểm y tế
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="footer-column">
                <h5 className="footer-title text-uppercase fw-bold mb-4">Dịch Vụ</h5>
                <ul className="list-unstyled footer-links">
                  <li className="mb-3">
                    <Link to={"dich-vu/phau-thuat"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Thông tin về phẫu thuật
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"dich-vu/xuat-vien-som"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Quy trình xuất viện
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"dich-vu/chuyen-phat-nhanh"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Chuyển phát hồ sơ bệnh án
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"dich-vu/xe-van-chuyen"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Đặt xe đưa đón
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"dich-vu/tu-van-thuoc"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Giải đáp thắc mắc về thuốc
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="footer-column">
                <h5 className="footer-title text-uppercase fw-bold mb-4">Thông Tin</h5>
                <ul className="list-unstyled footer-links">
                  <li className="mb-3">
                    <Link to={"/gioi-thieu"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Giới thiệu bệnh viện
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"gioi-thieu/co-cau-to-chuc"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Cơ cấu tổ chức
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to={"gioi-thieu/chinh-sach-chat-luong"} className="text-decoration-none">
                      <i className="bi bi-chevron-right me-2"></i>Công khai cam kết chất lượng
                    </Link>
                  </li>
                  <li className="mb-3">
                    <a href="tel:0799325371" className="text-decoration-none d-flex align-items-center">
                      <i className="bi bi-telephone-fill me-2"></i>
                      <span className="fw-semibold">Đường dây nóng: 0799 335 896</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-4 border-secondary opacity-25" />
        </div>
      </section>
      <section className="bottom-footer border-top border-secondary border-opacity-25">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0 text-muted small">© 2026 Bệnh viện. Bảo lưu mọi quyền.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
