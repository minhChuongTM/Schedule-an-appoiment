import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import api from "~/services/api";
import HospitalBanner from "~/components/common/HospitalBanner";
import "~/assets/styles/blogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/medical/${id}`);
      if (response.data.success) {
        setBlog(response.data.data);
      } else {
        setError("Không tìm thấy bài viết");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError("Có lỗi xảy ra khi tải bài viết");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchRelatedBlogs = useCallback(async () => {
    if (!blog?.category) return;
    try {
      const response = await api.get(`/medical?category=${blog.category}&per_page=5`);
      if (response.data.success) {
        const allBlogs = response.data.data.data || response.data.data;
        // Filter out current blog
        const related = allBlogs.filter((item) => String(item.id) !== String(id)).slice(0, 4);
        setRelatedBlogs(related);
      }
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  }, [blog, id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  useEffect(() => {
    if (blog) {
      fetchRelatedBlogs();
    }
  }, [blog, fetchRelatedBlogs]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error || !blog) {
    return (
      <Container className="py-5 text-center">
        <h3>{error || "Bài viết không tồn tại"}</h3>
        <Link to="/truyen-thong" className="btn btn-primary mt-3">
          Quay lại trang tin tức
        </Link>
      </Container>
    );
  }

  return (
    <>
      <HospitalBanner
        parentPath="/truyen-thong"
        parentLabel="Truyền thông"
        currentLabel={blog.title}
        title={blog.title}
      />

      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <article className="blog-detail bg-white p-4 rounded shadow-sm">
              <h1 className="mb-4 fw-bold" style={{ fontSize: "2rem", color: "var(--brandColor)" }}>
                {blog.title}
              </h1>

              <div className="d-flex align-items-center mb-4 text-muted border-bottom pb-3">
                <div className="me-4">
                  <i className="bi bi-person-circle me-2"></i>
                  {blog.author?.name || "Bệnh viện"}
                </div>
                <div className="me-4">
                  <i className="bi bi-calendar3 me-2"></i>
                  {blog.created_at && new Date(blog.created_at).toLocaleDateString("vi-VN")}
                </div>
                {blog.category && (
                  <div>
                    <i className="bi bi-tag me-2"></i>
                    {blog.category}
                  </div>
                )}
              </div>

              {blog.image_url && (
                <div className="mb-4 text-center bg-light rounded p-2">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="img-fluid rounded"
                    style={{ maxHeight: "600px", width: "auto", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
              )}

              <div className="blog-content lh-lg text-justify" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>
          </Col>

          <Col lg={4}>
            <div className="ps-lg-4">
              <h4 className="mb-4 border-bottom pb-2" style={{ color: `var(--brandColor)` }}>
                Bài viết liên quan
              </h4>
              {relatedBlogs.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {relatedBlogs.map((item) => (
                    <Card key={item.id} className="border-0 shadow-sm h-100">
                      <div className="card-body py-2 px-3">
                        <h6 className="card-title mb-1">
                          <Link
                            to={`/truyen-thong/${item.id}`}
                            className="text-decoration-none text-dark hover-primary line-clamp-2"
                          >
                            {item.title}
                          </Link>
                        </h6>
                        <small className="text-muted">
                          {item.created_at && new Date(item.created_at).toLocaleDateString("vi-VN")}
                        </small>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Chưa có bài viết liên quan.</p>
              )}

              <div className="mt-5">
                <h4 className="mb-4 border-bottom pb-2" style={{ color: `var(--brandColor)` }}>
                  Danh mục
                </h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-transparent border-0 px-0">
                    <Link
                      to="/truyen-thong?category=Tin tức"
                      className="text-decoration-none text-secondary d-block py-1"
                    >
                      <i className="bi bi-chevron-right me-2" style={{ color: `var(--brandColor)` }}></i>Tin tức y tế
                    </Link>
                  </li>
                  <li className="list-group-item bg-transparent border-0 px-0">
                    <Link
                      to="/truyen-thong?category=Sự kiện"
                      className="text-decoration-none text-secondary d-block py-1"
                    >
                      <i className="bi bi-chevron-right me-2" style={{ color: `var(--brandColor)` }}></i>Sự kiện
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogDetail;
