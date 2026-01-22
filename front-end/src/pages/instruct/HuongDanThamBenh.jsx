import React from "react";

const HuongDanThamBenh = () => {
  return (
    <div className="container py-5">
      {/* Header trang */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-success text-uppercase">Hướng Dẫn Thăm Bệnh</h1>
        <div className="mx-auto bg-success mb-3" style={{ height: "4px", width: "50px" }}></div>
        <p className="text-muted fs-5">Chung tay xây dựng môi trường điều trị yên tĩnh và an toàn</p>
      </div>

      <div className="row justify-content-center g-4">
        {/* 1. Thời gian thăm bệnh */}
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4 border-start border-5 border-success">
              <h4 className="fw-bold text-success mb-3">1. Thời gian thăm bệnh</h4>
              <p className="card-text mb-0 fs-6">
                Người nhà và khách thăm bệnh chỉ được phép vào thăm bệnh nhân trong khung giờ do bệnh viện quy định để đảm bảo quá trình điều trị và nghỉ ngơi của bệnh nhân.
                <span className="d-block mt-2 text-muted italic small">*Vui lòng xem lịch trực cụ thể tại bảng thông báo ở sảnh chính.</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Quy định & 3. Vật dụng */}
        <div className="col-lg-5 col-md-6">
          <div className="card h-100 shadow-sm border-0 bg-light">
            <div className="card-body">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">2. Quy định tại phòng bệnh</h5>
              <ul className="list-group list-group-flush bg-transparent">
                <li className="list-group-item bg-transparent px-0 border-0 py-1">- Rửa tay sát khuẩn trước khi vào.</li>
                <li className="list-group-item bg-transparent px-0 border-0 py-1">- Giữ trật tự, nói chuyện nhỏ nhẹ.</li>
                <li className="list-group-item bg-transparent px-0 border-0 py-1">- Không tự ý dùng thiết bị y tế.</li>
                <li className="list-group-item bg-transparent px-0 border-0 py-1">- Không làm phiền bệnh nhân khác.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-5 col-md-6">
          <div className="card h-100 shadow-sm border-0 bg-light">
            <div className="card-body">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">3. Vật dụng mang theo</h5>
              <ul className="list-group list-group-flush bg-transparent">
                <li className="list-group-item bg-transparent px-0 border-0 py-1 text-success fw-medium">+ Hoa tươi, trái cây (theo chỉ định).</li>
                <li className="list-group-item bg-transparent px-0 border-0 py-1 text-danger">x Không mang thức ăn có mùi.</li>
                <li className="list-group-item bg-transparent px-0 border-0 py-1 text-danger">x Không đồ uống có cồn.</li>
                <li className="list-group-item bg-transparent px-0 border-0 py-1 text-danger">x Không vật dụng dễ cháy nổ.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Lưu ý quan trọng */}
        <div className="col-lg-10 mt-4">
          <div className="alert alert-warning border-0 shadow-sm p-4">
            <h5 className="fw-bold text-dark mb-3">4. Lưu ý quan trọng</h5>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">- Không tụ tập đông người.</p>
                <p className="mb-2">- Không quay phim, chụp ảnh.</p>
              </div>
              <div className="col-md-6">
                <p className="mb-0 fw-bold">- Tuân thủ hướng dẫn của nhân viên y tế.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuongDanThamBenh;
