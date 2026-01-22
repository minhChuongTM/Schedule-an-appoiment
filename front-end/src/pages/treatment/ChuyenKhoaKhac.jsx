import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { FaInfoCircle, FaThList } from "react-icons/fa";
import HospitalBanner from "~/components/common/HospitalBanner";

const ChuyenKhoaKhac = () => {
  const brandColor = "#1fbcbc";

  return (
    <>
      {/* BANNER */}
      <HospitalBanner title="Chuyên khoa khác" parentLabel="Điều trị" currentLabel="Chuyên khoa khác" subtitle="" />

      <Container fluid className="py-4 px-5">
        <Row>
          {/* LEFT CONTENT */}
          <Col lg={8}>
            {/* ===== GIỚI THIỆU ===== */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col xs="auto">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: brandColor,
                        color: "#fff",
                        borderRadius: 4,
                        fontSize: 18,
                      }}
                    >
                      <FaInfoCircle />
                    </div>
                  </Col>
                  <Col>
                    <h5 className="fw-bold mb-0" style={{ color: brandColor }}>
                      GIỚI THIỆU
                    </h5>
                  </Col>
                </Row>

                <p>
                  Bên cạnh các chuyên khoa mũi nhọn, Bệnh viện Bình Dân còn phát
                  triển và triển khai nhiều chuyên khoa khác nhằm đáp ứng toàn
                  diện nhu cầu khám, chẩn đoán và điều trị cho người bệnh.
                </p>

                <p className="fw-semibold mb-2">
                  Các chuyên khoa đang hoạt động tại Bệnh viện Bình Dân bao gồm:
                </p>

                <ListGroup variant="flush">
                  <ListGroup.Item>Nội tim mạch</ListGroup.Item>
                  <ListGroup.Item>Ung bướu</ListGroup.Item>
                  <ListGroup.Item>Lọc máu – Nội thận</ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật tạo hình – thẩm mỹ
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            {/* ===== DỊCH VỤ ===== */}
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col xs="auto">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: brandColor,
                        color: "#fff",
                        borderRadius: 4,
                        fontSize: 18,
                      }}
                    >
                      <FaThList />
                    </div>
                  </Col>
                  <Col>
                    <h5 className="fw-bold mb-0" style={{ color: brandColor }}>
                      DỊCH VỤ KỸ THUẬT
                    </h5>
                  </Col>
                </Row>

                <p>
                  Ngoài các chuyên khoa lâm sàng, Bệnh viện Bình Dân còn thực
                  hiện đầy đủ các dịch vụ cận lâm sàng, hỗ trợ chẩn đoán và điều
                  trị chính xác:
                </p>

                <ListGroup variant="flush">
                  <ListGroup.Item>Chẩn đoán hình ảnh</ListGroup.Item>
                  <ListGroup.Item>Nội soi tiêu hóa</ListGroup.Item>
                  <ListGroup.Item>Giải phẫu bệnh</ListGroup.Item>
                  <ListGroup.Item>Xét nghiệm</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT SIDEBAR */}
          <Col lg={4}>
            <div className="p-4 bg-light rounded mb-4 sticky-top" style={{ top: "80px" }}>
              <h6 className="fw-bold mb-3" style={{ color: brandColor }}>
                Địa điểm
              </h6>

              <p className="fw-semibold mb-1">Khu khám bệnh Trụ sở chính</p>
              <p>371 Điện Biên Phủ, Phường Bàn Cờ, TP. Hồ Chí Minh</p>

              <p className="fw-semibold mb-1">
                Khu khám bệnh Kỹ thuật cao
              </p>
              <p>326 – 328 Điện Biên Phủ, Phường Vườn Lài, TP. Hồ Chí Minh</p>

              <h6 className="fw-bold mt-4 mb-3" style={{ color: brandColor }}>
                Giờ khám bệnh
              </h6>

              <p className="fw-semibold mb-1">Thứ 2 – Thứ 6</p>
              <p>
                Sáng: 06:00 – 11:30 <br />
                Chiều: 13:00 – 16:00
              </p>

              <p className="fw-semibold mb-1">Thứ 7, Lễ, Tết</p>
              <p>Sáng: 06:00 – 11:30</p>

              <p className="fw-bold mb-0" style={{ color: brandColor }}>
                CSKH: 0799 325 371
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChuyenKhoaKhac;
