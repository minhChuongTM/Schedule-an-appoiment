import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaVenusMars, FaHospital, FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import api from '~/services/api';

const DoctorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoctorDetail = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/doctors/${id}`);
                if (response.data.success) {
                    setDoctor(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching doctor detail:', error);
                setError('Không thể tải thông tin bác sĩ');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetail();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getGenderLabel = (gender) => {
        const genderMap = {
            'male': 'Nam',
            'female': 'Nữ',
            'other': 'Khác'
        };
        return genderMap[gender] || gender;
    };

    const handleBookAppointment = () => {
        // Navigate to appointment booking page with doctor info
        navigate(`/dat-lich?doctor_id=${id}`);
    };

    if (loading) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Đang tải thông tin bác sĩ...</p>
                </div>
            </Container>
        );
    }

    if (error || !doctor) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <h3 className="text-danger">Lỗi</h3>
                    <p className="text-muted">{error || 'Không tìm thấy thông tin bác sĩ'}</p>
                    <Button variant="primary" onClick={() => navigate('/tim-bac-si')}>
                        Quay lại danh sách
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {/* Back Button */}
            <Button 
                variant="outline-secondary" 
                className="mb-4"
                onClick={() => navigate('/tim-bac-si')}
            >
                <FaArrowLeft className="me-2" />
                Quay lại danh sách
            </Button>

            <Row>
                {/* Left Column - Profile Card */}
                <Col lg={4} className="mb-4">
                    <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
                        <Card.Body className="text-center">
                            <div className="mb-3">
                                <img
                                    src={doctor.user.avatar_url || 'https://via.placeholder.com/270x320'}
                                    alt={doctor.user.name}
                                    className="rounded-circle"
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                        objectFit: 'cover',
                                        border: '4px solid #f0f0f0'
                                    }}
                                />
                            </div>
                            <Badge bg="info" className="mb-2 px-3 py-2">
                                {doctor.level || 'Bác sĩ'}
                            </Badge>
                            <h4 className="fw-bold mb-3">{doctor.user.name}</h4>
                            
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <FaHospital className="text-primary me-2" />
                                <span className="fw-medium">{doctor.department?.name || 'Chưa có khoa'}</span>
                            </div>

                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="w-100"
                                onClick={handleBookAppointment}
                            >
                                <FaCalendarAlt className="me-2" />
                                Đặt lịch khám
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right Column - Details */}
                <Col lg={8}>
                    {/* Working Hours */}
                    {doctor.description && (
                        <Card className="shadow-sm mb-4">
                            <Card.Header className="bg-white">
                                <h5 className="mb-0 fw-bold">
                                    <FaClock className="me-2 text-primary" />
                                    Lịch làm việc
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <p className="mb-0">{doctor.description}</p>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Contact Information */}
                    <Card className="shadow-sm mb-4">
                        <Card.Header className="bg-white">
                            <h5 className="mb-0 fw-bold">Thông tin liên hệ</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaEnvelope className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Email</small>
                                        <strong>{doctor.user.email}</strong>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaPhone className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Số điện thoại</small>
                                        <strong>{doctor.user.phone || 'Chưa cập nhật'}</strong>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex align-items-start py-3">
                                    <FaMapMarkerAlt className="text-primary me-3 mt-1" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Địa chỉ</small>
                                        <strong>{doctor.user.address || 'Chưa cập nhật'}</strong>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    {/* Personal Information */}
                    <Card className="shadow-sm">
                        <Card.Header className="bg-white">
                            <h5 className="mb-0 fw-bold">Thông tin cá nhân</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaBirthdayCake className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Ngày sinh</small>
                                        <strong>{formatDate(doctor.user.birthdate)}</strong>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaVenusMars className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Giới tính</small>
                                        <strong>{getGenderLabel(doctor.user.gender)}</strong>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaHospital className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Khoa</small>
                                        <strong>{doctor.department?.name || 'Chưa có khoa'}</strong>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DoctorDetail;
