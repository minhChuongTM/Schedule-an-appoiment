import React, { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import api from "~/services/api";
import HospitalBanner from "~/components/common/HospitalBanner";

const BlogPage = ({ category = null, title = "Tin tức", breadcrumb = "Tin tức" }) => {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy category từ URL params hoặc props
  const urlCategory = searchParams.get("category");
  const activeCategory = urlCategory || category;

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      // const url = category ? `${encodeURIComponent(category)}` : "/medical-news";
      let url = "/medical-news";

      // Nếu có activeCategory, thêm vào URL
      if (activeCategory) {
        url += `?category=${encodeURIComponent(activeCategory)}`;
      }
      const response = await api.get(url);

      if (response.data.success) {
        const data = response.data.data;
        // Handle paginated response
        const newsArray = data.data || data;
        if (Array.isArray(newsArray)) {
          setBlogs(newsArray);
        } else {
          setBlogs([]);
        }
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Không thể tải danh sách bài viết");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      {/* Banner */}
      <HospitalBanner
        parentPath="/truyen-thong"
        parentLabel="Truyền thông"
        currentLabel={breadcrumb}
        title={title}
        subtitle="Cập nhật tin tức y tế mới nhất từ bệnh viện"
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200"
      />

      {/* Main Content */}
      <Container className="my-5">
        <Row>
          {/* Left Content - Blog List */}
          <Col lg={8}>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" style={{ color: "var(--brandColor)" }} />
                <p className="mt-3 text-muted">Đang tải...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">Chưa có bài viết nào</p>
              </div>
            ) : (
              <Row className="g-4">
                {blogs.map((blog) => (
                  <Col key={blog.id} xs={12} md={6}>
                    <Card className="h-100 border-0 shadow-sm" style={{ transition: "transform 0.3s" }}>
                      {blog.image_url && (
                        <div style={{ height: "200px", overflow: "hidden" }}>
                          <Card.Img
                            variant="top"
                            src={blog.image_url}
                            alt={blog.title}
                            style={{ height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <Card.Body>
                        {blog.category && (
                          <span
                            className="badge mb-2"
                            style={{ backgroundColor: "var(--brandColor)", fontSize: "0.75rem" }}
                          >
                            {blog.category}
                          </span>
                        )}
                        <Card.Title className="fw-bold" style={{ fontSize: "1.1rem" }}>
                          {blog.title}
                        </Card.Title>
                        <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                          {blog.content?.length > 150 ? `${blog.content.substring(0, 150)}...` : blog.content}
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">{new Date(blog.created_at).toLocaleDateString("vi-VN")}</small>
                          <Link
                            to={`/truyen-thong/${blog.id}`}
                            className="text-decoration-none fw-semibold"
                            style={{ color: "var(--brandColor)" }}
                          >
                            Xem chi tiết →
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>

          {/* Right Sidebar */}
          <Col lg={4}>
            <h6 className="fw-bold text-uppercase mb-3" style={{ color: "var(--brandColor)" }}>
              Truyền thông
            </h6>

            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to="/truyen-thong/tin-tuc"
                  className={`d-flex justify-content-between align-items-center fw-semibold text-decoration-none border-bottom pb-2 ${
                    !category || category === "Tin tức" ? "text-primary border-primary" : "text-dark border-dark"
                  }`}
                  style={
                    !category || category === "Tin tức"
                      ? { color: "var(--brandColor) !important", borderColor: "var(--brandColor) !important" }
                      : {}
                  }
                >
                  <span>Tin tức</span>
                  <span>›</span>
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/truyen-thong/su-kien"
                  className={`d-flex justify-content-between align-items-center text-decoration-none border-bottom pb-2 ${
                    category === "Sự kiện" ? "fw-semibold text-primary border-primary" : "text-dark border-dark"
                  }`}
                  style={
                    category === "Sự kiện"
                      ? { color: "var(--brandColor) !important", borderColor: "var(--brandColor) !important" }
                      : {}
                  }
                >
                  <span>Sự kiện</span>
                  <span>›</span>
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/truyen-thong/bao-chi"
                  className={`d-flex justify-content-between align-items-center text-decoration-none border-bottom pb-2 ${
                    category === "Báo chí" ? "fw-semibold text-primary border-primary" : "text-dark border-dark"
                  }`}
                  style={
                    category === "Báo chí"
                      ? { color: "var(--brandColor) !important", borderColor: "var(--brandColor) !important" }
                      : {}
                  }
                >
                  <span>Báo chí</span>
                  <span>›</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/truyen-thong/tuyen-dung"
                  className={`d-flex justify-content-between align-items-center text-decoration-none border-bottom pb-2 ${
                    category === "Tuyển dụng" ? "fw-semibold text-primary border-primary" : "text-dark border-dark"
                  }`}
                  style={
                    category === "Tuyển dụng"
                      ? { color: "var(--brandColor) !important", borderColor: "var(--brandColor) !important" }
                      : {}
                  }
                >
                  <span>Tuyển dụng</span>
                  <span>›</span>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogPage;
