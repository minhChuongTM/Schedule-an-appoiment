import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import HospitalBanner from "~/components/common/HospitalBanner";
import Image from "react-bootstrap/Image";
import img1 from "~/assets/img/imgi_12_(270x180)__sn-liver.png";

const NgoaiTongQuat = () => {
  const brandColor = "#1fbcbc";

  return (
    <>
      {/* BANNER */}
      <HospitalBanner title="Ngoại Tổng Quát" parentLabel="Điều trị" currentLabel="Ngoại tổng quát" subtitle="" />

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
                  Hiện nay, Bệnh viện Bình Dân có các chuyên khoa Ngoại Tổng Quát
                  với đội ngũ bác sĩ giàu kinh nghiệm, chuyên sâu trong chẩn đoán
                  và điều trị các bệnh lý ngoại khoa phức tạp.
                </p>

                <p className="fw-semibold mb-2">
                  Các chuyên khoa Ngoại Tổng Quát bao gồm:
                </p>

                <ListGroup variant="flush">
                  <ListGroup.Item>Ngoại Tiêu hóa</ListGroup.Item>
                  <ListGroup.Item>Gan – Mật – Tụy</ListGroup.Item>
                  <ListGroup.Item>Lồng ngực – Bướu cổ</ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật Tim – Mạch máu
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

          <div className="mt-4">
                  <Image
                  src={img1}
                  alt="ngoaitongquat"
                  fluid
                  rounded
                />
                </div>
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

export default NgoaiTongQuat;
