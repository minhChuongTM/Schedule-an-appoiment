import React, { useEffect, useState } from "react";
import MultiCarousel from "react-multi-carousel";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router";
//css react-multi-carousel
import "react-multi-carousel/lib/styles.css";
//file import
import Banner1 from "~/assets/img/banner1.jpg";
import Banner2 from "~/assets/img/banner2.jpg";
import Banner3 from "~/assets/img/banner3.jpg";
import icon1 from "~/assets/img/115__i-1.png";
import icon2 from "~/assets/img/115__i-2.png";
import icon3 from "~/assets/img/115__i-6.png";
import icon4 from "~/assets/img/115__icon-xe_2.png";
import icon5 from "~/assets/img/115__send.png";
import ii1 from "~/assets/img/ii-1.png";
import ii2 from "~/assets/img/ii-2.png";
import ii3 from "~/assets/img/ii-3.png";
import ii4 from "~/assets/img/ii-4.png";
import CountUp from "react-countup";
import StickyMennu from "~/components/stickyMenu/StickyMennu";
import api from "~/services/api";

const HomePage = () => {
  const [medicals, setMedicals] = useState([]);

  
  useEffect(() => {
    const fetchMedical = async () => {
      try {
        const response = await api.get("/medical");
        if (response.data.success) {
          setMedicals(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching medical", error);
      }
    };
    fetchMedical();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className="">
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img className="d-block w-100" src={Banner1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Banner2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Banner3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      <div className="chuyenkhoaHome">
        <div className="container">
          <div className="titleHome">
            <h2>Các chuyên khoa</h2>
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-lg-10 text-center">
              <span>
                Bệnh viện 5 SUPERHERO HOSPITAL là bệnh viện chuyên khoa hạng I về phẫu thuật tổng quát, niệu khoa và nam
                khoa với trang thiết bị hiện đại, phát triển nhiều lĩnh vực chuyên sâu do các giáo sư, phó giáo sư, tiến
                sĩ, bác sĩ, chuyên gia đảm trách.
              </span>
            </div>
          </div>

          <div className="row g-4">
            {/* Ngoại tổng quát */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chuyenkhoa">
                <div className="img">
                  <Link to="dieu-tri/ngoai-tong-quat">
                    <img
                      src="https://bvbinhdan.com.vn/vnt_upload/treatment/08_2018/thumbs/(791x461)__1.jpg"
                      alt="Ngoại tổng quát"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div>
                  <h3>
                    <Link to="dieu-tri/ngoai-tong-quat">Ngoại tổng quát</Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Ngoại tiết niệu */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chuyenkhoa">
                <div className="img">
                  <Link to="dieu-tri/ngoai-tiet-nieu">
                    <img
                      src="https://bvbinhdan.com.vn/vnt_upload/treatment/08_2018/thumbs/(791x461)__2.jpg"
                      alt="Ngoại tiết niệu"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div>
                  <h3>
                    <Link to="dieu-tri/ngoai-tiet-nieu">Ngoại tiết niệu</Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Nam khoa */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chuyenkhoa">
                <div className="img">
                  <Link to="dieu-tri/nam-khoa">
                    <img
                      src="https://bvbinhdan.com.vn/vnt_upload/treatment/08_2018/thumbs/(791x461)__3.jpg"
                      alt="Nam khoa"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div>
                  <h3>
                    <Link to="dieu-tri/nam-khoa">Nam khoa</Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Niệu nữ */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chuyenkhoa">
                <div className="img">
                  <Link to="dieu-tri/nieu-nu">
                    <img
                      src="https://bvbinhdan.com.vn/vnt_upload/treatment/01_2022/thumbs/(791x461)__Untitled-1-01.jpg"
                      alt="NIỆU NỮ"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div>
                  <h3>
                    <Link to="dieu-tri/nieu-nu">NIỆU NỮ</Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Phẫu thuật tim - mạch máu */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chuyenkhoa">
                <div className="img">
                  <Link to="dieu-tri/tim-mach-mau">
                    <img
                      src="https://bvbinhdan.com.vn/vnt_upload/treatment/01_2022/thumbs/(791x461)__tim_mm_584x341-01.jpg"
                      alt="PHẪU THUẬT TIM - MẠCH MÁU"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div>
                  <h3>
                    <Link to="dieu-tri/tim-mach-mau">PHẪU THUẬT TIM - MẠCH MÁU</Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Chuyên khoa khác */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chuyenkhoa">
                <div className="img">
                  <Link to="dieu-tri/chuyen-khoa-khac">
                    <img
                      src="https://bvbinhdan.com.vn/vnt_upload/treatment/08_2018/thumbs/(791x461)__4.jpg"
                      alt="Chuyên khoa khác"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div>
                  <h3>
                    <Link to="dieu-tri/chuyen-khoa-khac">Chuyên khoa khác</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="serviceHome">
        <div className="wrapper container-fluid">
          <div className="titleHome">
            <h2 className="mb-0">Dịch vụ</h2>
          </div>
          <MultiCarousel responsive={responsive} autoPlay autoPlaySpeed={3000} infinite pauseOnHover arrows>
            <div className="d-flex justify-content-center">
              <Link to={""} className="text-decoration-none">
                <img src={icon1} alt="Phẫu thuật trong ngày" className="img-fluid" />
                <h3 className="titleService">Dịch vụ phẩu thuật trong ngày</h3>
              </Link>
            </div>
            <div className="d-flex justify-content-center">
              <Link to={""} className="text-decoration-none">
                <img src={icon2} alt="Tư vấn thuốc" className="img-fluid" />
                <h3 className="titleService">Dịch vụ tư vấn thuốc</h3>
              </Link>
            </div>
            <div className="d-flex justify-content-center">
              <Link to={""} className="text-decoration-none">
                <img src={icon3} alt="Hỗ trợ xuất viện" className="img-fluid" />
                <h3 className="titleService">Hỗ trợ xuất viện</h3>
              </Link>
            </div>
            <div className="d-flex justify-content-center">
              <Link to={""} className="text-decoration-none">
                <img src={icon4} alt="Dịch vụ vận chuyển" className="img-fluid" />
                <h3 className="titleService">Dịch vụ vận chuyển</h3>
              </Link>
            </div>
            <div className="d-flex justify-content-center">
              <Link to={""} className="text-decoration-none">
                <img src={icon5} alt="Chuyển phát nhanh" className="img-fluid" />
                <h3 className="titleService">Chuyển phát nhanh</h3>
              </Link>
            </div>
          </MultiCarousel>
        </div>
      </div>
      <div className="dashboard-home">
        <div className="container-fluid">
          <div className="titleHome text-center">
            <h2 className="mb-4">Tổng quan bệnh viện</h2>
          </div>
          <div className="text text-center mb-5">
            <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
              Thành lập từ năm 2030, Bệnh viện 5 SUPERHERO HOPITAL là chiếc nôi ngành ngoại khoa của TP.Tương Lai và các
              tỉnh thành phía Nam. Đây là địa chỉ uy tín của người dân trong lựa chọn nơi khám bệnh và phẫu thuật.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="item text-center p-4 h-100">
                <div className="img mb-3">
                  <img src={ii1} alt="" className="img-fluid" />
                </div>
                <div className="num">
                  <p className="display-4 fw-bold text-primary mb-2">
                    <CountUp start={0} end={70} duration={2.5} separator="," suffix="+" enableScrollSpy scrollSpyOnce />
                  </p>
                </div>
                <div className="text">
                  <p className="mb-0">năm hình thành & phát triển</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="item text-center p-4 h-100">
                <div className="img mb-3">
                  <img src={ii2} alt="" className="img-fluid" />
                </div>
                <div className="num">
                  <p className="display-4 fw-bold text-primary mb-2">
                    <CountUp
                      start={0}
                      end={900}
                      duration={2.5}
                      separator=","
                      suffix="+"
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </p>
                </div>
                <div className="text">
                  <p className="mb-0">giường cho bệnh nhân</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="item text-center p-4 h-100">
                <div className="img mb-3">
                  <img src={ii3} alt="" className="img-fluid" />
                </div>
                <div className="num">
                  <p className="display-4 fw-bold text-primary mb-2">
                    <CountUp
                      start={0}
                      end={40000}
                      duration={2.5}
                      separator="."
                      suffix="+"
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </p>
                </div>
                <div className="text">
                  <p className="mb-0">ca phẫu thuật thành công hằng năm</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="item text-center p-4 h-100">
                <div className="img mb-3">
                  <img src={ii4} alt="" className="img-fluid" />
                </div>
                <div className="num">
                  <p className="display-4 fw-bold text-primary mb-2">
                    <CountUp
                      start={0}
                      end={610000}
                      duration={2.5}
                      separator=","
                      suffix="+"
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </p>
                </div>
                <div className="text">
                  <p className="mb-0">bệnh nhân được điều trị hằng năm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StickyMennu />
    </div>
  );
};

export default HomePage;
