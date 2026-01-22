import React from "react";
import { Link } from "react-router";

const ServicePage = () => {
  return <div>
    <div className="container my-5">
      <div className="row g-4">

        {/* Service 1 */}
        <div className="col-lg-4 col-md-6">
          <div className="card service-card h-100 text-center">
            <img
              src="https://bvbinhdan.com.vn/vnt_upload/service/08_2018/thumbs/85__i-1.png"
              className="card-img-top service-img"
              alt="Thông Tin Về Phẫu Thuật"
            />
            <div className="card-body">
              <h5 className="card-title">
                <Link to="phau-thuat">
                  Thông Tin Về Phẫu Thuật
                </Link>
              </h5>
              <p className="card-text">
                Rút ngắn thời gian chờ đợi khám. Người bệnh được nhập viện và phẫu thuật trong ngày.
              </p>
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div className="col-lg-4 col-md-6">
          <div className="card service-card h-100 text-center">
            <img
              src="https://bvbinhdan.com.vn/vnt_upload/service/08_2018/thumbs/85__i-6.png"
              className="card-img-top service-img"
              alt="Quy Trình Xuất Viện"
            />
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/dich-vu/xuat-vien-som">
                  Hỗ trợ xuất viện sớm
                </Link>
              </h5>
              <p className="card-text">
                Hỗ trợ hoàn tất thủ tục và xuất viện nhanh chóng.
              </p>
            </div>
          </div>
        </div>

        {/* Service 3 */}
        <div className="col-lg-4 col-md-6">
          <div className="card service-card h-100 text-center">
            <img
              src="https://bvbinhdan.com.vn/vnt_upload/service/08_2018/thumbs/85__send.png"
              className="card-img-top service-img"
              alt="Chuyển Phát Hồ Sơ Bệnh Án"
            />
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/dich-vu/chuyen-phat">
                  Dịch vụ chuyển phát nhanh
                </Link>
              </h5>
              <p className="card-text">
                Chuyển phát hồ sơ hành chánh và viện phí tạm ứng còn dư.
              </p>
            </div>
          </div>
        </div>

        {/* Service 4 */}
        <div className="col-lg-4 col-md-6">
          <div className="card service-card h-100 text-center">
            <img
              src="https://bvbinhdan.com.vn/vnt_upload/service/08_2018/thumbs/85__icon-xe_2.png"
              className="card-img-top service-img"
              alt="Xe Vận Chuyển"
            />
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/dich-vu/xe-van-chuyen">
                  Dịch vụ xe vận chuyển
                </Link>
              </h5>
              <p className="card-text">
                Đáp ứng nhu cầu vận chuyển người bệnh an toàn.
              </p>
            </div>
          </div>
        </div>

        {/* Service 5 */}
        <div className="col-lg-4 col-md-6">
          <div className="card service-card h-100 text-center">
            <img
              src="https://bvbinhdan.com.vn/vnt_upload/service/08_2018/thumbs/85__i-2.png"
              className="card-img-top service-img"
              alt="Tư vấn thuốc"
            />
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/dich-vu/tu-van-thuoc">
                  Dịch vụ tư vấn thuốc
                </Link>
              </h5>
              <p className="card-text">
                Giải đáp thắc mắc và tư vấn sử dụng thuốc an toàn.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>;
};

export default ServicePage;
