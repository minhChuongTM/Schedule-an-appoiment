import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '~/services/auth/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaVenusMars, FaUserShield } from 'react-icons/fa';
import api from '~/services/api';
import Notifications from '~/components/common/Notifications';

const Dashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);

    const fetchAppointments = async () => {
        try {
            setLoadingApps(true);
            // Patients use /my-appointments, Doctors/Admins use /appointments (which filters by doctor_id in the backend)
            const endpoint = user.role === 'patient' ? '/my-appointments' : '/appointments';
            const response = await api.get(endpoint);
            if (response.data.success) {
                setAppointments(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoadingApps(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        if (!window.confirm(`Bạn có chắc muốn ${status === 'active' ? 'chấp nhận' : 'hủy'} lịch hẹn này?`)) return;

        try {
            const response = await api.put(`/appointments/${id}`, { status });
            if (response.data.success) {
                alert('Cập nhật trạng thái thành công!');
                fetchAppointments();
            }
        } catch (error) {
            console.error('Error updating appointment status:', error);
            alert('Cập nhật thất bại: ' + (error.response?.data?.message || error.message));
        }
    };

    useEffect(() => {
        if (user) {
            fetchAppointments();
        }
    }, [user]);

    if (!user) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <h3>Đang tải thông tin...</h3>
                </div>
            </Container>
        );
    }

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

    const getRoleBadge = (role) => {
        const roleConfig = {
            'admin': { variant: 'danger', label: 'Quản trị viên' },
            'doctor': { variant: 'primary', label: 'Bác sĩ' },
            'patient': { variant: 'success', label: 'Bệnh nhân' }
        };
        return roleConfig[role] || { variant: 'secondary', label: role };
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'pending': { bg: 'warning', text: 'Chờ xác nhận' },
            'confirmed': { bg: 'info', text: 'Đã xác nhận' },
            'completed': { bg: 'success', text: 'Hoàn thành' },
            'cancelled': { bg: 'danger', text: 'Đã hủy' }
        };
        // Normalize status
        const activeStatus = status === 'active' ? 'confirmed' : (status === 'un-active' ? 'pending' : status);
        const config = statusMap[activeStatus] || { bg: 'secondary', text: status };
        return <Badge bg={config.bg}>{config.text}</Badge>;
    };

    const roleBadge = getRoleBadge(user.role);

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="fw-bold">Hồ sơ cá nhân</h2>
                </Col>
            </Row>

            <Row>
                <Col lg={4} className="mb-4">
                    <Card className="shadow-sm mb-4">
                        <Card.Body className="text-center">
                            <div className="mb-3">
                                {user.avatar_url ? (
                                    <img
                                        src={user.avatar_url}
                                        alt="Avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div
                                        className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                                        style={{ width: '150px', height: '150px', fontSize: '3rem' }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <h4 className="fw-bold mb-2">{user.name}</h4>
                            <Badge bg={roleBadge.variant} className="mb-3 px-3 py-2">
                                {roleBadge.label}
                            </Badge>
                        </Card.Body>
                    </Card>

                    {/* Notifications Component */}
                    <div className="mb-4">
                        <Notifications />
                    </div>
                </Col>

                <Col lg={8}>
                    {/* Info List */}
                    <Card className="shadow-sm mb-4">
                        <Card.Header className="bg-white">
                            <h5 className="mb-0 fw-bold">Thông tin chi tiết</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaUser className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Họ và tên</small>
                                        <strong>{user.name}</strong>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaEnvelope className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Email</small>
                                        <strong>{user.email}</strong>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaPhone className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Số điện thoại</small>
                                        <strong>{user.phone || 'Chưa cập nhật'}</strong>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex align-items-center py-3">
                                    <FaBirthdayCake className="text-primary me-3" size={20} />
                                    <div>
                                        <small className="text-muted d-block">Ngày sinh</small>
                                        <strong>{formatDate(user.birthdate)}</strong>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    {/* Appointments List */}
                    <Card className="shadow-sm">
                        <Card.Header className="bg-white">
                            <h5 className="mb-0 fw-bold">
                                {user.role === 'doctor' ? 'Danh sách bệnh nhân đặt lịch' : 'Lịch hẹn của tôi'}
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {loadingApps ? (
                                <div className="text-center py-3">Đang tải lịch hẹn...</div>
                            ) : appointments.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>Mã</th>
                                                <th>{user.role === 'doctor' ? 'Bệnh nhân' : 'Bác sĩ'}</th>
                                                <th>Khoa</th>
                                                <th>Ngày giờ</th>
                                                <th>Trạng thái</th>
                                                {user.role === 'doctor' && <th>Thao tác</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map(app => (
                                                <tr key={app.id}>
                                                    <td>#{app.id}</td>
                                                    <td>{user.role === 'doctor' ? app.patient?.name : app.doctor?.user?.name}</td>
                                                    <td>{app.department?.name}</td>
                                                    <td>
                                                        {new Date(app.appointment_date).toLocaleDateString('vi-VN')} <br />
                                                        <small>{new Date(app.appointment_date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</small>
                                                    </td>
                                                    <td>{getStatusBadge(app.status)}</td>
                                                    {user.role === 'doctor' && (
                                                        <td>
                                                            {app.status === 'un-active' && (
                                                                <div className="d-flex gap-2">
                                                                    <Button
                                                                        variant="success"
                                                                        size="sm"
                                                                        onClick={() => handleUpdateStatus(app.id, 'active')}
                                                                    >
                                                                        Chấp nhận
                                                                    </Button>
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        size="sm"
                                                                        onClick={() => handleUpdateStatus(app.id, 'cancelled')}
                                                                    >
                                                                        Từ chối
                                                                    </Button>
                                                                </div>
                                                            )}
                                                            {app.status === 'active' && (
                                                                <Button
                                                                    variant="outline-success"
                                                                    size="sm"
                                                                    onClick={() => handleUpdateStatus(app.id, 'completed')}
                                                                >
                                                                    Hoàn thành
                                                                </Button>
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-3 text-muted">Chưa có lịch hẹn nào.</div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;