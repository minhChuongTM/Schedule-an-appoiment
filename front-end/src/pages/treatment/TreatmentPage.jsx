import React from "react";
import { Link } from "react-router-dom";
import HospitalBanner from "~/components/common/HospitalBanner";
import khoangoaiImage from "../../assets/img/imgi_10_(584x341)__1.jpg";
import ngoaitietnieuImage from "../../assets/img/imgi_11_(584x341)__2.jpg";
import namkhoaImage from "../../assets/img/imgi_12_(584x341)__3.jpg";
import nieunuImage from "../../assets/img/imgi_13_(584x341)__Untitled-1-01.jpg";
import phauthuattimmachmauImage from "../../assets/img/imgi_15_(584x341)__4.jpg";
import chuyenkhoakhacImage from "../../assets/img/imgi_14_(584x341)__tim_mm_584x341-01.jpg";


const treatmentList = [
  {
    title: "Ngoại Tổng Quát",
    image: khoangoaiImage,
    link: "/dieu-tri/ngoai-tong-quat",
  },
  {
    title: "Ngoại Tiết Niệu",
    image:
      ngoaitietnieuImage,
    link: "/dieu-tri/ngoai-tiet-nieu",
  },
  {
    title: "Nam Khoa",
    image:
      namkhoaImage,
    link: "/dieu-tri/nam-khoa",
  },
  {
    title: "Niệu Nữ",
    image:
       nieunuImage,
    link: "/dieu-tri/nieu-nu",
  },
  {
    title: "Phẫu thuật Tim – Mạch Máu",
    image:
      phauthuattimmachmauImage,
    link: "/dieu-tri/tim-mach-mau",
  },
  {
    title: "Chuyên khoa khác",
    image:
      chuyenkhoakhacImage,
    link: "/dieu-tri/chuyen-khoa-khac",
  },
];

const Treatment = () => {
  return (
    <>
      {/* Banner */}
      <HospitalBanner title="Điều trị" parentLabel="Điều trị" currentLabel="" />

      <section className="container my-5">
        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">LĨNH VỰC ĐIỀU TRỊ</h2>
          <p className="text-muted">
            Các chuyên khoa điều trị chuyên sâu tại Bệnh viện Bình Dân
          </p>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {treatmentList.map((item, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <Link
                to={item.link}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 border-0 shadow-sm treatment-card">
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        transition: "0.4s",
                      }}
                    />
                  </div>

                  <div className="card-body text-center">
                    <h6 className="fw-semibold mb-0 text-uppercase">
                      {item.title}
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Treatment;
