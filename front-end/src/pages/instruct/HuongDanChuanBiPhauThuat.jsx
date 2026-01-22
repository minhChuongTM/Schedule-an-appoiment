import React from "react";

const HuongDanChuanBiPhauThuat = () => {
  return (
    <div className="container py-5">
      {/* Tiêu đề trang */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary text-uppercase">Hướng Dẫn Chuẩn Bị Phẫu Thuật</h1>
        <div className="mx-auto bg-primary mb-3" style={{ height: "3px", width: "80px" }}></div>
        <p className="lead text-muted">Vui lòng đọc kỹ để ca mổ được diễn ra an toàn và thuận lợi nhất</p>
      </div>

      <div className="row g-4">
        {/* 1. Mục đích */}
        <div className="col-12">
          <div className="card shadow-sm border-0 bg-light p-3">
            <div className="card-body">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">1. Mục đích của việc chuẩn bị</h5>
              <p className="card-text text-secondary mb-0">Việc chuẩn bị trước phẫu thuật giúp đảm bảo an toàn cho bệnh nhân, giảm thiểu tối đa rủi ro và hỗ trợ bác sĩ thực hiện ca mổ thuận lợi.</p>
            </div>
          </div>
        </div>

        {/* 2. Trước ngày phẫu thuật */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body">
              <h5 className="fw-bold text-primary mb-3">2. Trước ngày phẫu thuật</h5>
              <ul className="list-group list-group-flush small">
                <li className="list-group-item px-0 border-0">• Khám tổng quát và làm xét nghiệm theo chỉ định.</li>
                <li className="list-group-item px-0 border-0">• Thông báo về các bệnh nền và thuốc đang sử dụng.</li>
                <li className="list-group-item px-0 border-0">• Tuyệt đối không uống rượu bia, hút thuốc (ít nhất 24h).</li>
                <li className="list-group-item px-0 border-0">• Chuẩn bị đủ giấy tờ: CCCD, BHYT, hồ sơ bệnh án.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Trước giờ phẫu thuật */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-top border-4 border-info">
            <div className="card-body">
              <h5 className="fw-bold text-info mb-3">3. Trước giờ phẫu thuật</h5>
              <ul className="list-group list-group-flush small">
                <li className="list-group-item px-0 border-0 text-danger fw-medium">• Nhịn ăn và uống theo hướng dẫn (thường 6–8 giờ).</li>
                <li className="list-group-item px-0 border-0">• Tắm rửa sạch sẽ, không trang điểm/sơn móng tay.</li>
                <li className="list-group-item px-0 border-0">• Tháo bỏ trang sức, vật dụng kim loại trên người.</li>
                <li className="list-group-item px-0 border-0">• Thay quần áo bệnh viện theo quy định.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Quá trình chờ */}
        <div className="col-md-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">4. Trong quá trình chờ phẫu thuật</h5>
              <p className="small text-muted mb-0">
                Người bệnh cần giữ tâm lý thoải mái, thư giãn. Các điều dưỡng sẽ hỗ trợ bạn thực hiện các bước cuối cùng trước khi vào phòng mổ. Đừng ngần ngại đặt câu hỏi nếu có thắc mắc.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Lưu ý quan trọng */}
        <div className="col-md-5">
          <div className="alert alert-danger shadow-sm h-100 mb-0 border-0">
            <h5 className="fw-bold border-bottom border-danger border-opacity-25 pb-2">5. Lưu ý quan trọng</h5>
            <ul className="list-unstyled mt-3 small">
              <li className="mb-2">
                <strong>-</strong> Không tự ý ăn uống nếu chưa cho phép.
              </li>
              <li className="mb-2">
                <strong>-</strong> Báo ngay nếu thấy khó thở hoặc đau nhiều.
              </li>
              <li>
                <strong>-</strong> Không tự ý rời khu vực chuẩn bị mổ.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuongDanChuanBiPhauThuat;
