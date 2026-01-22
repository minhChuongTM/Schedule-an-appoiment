import React from "react";

const NoiQuyBenhVien = () => {
  return (
    <div className="container py-5">
      {/* Header trang với Badge chuyên nghiệp */}
      <div className="text-center mb-5">
        <span className="badge bg-danger mb-2 px-3 py-2 text-uppercase">Quy định bắt buộc</span>
        <h1 className="display-5 fw-bold text-dark">NỘI QUY BỆNH VIỆN</h1>
        <div className="mx-auto bg-danger" style={{ height: "3px", width: "80px" }}></div>
      </div>

      <div className="row g-4">
        {/* 1. Quy định chung */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold text-danger border-bottom pb-2 mb-3">1. Quy định chung</h5>
              <ul className="list-group list-group-flush small">
                <li className="list-group-item px-0 border-0">- Tuân thủ hướng dẫn của nhân viên y tế.</li>
                <li className="list-group-item px-0 border-0">- Giữ trật tự, không gây ồn ào.</li>
                <li className="list-group-item px-0 border-0">- Tuyệt đối không hút thuốc, chất kích thích.</li>
                <li className="list-group-item px-0 border-0">- Giữ gìn vệ sinh và môi trường chung.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Đối với người bệnh */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold text-danger border-bottom pb-2 mb-3">2. Đối với người bệnh</h5>
              <ul className="list-group list-group-flush small">
                <li className="list-group-item px-0 border-0">- Mang theo giấy tờ tùy thân và thẻ BHYT.</li>
                <li className="list-group-item px-0 border-0">- Cung cấp thông tin sức khỏe chính xác.</li>
                <li className="list-group-item px-0 border-0">- Tuân thủ phác đồ điều trị.</li>
                <li className="list-group-item px-0 border-0">- Không tự ý rời khu vực điều trị.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Đối với người nhà */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body p-4">
              <h5 className="fw-bold text-dark mb-3">3. Đối với người nhà và khách thăm</h5>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-2 small">• Thăm bệnh đúng giờ quy định.</p>
                  <p className="mb-2 small">• Không tụ tập đông người trong phòng.</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2 small">• Không mang thức ăn không phù hợp.</p>
                  <p className="mb-0 small">• Tôn trọng sự riêng tư của bệnh nhân.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. An toàn tài sản */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100 bg-white">
            <div className="card-body">
              <h5 className="fw-bold text-dark mb-3">4. An toàn và tài sản</h5>
              <p className="small text-muted mb-2">• Tự bảo quản tài sản cá nhân.</p>
              <p className="small text-muted mb-2">• Không mang vật dụng nguy hiểm.</p>
              <p className="small text-muted mb-0">• Báo ngay sự cố cho nhân viên y tế.</p>
            </div>
          </div>
        </div>

        {/* 5. Xử lý vi phạm */}
        <div className="col-12 mt-4">
          <div className="alert alert-secondary border-0 shadow-sm mb-0 p-4">
            <h5 className="fw-bold text-dark">5. Xử lý vi phạm</h5>
            <p className="mb-0">Những cá nhân vi phạm nội quy sẽ bị nhắc nhở hoặc xử lý theo quy định hiện hành của bệnh viện. Mọi ý kiến đóng góp vui lòng liên hệ đường dây nóng tại sảnh chính.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoiQuyBenhVien;
