import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaClock, FaMailBulk, FaMapMarkerAlt, FaPaperPlane, FaPhone } from "react-icons/fa";
import StickyMennu from "~/components/stickyMenu/StickyMennu";

const ContactPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    comment: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // chặn submit mặc định
    // Validate form
    const newErrors = {};

    if (!form.name) {
      newErrors.name = "Họ và tên không được bỏ trống";
    }

    if (!form.email) {
      newErrors.email = "Email không được bỏ trống";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.subject) {
      newErrors.subject = "Tiêu đề không được bỏ trống";
    }

    if (!form.comment) {
      newErrors.comment = "Nội dung không được bỏ trống";
    }

    // Nếu có lỗi, hiển thị và không submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // chuyển trang + truyền dữ liệu
    navigate("/sent", { state: form });
  };
  return (
    <div>
      <div className="contact-header">
        <div className="container">
          <h1>Liên Hệ Với Chúng Tôi</h1>
          <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
        </div>
      </div>

      {/* Thông tin liên hệ */}
      <div className="info-section">
        <div className="info-grid">
          <div className="info-item">
            <div className="info-icon">
              <FaMailBulk size={35} />
            </div>
            <h4>Email</h4>
            <p>
              info@bvanhhung.com
              <br />
              support@bvanhhung.com
            </p>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <FaPhone size={35} />
            </div>
            <h4>Hotline</h4>
            <p>
              +84 123 456 789
              <br />
              +84 987 654 321
            </p>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <FaMapMarkerAlt size={35} />
            </div>
            <h4>Địa Chỉ</h4>
            <p>
              123 Đường ABC, Quận 1<br />
              TP. Hồ Chí Minh, Việt Nam
            </p>
          </div>
        </div>
      </div>

      {/* Form liên hệ */}
      <div className="form-section">
        <div className="form-container">
          <h3>Gửi Tin Nhắn Cho Chúng Tôi</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Họ và Tên *</label>
              <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} name="name" onChange={handleChange} placeholder="Nhập họ và tên" />
              {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} name="email" onChange={handleChange} placeholder="Nhập email" />
              {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Số Điện Thoại</label>
              <input type="tel" className="form-control" name="phone" onChange={handleChange} placeholder="Nhập số điện thoại" />
            </div>

            <div className="mb-3">
              <label className="form-label">Tiêu Đề *</label>
              <input type="text" className={`form-control ${errors.subject ? "is-invalid" : ""}`} name="subject" onChange={handleChange} placeholder="Nhập tiêu đề" />
              {errors.subject && <div className="invalid-feedback d-block">{errors.subject}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label">Nội Dung *</label>
              <textarea className={`form-control ${errors.comment ? "is-invalid" : ""}`} name="comment" onChange={handleChange} rows="5" placeholder="Nhập nội dung tin nhắn"></textarea>
              {errors.comment && <div className="invalid-feedback d-block">{errors.comment}</div>}
            </div>

            <button type="submit" className="btn-submit">
              <FaPaperPlane />
              Gửi Tin Nhắn
            </button>
            <button type="reset" className="btn-reset">
              Reset
            </button>
          </form>
        </div>
      </div>

      {/* Map và giờ làm việc */}
      <div className="map-section">
        <div className="map-container-wrapper">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4967045001107!2d106.69252631533434!3d10.772889692323018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xb70a8d5376f93c9!2zMTIzIMSQLiBOZ3V54buFbiBUaOG7iyBNaW5oIEtoYWksIELhur9uIE5naMOoLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="hours-content">
            <div className="hours-header">
              <div className="hours-icon">
                <FaClock size={32} />
              </div>
              <h4>Giờ Làm Việc</h4>
            </div>
            <p>
              <strong>Thứ 2 - Thứ 6:</strong> 8:00 AM - 6:00 PM
              <br />
              <strong>Thứ 7:</strong> 9:00 AM - 5:00 PM
              <br />
              <strong>Chủ Nhật:</strong> Nghỉ
            </p>
          </div>
        </div>
      </div>
      <StickyMennu/>
    </div>
  );
};

export default ContactPage;
