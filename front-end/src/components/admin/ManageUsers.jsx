import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { FaEye, FaUserShield } from 'react-icons/fa';
import api from '../../services/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // View Modal
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewUser, setViewUser] = useState(null);

    // Change Role Modal
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [filterRole, setFilterRole] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/admin/users');
            setUsers(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError('Không thể tải danh sách người dùng');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredUsers = () => {
        if (!filterRole) return users;
        return users.filter(user => user.role === filterRole);
    };

    const handleViewDetails = (user) => {
        setViewUser(user);
        setShowViewModal(true);
    };

    const handleChangeRole = (user) => {
        setSelectedUser(user);
        setNewRole(user.role);
        setShowRoleModal(true);
    };

    const handleRoleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await api.put(`/admin/users/${selectedUser.id}/role`, {
                role: newRole
            });
            setSuccess('Cập nhật vai trò thành công!');
            setShowRoleModal(false);
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'Cập nhật thất bại');
        }
    };

    const getRoleBadge = (role) => {
        const roleMap = {
            admin: { bg: 'danger', text: 'Quản trị viên' },
            doctor: { bg: 'primary', text: 'Bác sĩ' },
            patient: { bg: 'success', text: 'Bệnh nhân' }
        };
        const roleInfo = roleMap[role] || { bg: 'secondary', text: role };
        return <Badge bg={roleInfo.bg}>{roleInfo.text}</Badge>;
    };

    if (loading) return <div className="text-center py-5">Đang tải...</div>;

    return (
        <div>
            <h2 className="mb-4">Quản lý người dùng</h2>

            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
            {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

            <div className="bg-white p-4 rounded shadow-sm">
                <div className="row mb-4">
                    <div className="col-md-4">
                        <Form.Group>
                            <Form.Label className="fw-bold">Lọc theo vai trò</Form.Label>
                            <Form.Select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                            >
                                <option value="">Tất cả vai trò</option>
                                <option value="patient">Bệnh nhân</option>
                                <option value="doctor">Bác sĩ</option>
                                <option value="admin">Quản trị viên</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </div>

                <Table responsive hover>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th>ID</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Vai trò</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredUsers().length > 0 ? (
                            getFilteredUsers().map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{getRoleBadge(user.role)}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString('vi-VN')}</td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleViewDetails(user)}
                                        >
                                            <FaEye />
                                        </Button>
                                        <Button
                                            variant="outline-warning"
                                            size="sm"
                                            onClick={() => handleChangeRole(user)}
                                        >
                                            <FaUserShield />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">Không tìm thấy người dùng nào</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* View Details Modal */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewUser && (
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>ID:</th>
                                    <td>{viewUser.id}</td>
                                </tr>
                                <tr>
                                    <th>Họ tên:</th>
                                    <td>{viewUser.name}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{viewUser.email}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại:</th>
                                    <td>{viewUser.phone}</td>
                                </tr>
                                <tr>
                                    <th>Ngày sinh:</th>
                                    <td>{viewUser.birthdate}</td>
                                </tr>
                                <tr>
                                    <th>Giới tính:</th>
                                    <td>
                                        {viewUser.gender === 'male' ? 'Nam' : viewUser.gender === 'female' ? 'Nữ' : 'Khác'}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ:</th>
                                    <td>{viewUser.address || 'Chưa cập nhật'}</td>
                                </tr>
                                <tr>
                                    <th>Vai trò:</th>
                                    <td>{getRoleBadge(viewUser.role)}</td>
                                </tr>
                                <tr>
                                    <th>Ngày đăng ký:</th>
                                    <td>{new Date(viewUser.created_at).toLocaleString('vi-VN')}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Change Role Modal */}
            <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi vai trò</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleRoleSubmit}>
                    <Modal.Body>
                        <p>Người dùng: <strong>{selectedUser?.name}</strong></p>
                        <Form.Group className="mb-3">
                            <Form.Label>Vai trò mới</Form.Label>
                            <Form.Select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                required
                            >
                                <option value="patient">Bệnh nhân</option>
                                <option value="doctor">Bác sĩ</option>
                                <option value="admin">Quản trị viên</option>
                            </Form.Select>
                        </Form.Group>
                        <Alert variant="info" className="small">
                            <strong>Lưu ý:</strong> Endpoint này cũng cần được tạo trong backend:
                            <code className="d-block mt-1">PUT /admin/users/:id/role</code>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowRoleModal(false)}>
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'var(--brandColor)', border: 'none' }}
                        >
                            Cập nhật
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageUsers;
