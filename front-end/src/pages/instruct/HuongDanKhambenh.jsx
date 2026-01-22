import React from "react";

const HuongDanKhamBenh = () => {
  return (
    <div className="container py-5">
      {/* Tiêu đề trang dùng Typography Bootstrap */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary text-uppercase">Hướng Dẫn Khám Bệnh</h1>
        <div className="mx-auto bg-primary mb-3" style={{ height: "3px", width: "60px" }}></div>
        <p className="lead text-muted">Quy trình chuẩn giúp tiết kiệm thời gian cho người bệnh</p>
      </div>

      <div className="row g-4">
        {/* 1. Chuẩn bị */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-0 bg-light">
            <div className="card-body">
              <h5 className="card-title fw-bold text-dark border-bottom pb-2">1. Chuẩn bị trước khi khám</h5>
              <ul className="card-text mt-3">
                <li className="mb-2">Thẻ CCCD/Giấy tờ tùy thân</li>
                <li className="mb-2">Thẻ bảo hiểm y tế (nếu có)</li>
                <li className="mb-2">Kết quả xét nghiệm, đơn thuốc cũ</li>
                <li>Mô tả chi tiết các triệu chứng</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Đăng ký */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
            <div className="card-body">
              <h5 className="card-title fw-bold text-success">2. Đăng ký khám bệnh</h5>
              <p className="small text-muted mb-3">Đến quầy tiếp nhận để lấy số thứ tự và đăng ký chuyên khoa phù hợp.</p>
              <div className="bg-success bg-opacity-10 p-2 rounded border border-success border-opacity-25">
                <span className="badge bg-success me-2">Lưu ý</span>
                <span className="small">Nhận phiếu khám và số thứ tự tại quầy đăng kí</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Quá trình khám */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-info">
            <div className="card-body">
              <h5 className="card-title fw-bold text-info">3. Quá trình khám bệnh</h5>
              <div className="mt-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="badge rounded-pill bg-info me-2">1</div>
                  <span className="small">Chờ đến lượt tại phòng khám</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="badge rounded-pill bg-info me-2">2</div>
                  <span className="small">Trao đổi với bác sĩ chuyên khoa</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="badge rounded-pill bg-info me-2">3</div>
                  <span className="small">Thực hiện cận lâm sàng (nếu có)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Kết quả & Điều trị */}
        <div className="col-md-6 col-lg-8">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold text-primary mb-3">4. Nhận kết quả và điều trị</h5>
              <p className="card-text">Bác sĩ đưa ra kết luận, kê đơn thuốc hoặc chỉ định điều trị tiếp theo.</p>
              <div className="row mt-3">
                <div className="col-6 border-end">
                  <p className="fw-bold mb-1 small text-uppercase">Tại bệnh viện</p>
                  <p className="small mb-0 text-muted">Mua thuốc tại nhà thuốc BV</p>
                </div>
                <div className="col-6">
                  <p className="fw-bold mb-1 small text-uppercase">Tại nhà</p>
                  <p className="small mb-0 text-muted">Uống thuốc theo chỉ dẫn bác sĩ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Lưu ý quan trọng */}
        <div className="col-md-12 col-lg-4">
          <div className="alert alert-danger h-100 shadow-sm border-0 mb-0">
            <h5 className="fw-bold border-bottom border-danger border-opacity-25 pb-2">5. Lưu ý quan trọng</h5>
            <ul className="mb-0 small ps-3 mt-2">
              <li className="mb-2">Tuân thủ tuyệt đối chỉ dẫn bác sĩ</li>
              <li className="mb-2">Không tự ý dùng thêm thuốc ngoài</li>
              <li>Giữ gìn vệ sinh và trật tự chung</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuongDanKhamBenh;
