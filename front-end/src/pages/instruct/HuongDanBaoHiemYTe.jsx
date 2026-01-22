import React from "react";

const HuongDanBaoHiemYTe = () => {
  return (
    <div className="container py-5">
      {/* Tiêu đề sử dụng Typography của Bootstrap */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary text-uppercase">🛡️ Hướng Dẫn Bảo Hiểm Y Tế</h1>
        <div className="mx-auto bg-primary" style={{ height: "3px", width: "80px" }}></div>
      </div>

      <div className="row g-4">
        {/* Mục 1 & 4 dùng Card đơn giản */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-start border-4 border-primary">
            <div className="card-body">
              <h3 className="h5 fw-bold text-primary">1. Bảo hiểm y tế là gì?</h3>
              <p className="card-text text-muted">
                Bảo hiểm y tế (BHYT) là hình thức bảo hiểm bắt buộc giúp người dân chi trả một phần hoặc toàn bộ chi phí khám chữa bệnh khi đi điều trị tại các cơ sở y tế.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-start border-4 border-info">
            <div className="card-body">
              <h3 className="h5 fw-bold text-info">4. Đối tượng hưởng 100% BHYT</h3>
              <ul className="mb-0 text-muted">
                <li>Trẻ em dưới 6 tuổi</li>
                <li>Người nghèo, dân tộc thiểu số</li>
                <li>Người có công với cách mạng</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mục 2 & 3 dùng Card với List Group */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white fw-bold">2. Quyền lợi khi sử dụng BHYT</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Thanh toán từ 80% đến 100% chi phí</li>
              <li className="list-group-item">Hưởng các dịch vụ y tế theo quy định</li>
              <li className="list-group-item">Áp dụng cả ngoại trú và nội trú</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white fw-bold">3. Hồ sơ cần mang theo</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Thẻ BHYT còn hiệu lực</li>
              <li className="list-group-item">CMND/CCCD bản chính</li>
              <li className="list-group-item">Giấy chuyển tuyến (nếu có)</li>
            </ul>
          </div>
        </div>

        {/* Mục 5 dùng Alert để nhấn mạnh */}
        <div className="col-12 mt-4">
          <div className="alert alert-warning border-0 shadow-sm d-flex align-items-center" role="alert">
            <div className="ms-2">
              <h4 className="alert-heading fw-bold">⚠️ 5. Lưu ý quan trọng</h4>
              <ul className="mb-0">
                <li>Phải khám đúng tuyến để hưởng mức cao nhất</li>
                <li>Không cho người khác mượn thẻ BHYT</li>
                <li>Luôn kiểm tra thời hạn thẻ trước khi khám</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuongDanBaoHiemYTe;
