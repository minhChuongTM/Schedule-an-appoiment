import { useLocation } from "react-router";
import { Link } from "react-router";
import HospitalBanner from "~/components/common/HospitalBanner";

function PhauThuat() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <HospitalBanner
        parentLabel="Dịch vụ"
        currentLabel="Dịch vụ phẫu thuật trong ngày"
        title="Dịch vụ phẫu thuật trong ngày"
      />
      <section className="container my-5">
  
        <div className="row">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <h2>Thông tin về phẫu thuật</h2>
            <p>
              Bệnh viện Anh Hùng cung cấp đầy đủ thông tin về quy trình phẫu
              thuật, giúp người bệnh an tâm điều trị.
            </p>
          </div>
  
          {/* RIGHT SIDEBAR */}
          <div className="col-lg-4">
            <h6
              className="fw-bold text-uppercase mb-3"
              style={{ color: "var(--brandColor)" }}
            >
              Dịch vụ
            </h6>
  
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to="/dich-vu/phau-thuat"
                  className="d-flex justify-content-between align-items-center 
                               fw-semibold text-decoration-none 
                               pb-2"
                  style={{
                    color: isActive("/dich-vu/phau-thuat") ? "var(--brandColor)" : "#ccc",
                    borderBottom: isActive("/dich-vu/phau-thuat") ? "2px solid var(--brandColor)" : "1px solid #ccc",
                  }}
                >
                  <span>Dịch vụ phẫu thuật trong ngày</span>
                  <span>›</span>
                </Link>
              </li>
  
              <li className="mb-3">
                <Link
                  to="/dich-vu/xuat-vien-som"
                  className="d-flex justify-content-between align-items-center 
                               text-decoration-none 
                               pb-2"
                  style={{
                    color: isActive("/dich-vu/xuat-vien-som") ? "var(--brandColor)" : "#ccc",
                    borderBottom: isActive("/dich-vu/xuat-vien-som") ? "2px solid var(--brandColor)" : "1px solid #ccc",
                    fontWeight: isActive("/dich-vu/xuat-vien-som") ? "600" : "normal",
                  }}
                >
                  <span>Hỗ trợ xuất viện sớm</span>
                  <span>›</span>
                </Link>
              </li>
  
              <li className="mb-3">
                <Link
                  to="/dich-vu/chuyen-phat"
                  className="d-flex justify-content-between align-items-center 
                               text-decoration-none 
                               pb-2"
                  style={{
                    color: isActive("/dich-vu/chuyen-phat") ? "var(--brandColor)" : "#ccc",
                    borderBottom: isActive("/dich-vu/chuyen-phat") ? "2px solid var(--brandColor)" : "1px solid #ccc",
                    fontWeight: isActive("/dich-vu/chuyen-phat") ? "600" : "normal",
                  }}
                >
                  <span>Chuyển phát nhanh</span>
                  <span>›</span>
                </Link>
              </li>
  
              <li className="mb-3">
                <Link
                  to="/dich-vu/xe-van-chuyen"
                  className="d-flex justify-content-between align-items-center 
                               text-decoration-none 
                               pb-2"
                  style={{
                    color: isActive("/dich-vu/xe-van-chuyen") ? "var(--brandColor)" : "#ccc",
                    borderBottom: isActive("/dich-vu/xe-van-chuyen") ? "2px solid var(--brandColor)" : "1px solid #ccc",
                    fontWeight: isActive("/dich-vu/xe-van-chuyen") ? "600" : "normal",
                  }}
                >
                  <span>Xe vận chuyển</span>
                  <span>›</span>
                </Link>
              </li>
  
              <li>
                <Link
                  to="/dich-vu/tu-van-thuoc"
                  className="d-flex justify-content-between align-items-center 
                               text-decoration-none 
                               pb-2"
                  style={{
                    color: isActive("/dich-vu/tu-van-thuoc") ? "var(--brandColor)" : "#ccc",
                    borderBottom: isActive("/dich-vu/tu-van-thuoc") ? "2px solid var(--brandColor)" : "1px solid #ccc",
                    fontWeight: isActive("/dich-vu/tu-van-thuoc") ? "600" : "normal",
                  }}
                >
                  <span>Tư vấn thuốc</span>
                  <span>›</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default PhauThuat;
