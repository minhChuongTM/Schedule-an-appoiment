import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { FaUserMd, FaCalendarAlt, FaUsers, FaStethoscope, FaChartBar, FaNewspaper, FaHospital } from 'react-icons/fa';
import RegisterDoctor from '../../components/admin/RegisterDoctor';
import ManageAppointments from '../../components/admin/ManageAppointments';
import ManageUsers from '../../components/admin/ManageUsers';
import ManageDoctors from '../../components/admin/ManageDoctors';
import ManageDepartments from '../../components/admin/ManageDepartments';
import ManageMedicalNews from '../../components/admin/ManageMedicalNews';
import api from '~/services/api';

const Admin = () => {
    const [activeKey, setActiveKey] = useState('dashboard');

    const [stats, setStats] = useState({
        doctors: 0,
        patients: 0,
        appointments: 0,
        today_appointments: 0,
        departments: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/dashboard');
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    return (
        <Container fluid className="p-0">
            <Row className="g-0" style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                <Col md={3} lg={2} className="bg-dark text-white">
                    <div className="p-4 text-white">
                        <h4 className="mb-4 text-white">
                            <FaChartBar className="me-2" />
                            Quản Trị
                        </h4>
                        <Nav variant="pills" className="flex-column admin-sidebar-nav" activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="dashboard"
                                    className="mb-2"
                                    style={{
                                        backgroundColor: activeKey === 'dashboard' ? 'var(--brandColor)' : 'transparent',
                                    }}
                                >
                                    <FaChartBar className="me-2" />
                                    Tổng quan
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="register-doctor"
                                    className="mb-2"
                                    style={{
                                        backgroundColor: activeKey === 'register-doctor' ? 'var(--brandColor)' : 'transparent',
                                    }}
                                >
                                    <FaUserMd className="me-2" />
                                    Đăng ký bác sĩ
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="departments"
                                    className="mb-2"
                                    style={{
                                        backgroundColor: activeKey === 'departments' ? 'var(--brandColor)' : 'transparent',
                                    }}
                                >
                                    <FaHospital className="me-2" />
                                    Quản lý khoa
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="manage-doctors"
                                    className="mb-2"
                                    style={{
                                        backgroundColor: activeKey === 'manage-doctors' ? 'var(--brandColor)' : 'transparent',
                                    }}
                                >
                                    <FaStethoscope className="me-2" />
                                    Quản lý bác sĩ
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="appointments"
                                    className="mb-2"
                                    style={{
                                        backgroundColor: activeKey === 'appointments' ? 'var(--brandColor)' : 'transparent',
                                    }}
                                >
                                    <FaCalendarAlt className="me-2" />
                                    Quản lý lịch hẹn
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="users"
                                    className="mb-2"
                                    style={{
                                        backgroundColor: activeKey === 'users' ? 'var(--brandColor)' : 'transparent',
                                    }}
                                >
                                    <FaUsers className="me-2" />
                                    Quản lý người dùng
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="news"
                                    className="mb-2"
                                    style={{
                                        backgroundColor: activeKey === 'news' ? 'var(--brandColor)' : 'transparent',
                                    }}
                                >
                                    <FaNewspaper className="me-2" />
                                    Quản lý tin tức
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Col>

                {/* Main Content */}
                <Col md={9} lg={10} className="bg-light">
                    <div className="p-4">
                        <Tab.Container activeKey={activeKey}>
                            <Tab.Content>
                                <Tab.Pane eventKey="dashboard">
                                    <h2 className="mb-4">Tổng quan</h2>
                                    <Row>
                                        <Col md={3} className="mb-4">
                                            <div className="card border-0 shadow-sm p-4">
                                                <h6 className="text-muted">Tổng bác sĩ</h6>
                                                <h2 className="mb-0" style={{ color: 'var(--brandColor)' }}>{stats.doctors}</h2>
                                            </div>
                                        </Col>
                                        <Col md={3} className="mb-4">
                                            <div className="card border-0 shadow-sm p-4">
                                                <h6 className="text-muted">Lịch hẹn hôm nay</h6>
                                                <h2 className="mb-0" style={{ color: 'var(--brandColor)' }}>{stats.today_appointments}</h2>
                                            </div>
                                        </Col>
                                        <Col md={3} className="mb-4">
                                            <div className="card border-0 shadow-sm p-4">
                                                <h6 className="text-muted">Bệnh nhân</h6>
                                                <h2 className="mb-0" style={{ color: 'var(--brandColor)' }}>{stats.patients}</h2>
                                            </div>
                                        </Col>
                                        <Col md={3} className="mb-4">
                                            <div className="card border-0 shadow-sm p-4">
                                                <h6 className="text-muted">Khoa</h6>
                                                <h2 className="mb-0" style={{ color: 'var(--brandColor)' }}>{stats.departments}</h2>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab.Pane>

                                <Tab.Pane eventKey="register-doctor">
                                    <RegisterDoctor />
                                </Tab.Pane>

                                <Tab.Pane eventKey="departments">
                                    <ManageDepartments />
                                </Tab.Pane>

                                <Tab.Pane eventKey="manage-doctors">
                                    <ManageDoctors />
                                </Tab.Pane>

                                <Tab.Pane eventKey="appointments">
                                    <ManageAppointments />
                                </Tab.Pane>

                                <Tab.Pane eventKey="users">
                                    <ManageUsers />
                                </Tab.Pane>

                                <Tab.Pane eventKey="news">
                                    <ManageMedicalNews />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Admin;