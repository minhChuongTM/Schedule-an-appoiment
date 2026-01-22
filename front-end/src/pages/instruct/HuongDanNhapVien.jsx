import React from "react";

const HuongDanNhapVien = () => {
  return (
    <div className="container py-5">
      {/* Tiêu đề chính */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">HƯỚNG DẪN NHẬP VIỆN</h1>
        <div className="mx-auto bg-primary mb-3" style={{ height: "3px", width: "60px" }}></div>
        <p className="lead text-muted">Quy trình nhập viện điều trị nội trú tại bệnh viện</p>
      </div>

      <div className="row g-4">
        {/* 1. Điều kiện nhập viện */}
        <div className="col-12">
          <div className="alert alert-info border-0 shadow-sm p-4 mb-0">
            <h4 className="fw-bold text-info-emphasis">1. Điều kiện nhập viện</h4>
            <p className="mb-0 fs-6">Người bệnh sẽ được chỉ định nhập viện khi bác sĩ chuyên khoa xác định tình trạng sức khỏe cần được theo dõi liên tục hoặc điều trị nội trú tại bệnh viện.</p>
          </div>
        </div>

        {/* 2. Thủ tục nhập viện */}
        <div className="col-md-7">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-primary text-white py-3 fw-bold">2. Thủ tục hành chính tại quầy tiếp nhận</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0 border-0 d-flex">
                  <span className="fw-bold me-2">•</span>
                  <span>Xuất trình chỉ định nhập viện từ bác sĩ.</span>
                </li>
                <li className="list-group-item px-0 border-0 d-flex">
                  <span className="fw-bold me-2">•</span>
                  <span>Nộp hồ sơ: CCCD gắn chíp và thẻ Bảo hiểm y tế (nếu có).</span>
                </li>
                <li className="list-group-item px-0 border-0 d-flex">
                  <span className="fw-bold me-2">•</span>
                  <span>Hoàn tất ký cam kết điều trị nội trú.</span>
                </li>
                <li className="list-group-item px-0 border-0 d-flex text-danger fw-medium">
                  <span className="fw-bold me-2">•</span>
                  <span>Đóng phí tạm ứng viện phí theo quy định.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Nhận phòng */}
        <div className="col-md-5">
          <div className="card h-100 border-0 shadow-sm bg-light">
            <div className="card-body d-flex flex-column justify-content-center text-center p-4">
              <h5 className="fw-bold text-dark mb-3">3. Nhận phòng và giường bệnh</h5>
              <p className="card-text text-muted mb-0 small">
                Sau khi hoàn tất thủ tục hành chính, điều dưỡng sẽ hướng dẫn người bệnh về đúng khoa điều trị để nhận phòng và giường bệnh theo đúng chuyên khoa chỉ định.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Trong thời gian điều trị */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold text-primary border-bottom pb-2 mb-3">4. Trong thời gian điều trị</h5>
              <ul className="list-unstyled mb-0 small">
                <li className="mb-2">- Tuyệt đối tuân thủ phác đồ điều trị của bác sĩ chuyên khoa.</li>
                <li className="mb-2">- Không tự ý rời khỏi bệnh viện khi chưa được phép.</li>
                <li>- Thông báo ngay cho nhân viên y tế nếu thấy dấu hiệu bất thường.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. Lưu ý */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm bg-warning bg-opacity-10 border-warning border-opacity-25 border">
            <div className="card-body p-4">
              <h5 className="fw-bold text-warning-emphasis border-bottom border-warning border-opacity-25 pb-2 mb-3">5. Lưu ý quan trọng</h5>
              <ul className="list-unstyled mb-0 small text-dark">
                <li className="mb-2">- Chỉ mang theo đồ dùng cá nhân thật sự thiết yếu.</li>
                <li className="mb-2">- Tự bảo quản tài sản và các đồ dùng có giá trị.</li>
                <li>- Thực hiện nghiêm chỉnh nội quy sinh hoạt tại khoa.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuongDanNhapVien;
