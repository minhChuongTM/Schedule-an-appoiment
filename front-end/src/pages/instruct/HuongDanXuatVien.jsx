import React from "react";

const HuongDanXuatVien = () => {
  return (
    <div className="container py-5">
      {/* Tiêu đề chính */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary text-uppercase">🏥 Hướng Dẫn Xuất Viện</h1>
        <div className="mx-auto bg-primary mb-3" style={{ height: "4px", width: "60px" }}></div>
        <p className="lead text-muted">Quy trình hoàn tất thủ tục và chăm sóc sức khỏe sau điều trị</p>
      </div>

      <div className="row g-4">
        {/* 1. Điều kiện xuất viện */}
        <div className="col-12">
          <div className="alert alert-success border-0 shadow-sm p-4 mb-0">
            <h4 className="fw-bold">1. Điều kiện được xuất viện</h4>
            <p className="mb-0 fs-6">
              Người bệnh được xuất viện khi tình trạng sức khỏe ổn định, không còn nguy hiểm và đã hoàn thành phác đồ điều trị nội trú theo chỉ định chính thức từ bác sĩ điều trị.
            </p>
          </div>
        </div>
        {/* 2. Quy trình làm thủ tục */}
        <div className="col-lg-7">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-header bg-primary text-white py-3 fw-bold">2. Quy trình làm thủ tục xuất viện</div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <div className="list-group-item p-3">
                  <span className="badge bg-primary me-2">Bước 1</span>
                  Bác sĩ điều trị xác nhận tình trạng và ký giấy ra viện.
                </div>
                <div className="list-group-item p-3">
                  <span className="badge bg-primary me-2">Bước 2</span>
                  Nhận giấy ra viện, toa thuốc và hướng dẫn điều trị tại nhà từ điều dưỡng.
                </div>
                <div className="list-group-item p-3">
                  <span className="badge bg-primary me-2">Bước 3</span>
                  Đến quầy tài chính để thanh toán và quyết toán viện phí.
                </div>
                <div className="list-group-item p-3">
                  <span className="badge bg-primary me-2">Bước 4</span>
                  Bàn giao giường bệnh, thiết bị mượn và nhận lại giấy tờ gốc (nếu có).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Giấy tờ chuẩn bị */}
        <div className="col-lg-5">
          <div className="card h-100 shadow-sm border-0 bg-light">
            <div className="card-body p-4 text-center">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">3. Giấy tờ cần mang theo</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                <span className="badge border text-dark fw-normal p-2">CCCD / CMND</span>
                <span className="badge border text-dark fw-normal p-2">Thẻ Bảo hiểm y tế</span>
                <span className="badge border text-dark fw-normal p-2">Phiếu nhập viện</span>
                <span className="badge border text-dark fw-normal p-2">Sổ khám bệnh</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Sau khi xuất viện */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-start border-4 border-info">
            <div className="card-body p-4">
              <h5 className="fw-bold text-info mb-3">4. Hướng dẫn sau khi xuất viện</h5>
              <p className="small text-muted mb-0">Người bệnh cần uống thuốc đúng liều lượng, tái khám đúng lịch hẹn, nghỉ ngơi hợp lý và liên hệ ngay hotline bệnh viện khi có dấu hiệu bất thường.</p>
            </div>
          </div>
        </div>

        {/* 5. Lưu ý quan trọng */}
        <div className="col-md-6">
          <div className="alert alert-warning h-100 shadow-sm border-0 mb-0 p-4">
            <h5 className="fw-bold text-dark mb-3">5. Lưu ý quan trọng</h5>
            <ul className="mb-0 small ps-3">
              <li className="mb-2">Không tự ý ngưng thuốc khi chưa có ý kiến bác sĩ.</li>
              <li className="mb-2">Hạn chế vận động mạnh trong thời gian phục hồi.</li>
              <li>Lưu trữ kỹ giấy ra viện để phục vụ tái khám hoặc bảo hiểm.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuongDanXuatVien;
