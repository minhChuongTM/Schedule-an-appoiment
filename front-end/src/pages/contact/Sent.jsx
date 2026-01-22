import React from "react";
import { useLocation } from "react-router";
import StickyMennu from "~/components/stickyMenu/StickyMennu";

const Sent = () => {
  const { state } = useLocation();
  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-success text-white py-3">
          <h2 className="mb-0 d-flex align-items-center">
            <span className="me-2">📧</span>
            Email đã được gửi thành công
          </h2>
        </div>

        <div className="card-body p-4">
          <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
            <svg className="me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            <div>Thông tin của bạn đã được ghi nhận!</div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <small className="text-muted d-block mb-1">Họ tên</small>
                <strong className="text-dark">{state?.name}</strong>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <small className="text-muted d-block mb-1">Email</small>
                <strong className="text-dark">{state?.email}</strong>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <small className="text-muted d-block mb-1">Số điện thoại</small>
                <strong className="text-dark">{state?.phone}</strong>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <small className="text-muted d-block mb-1">Chủ đề</small>
                <strong className="text-dark">{state?.subject}</strong>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 bg-light rounded">
                <small className="text-muted d-block mb-2">Nội dung</small>
                <p className="mb-0 text-dark" style={{ whiteSpace: "pre-wrap" }}>
                  {state?.comment}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer bg-white border-top-0 py-3">
          <button className="btn btn-primary" onClick={() => window.history.back()}>
            ← Quay lại
          </button>
        </div>
      </div>
      <StickyMennu />
    </div>
  );
};

export default Sent;
