import { useLocation } from "react-router";
import { Link } from "react-router";
import HospitalBanner from "~/components/common/HospitalBanner";

function XuatVienSom() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const getLinkStyle = (path) => ({
    color: isActive(path) ? "var(--brandColor)" : "#ccc",
    borderBottom: isActive(path)
      ? "2px solid var(--brandColor)"
      : "1px solid #ccc",
    fontWeight: isActive(path) ? "600" : "500",
  });

  return (
    <>
      <HospitalBanner
        parentLabel="Dịch vụ"
        currentLabel="Xuất viện sớm"
        title="Xuất viện sớm"
      />
      <section className="container my-5">
        <div className="row">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <h2>Hỗ trợ xuất viện sớm</h2>
            <p>
              Bệnh viện Anh Hùng cung cấp dịch vụ hỗ trợ xuất viện sớm, giúp
              bệnh nhân có thể hồi phục tại nhà với sự hỗ trợ chuyên nghiệp.
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
                  style={getLinkStyle("/dich-vu/phau-thuat")}
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
                  style={getLinkStyle("/dich-vu/xuat-vien-som")}
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
                  style={getLinkStyle("/dich-vu/chuyen-phat")}
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
                  style={getLinkStyle("/dich-vu/xe-van-chuyen")}
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
                  style={getLinkStyle("/dich-vu/tu-van-thuoc")}
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

export default XuatVienSom;
