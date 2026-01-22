import React, { useEffect } from "react";
import { FaUserMd, FaArrowCircleUp } from "react-icons/fa";
import { TbCalendarClock } from "react-icons/tb";
import { Link } from "react-router";

const StickyMennu = () => {
  useEffect(() => {
    const menuFixed = document.getElementById("menuFixed");

    // Show/Hide menu khi scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        menuFixed?.classList.add("show");
      } else {
        menuFixed?.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll to top functionality
    const scrollTopBtn = document.querySelector(".scroll-to-top");
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="fixed-menu-wrapper">
      <ul className="menuFixed list-unstyled m-0 p-0" id="menuFixed">
        <li className="menu-item mb-3">
          <Link to="/tim-bac-si" className="menu-link d-flex align-items-center text-decoration-none">
            <span className="divText position-absolute bg-success text-white px-3 py-2 rounded-pill shadow-sm">
              <span>Tìm bác sĩ</span>
            </span>
            <span className="divIcon d-flex align-items-center justify-content-center rounded-circle bg-white shadow">
              <FaUserMd className="icon-style icon-doctor" />
            </span>
          </Link>
        </li>
        <li className="menu-item mb-3">
          <Link to="/dat-lich" className="menu-link d-flex align-items-center text-decoration-none">
            <span className="divText position-absolute bg-info text-white px-3 py-2 rounded-pill shadow-sm">
              <span>Đặt hẹn khám</span>
            </span>
            <span className="divIcon d-flex align-items-center justify-content-center rounded-circle bg-white shadow">
              <TbCalendarClock className="icon-style icon-calendar" />
            </span>
          </Link>
        </li>
        <li className="menu-item mb-0">
          <Link to="#top" className="menu-link scroll-to-top d-flex align-items-center text-decoration-none">
            <span className="divText position-absolute bg-warning text-white px-3 py-2 rounded-pill shadow-sm">
              <span>Lên đầu trang</span>
            </span>
            <span className="divIcon d-flex align-items-center justify-content-center rounded-circle bg-white shadow">
              <FaArrowCircleUp className="icon-style icon-arrow" />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StickyMennu;
