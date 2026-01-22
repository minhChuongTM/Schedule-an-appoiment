import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { FaInfoCircle, FaThList } from "react-icons/fa";
import HospitalBanner from "~/components/common/HospitalBanner";
import Image from "react-bootstrap/Image";
import img1 from "~/assets/img/imgi_10_z3172906388611_ea15f27e5e6751378c465e2b30dc1630.jpg";

const NgoaiTietNieu = () => {
  const brandColor = "#1fbcbc";

  return (
    <>
      {/* BANNER */}
      <HospitalBanner title="Ngoại Tiết Niệu" parentLabel="Điều trị" currentLabel="Ngoại tiết niệu" subtitle="" />

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
                  Khoa Ngoại Tiết niệu, Bệnh viện Bình Dân thực hiện chẩn đoán và
                  điều trị các bệnh lý tiết niệu, sinh dục cho người bệnh.
                </p>

                <p>
                  Ngoại Tiết niệu là chuyên khoa nền tảng, tạo dựng uy tín cho
                  Bệnh viện Bình Dân hơn 60 năm qua. Khoa kế thừa y thuật từ các
                  giáo sư hàng đầu, kết hợp ứng dụng công nghệ cao và các chuyên
                  ngành hẹp chuyên sâu nhằm tối ưu hiệu quả điều trị.
                </p>

                <p className="mb-0">
                  Khoa tập trung các phương pháp không xâm lấn và xâm lấn tối
                  thiểu như nội soi, phẫu thuật nội soi ứng dụng robot, chú trọng
                  bảo tồn chất lượng sống sau phẫu thuật.
                </p>

                {/* CHỖ THÊM HÌNH */}
                <div className="mt-4">
                  <Image
                  src={img1}
                  alt="ngoaitietnieu"
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
                  <ListGroup.Item className="fw-bold">
                    1. Điều trị sỏi niệu
                  </ListGroup.Item>
                  <ListGroup.Item>Tán sỏi ngoài cơ thể</ListGroup.Item>
                  <ListGroup.Item>
                    Nội soi tán sỏi ngược dòng bằng laser
                  </ListGroup.Item>
                  <ListGroup.Item>
                    PCNL, Mini-Perc, phẫu thuật nội soi lấy sỏi
                  </ListGroup.Item>

                  <ListGroup.Item className="fw-bold mt-2">
                    2. Điều trị bướu niệu
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Cắt đốt nội soi bướu lành tuyến tiền liệt, bướu bàng quang
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật robot, nội soi, mổ mở bướu thận, bướu ác tính
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phẫu thuật bướu tinh hoàn, bướu dương vật
                  </ListGroup.Item>

                  <ListGroup.Item className="fw-bold mt-2">
                    3. Phẫu thuật tạo hình niệu khoa
                  </ListGroup.Item>
                  <ListGroup.Item>Dị tật bẩm sinh đường tiết niệu</ListGroup.Item>
                  <ListGroup.Item>Di chứng sau chấn thương</ListGroup.Item>
                  <ListGroup.Item>
                    Tái tạo bàng quang bằng ruột
                  </ListGroup.Item>

                  <ListGroup.Item className="fw-bold mt-2">
                    4. Đơn vị niệu đạo
                  </ListGroup.Item>
                  <ListGroup.Item>Rối loạn tiểu tiện</ListGroup.Item>
                  <ListGroup.Item>Tiểu không tự chủ</ListGroup.Item>
                  <ListGroup.Item>Dò niệu đạo, hẹp niệu đạo</ListGroup.Item>

                  <ListGroup.Item className="fw-bold mt-2">
                    5. Can thiệp mạch
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Chụp – đặt stent động mạch thận
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Nút mạch điều trị bướu thận, tăng sinh tuyến tiền liệt
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
              <p>371 Điện Biên Phủ, Phường Bàn Cờ, TP.HCM</p>

              <p className="fw-semibold mb-1">
                Khu khám bệnh Kỹ thuật cao
              </p>
              <p>326 – 328 Điện Biên Phủ, Phường Vườn Lài, TP.HCM</p>

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

export default NgoaiTietNieu;
