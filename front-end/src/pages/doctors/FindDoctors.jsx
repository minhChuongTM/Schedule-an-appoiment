import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Pagination, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router';
import { FaSearch, FaUserMd, FaHospital } from 'react-icons/fa';
import api from '~/services/api';
import StickyMennu from '~/components/stickyMenu/StickyMennu';

const FindDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 12,
        current_page: 1,
        last_page: 1
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDoctors(currentPage, searchTerm.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [currentPage, searchTerm]);

    const fetchDoctors = async (page = 1, search = '') => {
        try {
            setLoading(true);
            const response = await api.get('/doctors', {
                params: {
                    page,
                    per_page: 12,
                    search: search || undefined
                }
            });
            if (response.data.success) {
                setDoctors(response.data.data.data);
                setPagination({
                    total: response.data.data.total,
                    per_page: response.data.data.per_page,
                    current_page: response.data.data.current_page,
                    last_page: response.data.data.last_page
                });
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setCurrentPage(1);
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const items = [];
        const { current_page, last_page } = pagination;

        // Previous button
        items.push(
            <Pagination.Prev
                key="prev"
                disabled={current_page === 1}
                onClick={() => handlePageChange(current_page - 1)}
            />
        );

        // First page
        if (current_page > 2) {
            items.push(
                <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
                    1
                </Pagination.Item>
            );
            if (current_page > 3) {
                items.push(<Pagination.Ellipsis key="ellipsis-start" />);
            }
        }

        // Pages around current
        for (let i = Math.max(1, current_page - 1); i <= Math.min(last_page, current_page + 1); i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === current_page}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        // Last page
        if (current_page < last_page - 1) {
            if (current_page < last_page - 2) {
                items.push(<Pagination.Ellipsis key="ellipsis-end" />);
            }
            items.push(
                <Pagination.Item key={last_page} onClick={() => handlePageChange(last_page)}>
                    {last_page}
                </Pagination.Item>
            );
        }

        // Next button
        items.push(
            <Pagination.Next
                key="next"
                disabled={current_page === last_page}
                onClick={() => handlePageChange(current_page + 1)}
            />
        );

        return items;
    };

    return (
        <Container className="py-5">
            {/* Header Section */}
            <Row className="mb-4">
                <Col>
                    <h2 className="fw-bold mb-2">Tìm Bác Sĩ</h2>
                    <p className="text-muted">Tìm kiếm và đặt lịch với các bác sĩ chuyên môn cao</p>
                </Col>
            </Row>

            {/* Search Bar */}
            <Row className="mb-4">
                <Col md={8} lg={6}>
                    <Form.Group className="position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm theo tên bác sĩ hoặc khoa..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="ps-5"
                        />
                        <FaSearch
                            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                            size={16}
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Đang tải danh sách bác sĩ...</p>
                </div>
            ) : (
                <>
                    {/* Doctors Grid */}
                    <Row>
                        {doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <Col key={doctor.user_id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <Card className="h-100 shadow-sm hover-shadow transition">
                                        <div className="text-center pt-4">
                                            <img
                                                src={doctor.user.avatar_url || 'https://via.placeholder.com/270x320'}
                                                alt={doctor.user.name}
                                                className="rounded-circle"
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    objectFit: 'cover',
                                                    border: '3px solid #f0f0f0'
                                                }}
                                            />
                                        </div>
                                        <Card.Body className="text-center">
                                            <Badge bg="info" className="mb-2">
                                                {doctor.level || 'Bác sĩ'}
                                            </Badge>
                                            <Card.Title className="h6 fw-bold mb-2">
                                                {doctor.user.name}
                                            </Card.Title>
                                            <div className="d-flex align-items-center justify-content-center text-muted mb-2">
                                                <FaHospital size={14} className="me-1" />
                                                <small>{doctor.department?.name || 'Chưa có khoa'}</small>
                                            </div>
                                            {doctor.description && (
                                                <p className="small text-muted mb-3" style={{ fontSize: '0.85rem' }}>
                                                    {doctor.description.length > 50
                                                        ? doctor.description.substring(0, 50) + '...'
                                                        : doctor.description}
                                                </p>
                                            )}
                                            <Link
                                                to={`/bac-si/${doctor.user_id}`}
                                                className="btn btn-sm w-100"
                                                style={{
                                                    backgroundColor: 'var(--brandColor)',
                                                    borderColor: 'var(--brandColor)',
                                                    color: 'white'
                                                }}
                                            >
                                                <FaUserMd className="me-1" />
                                                Xem chi tiết
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <div className="text-center py-5">
                                    <FaUserMd size={64} className="text-muted mb-3" />
                                    <h4>Không tìm thấy bác sĩ</h4>
                                    <p className="text-muted">Vui lòng thử lại với từ khóa khác</p>
                                </div>
                            </Col>
                        )}
                    </Row>

                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <Row className="mt-4">
                            <Col className="d-flex justify-content-center">
                                <Pagination>{renderPagination()}</Pagination>
                            </Col>
                        </Row>
                    )}
                </>
            )}

            <style jsx>{`
                .hover-shadow {
                    transition: all 0.3s ease;
                }
                .hover-shadow:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
                }
            `}</style>
            <StickyMennu/>
        </Container>
    );
};

export default FindDoctors;
