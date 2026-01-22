import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { FaInfoCircle, FaThList } from "react-icons/fa";
import HospitalBanner from "~/components/common/HospitalBanner";
import Image from "react-bootstrap/Image";
import img1 from "~/assets/img/imgi_10_z3166212353299_36a82b255b446c579516b55851ae8e49.jpg";

const NieuNu = () => {
  const brandColor = "#1fbcbc";

  return (
    <>
      {/* BANNER */}
      <HospitalBanner title="Niệu Nữ – Niệu Chức Năng" parentLabel="Điều trị" currentLabel="Niệu nữ" subtitle="" />

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
                  Khoa Niệu nữ là đơn vị tiên phong trong điều trị chuyên sâu các
                  vấn đề về đường tiết niệu – sinh dục và chức năng đường tiết
                  niệu ở nữ giới tại Việt Nam.
                </p>

                <p>
                  Khoa thực hiện chẩn đoán chính xác và điều trị hiệu quả các
                  bệnh lý vùng chậu, bàng quang, âm đạo, tử cung, niệu quản…
                  Đơn vị Niệu động học cung cấp các xét nghiệm được xem là
                  <strong> “tiêu chuẩn vàng” </strong>
                  trong chẩn đoán các bệnh lý chức năng đường tiểu dưới.
                </p>

                <p className="mb-2">
                  <strong>Fanpage Khoa Niệu nữ – Niệu chức năng:</strong>
                </p>
                <a
                  href="https://www.facebook.com/Phaidepvatietnieu"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: brandColor }}
                >
                  https://www.facebook.com/Phaidepvatietnieu
                </a>

                {/* CHỖ THÊM HÌNH */}
                <div className="mt-4">
                 <Image
                  src={img1}
                  alt="Nieu nu"
                  fluid
                  rounded
                />
                </div>
              </Card.Body>
            </Card>

            {/* ===== ĐIỀU TRỊ ===== */}
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
                      ĐIỀU TRỊ
                    </h5>
                  </Col>
                </Row>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Chẩn đoán và điều trị rối loạn chức năng đi tiểu: tiểu gấp,
                    tiểu lắt nhắt, tiểu đêm, tiểu không kiểm soát, són tiểu
                  </ListGroup.Item>

                  <ListGroup.Item>Sa bàng quang</ListGroup.Item>
                  <ListGroup.Item>Sa sinh dục nữ</ListGroup.Item>
                  <ListGroup.Item>Đau vùng chậu mạn tính</ListGroup.Item>
                  <ListGroup.Item>Rối loạn tình dục nữ</ListGroup.Item>

                  <ListGroup.Item>
                    Bệnh lý bàng quang: viêm bàng quang, viêm bàng quang kẽ,
                    bàng quang tăng hoạt
                  </ListGroup.Item>

                  <ListGroup.Item className="fw-bold mt-2">
                    Phẫu thuật tạo hình
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Tạo hình âm đạo, âm vật, màng trinh
                  </ListGroup.Item>
                  <ListGroup.Item>Tạo hình niệu quản nữ</ListGroup.Item>
                  <ListGroup.Item>Tạo hình bàng quang</ListGroup.Item>

                  <ListGroup.Item>
                    Laser niệu nữ, vật lý trị liệu, phục hồi chức năng
                  </ListGroup.Item>

                  <ListGroup.Item className="fw-bold mt-2">
                    Thẩm mỹ & chức năng
                  </ListGroup.Item>

                  <ListGroup.Item>Tiểu không kiểm soát</ListGroup.Item>
                  <ListGroup.Item>Sa sinh dục, sa bàng quang</ListGroup.Item>
                  <ListGroup.Item>Giao hợp đau</ListGroup.Item>
                  <ListGroup.Item>
                    Thu nhỏ âm đạo, làm hồng vùng kín
                  </ListGroup.Item>
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

export default NieuNu;
