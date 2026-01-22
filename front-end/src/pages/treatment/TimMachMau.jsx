import React from "react";
import { Container, Row, Col, Card, ListGroup, Image } from "react-bootstrap";
import { FaInfoCircle, FaThList } from "react-icons/fa";
import HospitalBanner from "~/components/common/HospitalBanner";

// Ảnh minh họa (đổi đường dẫn nếu cần)
import img1 from "~/assets/img/imgi_10_15-Poster-PTTMM-GianTinhMachChanBangKeoSinhHoc.jpg";
import img2 from "~/assets/img/imgi_11_12-PTTMM_1.jpg";

const TimMachMau = () => {
  const brandColor = "#1fbcbc";

  return (
    <>
      <HospitalBanner title="Phẫu thuật Tim – Mạch Máu" parentLabel="Điều trị" currentLabel="Phẫu thuật tim-mạch máu" subtitle="" />

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

                <p className="mb-3">
                  Khoa phẫu thuật Tim - Mạch máu thực hiện các phương pháp điều trị
                  phẫu thuật và can thiệp mạch máu nhằm điều trị các bệnh lý mạch
                  máu trung tâm và mạch máu ngoại biên.
                </p>

                {/* ẢNH 1 */}
                <Image
                  src={img1}
                  alt="Phẫu thuật tim mạch"
                  fluid
                  rounded
                />
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

                <h6 className="fw-bold mt-3">Phẫu thuật mạch máu</h6>
                <ListGroup variant="flush" className="mb-4">
                  <ListGroup.Item>
                    Phẫu thuật bắc cầu, đặt stent nội mạch điều trị tắc mạch máu
                    tay chân
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật cắt ghép hoặc đặt stent điều trị phình động mạch
                    chủ ngực và bụng
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật bắc cầu hoặc đặt stent điều trị hẹp tắc động mạch
                    chủ, chậu
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Điều trị suy tĩnh mạch chân bằng laser, sóng cao tần và keo
                    sinh học
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Điều trị huyết khối tĩnh mạch chân, tĩnh mạch chủ chậu bằng
                    tiêu sợi huyết
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Đặt buồng tiêm dưới da truyền dịch, truyền hóa chất điều trị
                    ung thư
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Điều trị u vú lành tính bằng kim sinh thiết lõi
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Tạo dò động – tĩnh mạch chạy thận nhân tạo
                  </ListGroup.Item>
                </ListGroup>

                {/* ẢNH 2 */}
                <Image
                  src={img2}
                  alt="Can thiệp mạch máu"
                  fluid
                  rounded
                  className="mb-4"
                />

                <h6 className="fw-bold">Phẫu thuật tim</h6>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Phẫu thuật thay van tim (van hai lá, van động mạch chủ)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật vá thông liên nhĩ, thông liên thất
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật bắc cầu mạch vành điều trị bệnh thiếu máu cơ tim,
                    nhồi máu cơ tim
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật phình động mạch chủ ngực
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT SIDEBAR */}
          <Col lg={4}>
            <div className="p-4 bg-light rounded mb-4 sticky-top" style={{ top: "80px" }}>
              <h6 className="fw-bold text-primary mb-3">Địa điểm</h6>

              <p className="fw-semibold mb-1">Khu khám bệnh Trụ sở chính</p>
              <p className="mb-3">
                371 Điện Biên Phủ, Phường Bàn Cờ, TP. Hồ Chí Minh
              </p>

              <p className="fw-semibold mb-1">Khu khám bệnh Kỹ thuật cao</p>
              <p className="mb-4">
                326 - 328 Điện Biên Phủ, Phường Vườn Lài, TP. Hồ Chí Minh
              </p>

              <h6 className="fw-bold text-primary mb-3">Giờ khám bệnh</h6>

              <p className="fw-semibold mb-1">Thứ 2 – Thứ 6</p>
              <p className="mb-2">
                Sáng: 06:00 – 11:30 <br />
                Chiều: 13:00 – 16:00
              </p>

              <p className="fw-semibold mb-1">Thứ 7, Lễ, Tết</p>
              <p className="mb-3">Sáng: 06:00 – 11:30</p>

              <p className="fw-bold text-primary mb-0">
                CSKH: 0799 325 371
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TimMachMau;
