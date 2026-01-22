import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar, Badge, Dropdown } from "react-bootstrap";
import { IoHomeSharp, IoSearch, IoNotifications } from "react-icons/io5";
import { useAuth } from "~/services/auth/AuthContext";
import api from "~/services/api";
import logoChuong from "~/assets/img/logoChuong.png";

const Header = () => {
  const [showDropdownAbout, setShowDropdownAbout] = useState(false);
  const [showDropdownMedia, setShowDropdownMedia] = useState(false);
  const [categoryMedical, setCategoryMedical] = useState([]);
  const { user, logout, refreshUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/truyen-thong?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };



  const fetchMedical = async () => {
    try {
      const responseMedical = await api.get("/medical");
      if (responseMedical.data.success) {
        setCategoryMedical(responseMedical.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching medical", error);
    }
  };

  const categories = Array.isArray(categoryMedical) ? [...new Set(categoryMedical.map((item) => item.category))] : [];
  const currentCategory = searchParams.get("category");



  useEffect(() => {
    fetchMedical();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      await fetchNotifications();
      await refreshUser();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  // unreadCount sẽ lấy trực tiếp từ user.c_notifications để đồng bộ

  return (
    <div className="nav-item mx-2">
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container fluid className="px-5">
          {/* Logo */}
          <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
            <img src={logoChuong} alt="logo" className="img-fluid" style={{ maxHeight: "50px" }} />
            <h3 className="mx-3 my-0 fw-bold title-name-hospital text-uppercase">Bv Anh Hùng</h3>
          </Navbar.Brand>

          {/* Toggle button cho mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search Form */}
            <Nav className="ms-auto d-flex align-items-center gap-2">
              {/* Search Form */}
              <Form className="position-relative me-3" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                  className="pe-5 rounded-pill border-secondary"
                  style={{ minWidth: "60px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  variant="link"
                  type="submit"
                  className="position-absolute top-50 end-0 translate-middle-y border-0 text-secondary text-decoration-none"
                  style={{ padding: "0.375rem 0.75rem" }}
                >
                  <IoSearch className="mb-1" />
                </Button>
              </Form>
            </Nav>

            {/* Menu chính */}
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link as={NavLink} to="/" className="mx-2 fw-medium">
                <IoHomeSharp size={16} className="mb-1" />
              </Nav.Link>
              {/* dropdown giới thiệu */}
              <div
                className="nav-item dropdown mx-2"
                onMouseEnter={() => setShowDropdownAbout(true)}
                onMouseLeave={() => setShowDropdownAbout(false)}
              >
                <Nav.Link as={NavLink} to="/gioi-thieu" className="mx-2 fw-medium">
                  Giới thiệu
                </Nav.Link>
                <ul className={`dropdown-menu shadow-sm ${showDropdownAbout ? "show" : ""}`}>
                  <li>
                    <NavLink to="gioi-thieu/duong-day-nong" className="dropdown-item">
                      Đường dây nóng
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="gioi-thieu/chinh-sach-chat-luong" className="dropdown-item">
                      Chính sách chất lượng
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="gioi-thieu/co-cau-to-chuc" className="dropdown-item">
                      Cơ cấu tổ chức
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Nav.Link as={NavLink} to="/dieu-tri" className="mx-2 fw-medium">
                Điều trị
              </Nav.Link>
              <Nav.Link as={NavLink} to="/dich-vu" className="mx-2 fw-medium">
                Dịch vụ
              </Nav.Link>

              <Nav.Link as={NavLink} to="/tim-bac-si" className="mx-2 fw-medium">
                Tìm bác sĩ
              </Nav.Link>

              {user && (
                <Nav.Link as={NavLink} to="/dat-lich" className="mx-2 fw-medium">
                  Đặt lịch
                </Nav.Link>
              )}

              {/* Dropdown Truyền thông */}
              <div
                className="nav-item dropdown mx-2"
                onMouseEnter={() => setShowDropdownMedia(true)}
                onMouseLeave={() => setShowDropdownMedia(false)}
              >
                <NavLink to="/truyen-thong" className="nav-link fw-medium" role="button">
                  Truyền thông
                </NavLink>
                <ul className={`dropdown-menu shadow-sm ${showDropdownMedia ? "show" : ""}`}>
                  {categories.map((cat) => (
                    <li key={cat}>
                      <NavLink
                        to={`/truyen-thong?category=${encodeURIComponent(cat)}`}
                        className={({ isActive }) =>
                          `dropdown-item ${isActive && currentCategory === cat ? "active" : ""}`
                        }
                      >
                        {cat}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <NavLink to="tuyen-dung" className="dropdown-item">
                      Tuyển dụng
                    </NavLink>
                  </li>
                </ul>
              </div>

              <Nav.Link as={NavLink} to="/lien-he" className="mx-2 fw-medium">
                Liên hệ
              </Nav.Link>

              {/* Admin Link */}
              {user?.role === "admin" && (
                <Nav.Link as={NavLink} to="/admin" className="mx-2 fw-medium text-primary">
                  Quản trị admin
                </Nav.Link>
              )}

              {/* Auth Links */}
              <Nav className="ms-auto d-flex align-items-center">
                {user ? (
                  <div className="d-flex align-items-center gap-2">
                    <a href="/thong-tin-cua-toi" className="d-block text-decoration-none">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="rounded-circle border"
                          style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                          style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
                        >
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                      )}
                    </a>
                    <Button variant="outline-danger" size="sm" onClick={logout}>
                      Đăng xuất
                    </Button>

                    {/* Notification Dropdown */}
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="link"
                        className="position-relative text-dark p-0 border-0"
                        style={{ fontSize: "16px", boxShadow: "none" }}
                      >
                        <IoNotifications />
                        {user.c_notifications > 0 && (
                          <Badge
                            bg="danger"
                            pill
                            className="position-absolute"
                            style={{
                              top: "-5px",
                              right: "-8px",
                              fontSize: "0.6rem",
                              padding: "2px 5px"
                            }}
                          >
                            {user.c_notifications}
                          </Badge>
                        )}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{ width: "350px", maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}
                      >
                        <Dropdown.Header className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Thông báo</span>
                          {user.c_notifications > 0 && (
                            <Badge bg="danger" pill>
                              {user.c_notifications} mới
                            </Badge>
                          )}
                        </Dropdown.Header>
                        <Dropdown.Divider />

                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <Dropdown.Item
                              key={notification.id}
                              onClick={() => {
                                if (!notification.is_read) {
                                  handleMarkAsRead(notification.id);
                                }
                              }}
                              className={`py-3 ${!notification.is_read ? "bg-dark text-white bg-opacity-10" : ""}`}
                              style={{ whiteSpace: "normal", width: "100%" }}
                            >
                              <div style={{ pointerEvents: "none" }}>
                                <div className="d-flex align-items-center mb-1">
                                  <strong className="me-2">{notification.title}</strong>
                                  {!notification.is_read && (
                                    <Badge bg="primary" style={{ fontSize: "0.65rem" }}>
                                      Mới
                                    </Badge>
                                  )}
                                </div>
                                <p className="mb-1 small text-muted" style={{ wordBreak: "break-word" }}>
                                  {notification.message}
                                </p>
                                <small className="text-muted">
                                  {new Date(notification.created_at).toLocaleString("vi-VN")}
                                </small>
                              </div>
                            </Dropdown.Item>
                          ))
                        ) : (
                          <Dropdown.Item className="text-center text-muted py-4">Không có thông báo nào</Dropdown.Item>
                        )}

                        <Dropdown.Divider />
                        <Dropdown.Item className="text-center text-primary fw-medium" href="/thong-tin-cua-toi">
                          Xem tất cả thông báo
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <>
                    <Nav.Link as={NavLink} to="/dang-nhap" className="fw-medium">
                      Đăng nhập
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/dang-ky" className="fw-medium">
                      Đăng ký
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
