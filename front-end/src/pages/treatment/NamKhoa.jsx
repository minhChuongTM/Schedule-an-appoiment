import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { FaInfoCircle, FaThList } from "react-icons/fa";
import HospitalBanner from "~/components/common/HospitalBanner";

const NamKhoa = () => {
  const brandColor = "#1fbcbc";

  return (
    <>
      <HospitalBanner title="Nam Khoa" parentLabel="Điều trị" currentLabel="Nam khoa" subtitle="" /> 
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

                <p className="mb-2">
                  Là đơn vị tiên phong trong lĩnh vực nam khoa và học giới tính tại Việt
                  Nam từ năm 1992. Nam khoa Bệnh viện Bình Dân là nơi điều trị, chăm sóc
                  sức khỏe nam giới uy tín tại miền Nam và trên cả nước.
                </p>

                <p className="mb-0">
                  Đội ngũ các bác sĩ phẫu thuật, chuyên gia học giới tính của Bệnh viện
                  Bình Dân phát triển hoàn thiện chuỗi dịch vụ điều trị, chăm sóc sức
                  khỏe nam giới bao gồm: chăm sóc sức khỏe sinh sản, sức khỏe tình dục,
                  sức khỏe giới tính.
                </p>
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
                    <strong>Cấp cứu nam khoa:</strong> gãy dương vật, xoắn dây tinh
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Tạo hình cơ quan sinh dục:</strong> dị tật đường tiết niệu bẩm
                    sinh hoặc tai nạn
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Điều trị và tầm soát sức khỏe:</strong> khi sử dụng nội tiết
                    thay thế
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Điều trị các rối loạn tình dục:</strong> rối loạn cương, xuất
                    tinh sớm, rối loạn chức năng sinh dục
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Khám sức khỏe tiền hôn nhân cho nam giới
                  </ListGroup.Item>

                  <ListGroup.Item>Điều trị vô sinh nam</ListGroup.Item>

                  <ListGroup.Item>
                    Điều trị bệnh lây truyền qua đường tình dục, suy tuyến sinh dục, bướu
                    cơ quan sinh dục
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Rối loạn hoạt động và các chức năng tình dục nam và nữ
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Xét nghiệm:</strong> tinh dịch đồ, trữ mô tinh hoàn, sinh học
                    phân tử
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
              <p className="fw-bold text-primary mb-0">CSKH: 0799 325 371</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NamKhoa;
