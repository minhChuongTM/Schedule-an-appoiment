import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import bannerImage from "~/assets/img/imgi_9_slide2.jpg";

const HospitalBanner = ({
  parentPath = "/gioi-thieu",
  parentLabel = "Giới thiệu",
  currentLabel = "Tổng quan bệnh viện",
  title = "Tổng quan bệnh viện",
  subtitle = "Nơi hội tụ đội ngũ chuyên gia, công nghệ hiện đại và dịch vụ y tế chất lượng cao",
  backgroundImage = null,
  useOverlay = true,
  showSubtitle = true
}) => {
  const bgImage = backgroundImage || bannerImage;
  const backgroundStyle =
    typeof bgImage === "string" && bgImage.startsWith("http")
      ? { backgroundImage: `url('${bgImage}')` }
      : {backgroundImage: `url(${bgImage})`};

  return (
    <div
      className="position-relative text-white"
      style={{
        ...backgroundStyle,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "320px"
      }}
    >
      {/* Overlay */}
      {useOverlay && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.5 }}></div>
      )}

      <div className="position-relative h-100 d-flex align-items-center">
        <div className="container">
          {/* Breadcrumb */}
          <div className="mb-3 d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
            <Link to="/" className="text-white text-decoration-none d-flex align-items-center">
              <IoHomeOutline size={18} />
            </Link>
            <span className="mx-2 text-white">/</span>
            <Link to={parentPath} className="text-white text-decoration-none">
              {parentLabel}
            </Link>
            <span className="mx-2 text-white">/</span>
            <span className="text-white">{currentLabel}</span>
          </div>

          {/* BOX TITLE */}
          <div
            className="d-inline-block px-4 py-3"
            style={{
              backgroundColor: "var(--brandColor)"
            }}
          >
            <h1 className="fw-bold mb-0 text-white" style={{ fontSize: "2rem" }}>
              {title}
            </h1>
          </div>

          {/* Subtitle */}
          {showSubtitle && subtitle && (
            <p className="mt-3 mb-0 text-white" style={{ fontSize: "0.95rem" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalBanner;
