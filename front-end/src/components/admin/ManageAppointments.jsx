import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import api from '../../services/api';

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Edit Modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [editStatus, setEditStatus] = useState('');

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    // View Modal
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewAppointment, setViewAppointment] = useState(null);

    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await api.get('/appointments');
            setAppointments(response.data.data);
        } catch (err) {
            setError('Không thể tải danh sách lịch hẹn');
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (id) => {
        if (!window.confirm('Bạn có chắc muốn chấp nhận lịch hẹn này?')) return;
        setError('');
        setSuccess('');
        try {
            await api.put(`/appointments/${id}`, { status: 'active' }); // Active = Confirmed
            setSuccess('Đã chấp nhận lịch hẹn!');
            fetchAppointments();
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi chấp nhận lịch hẹn');
        }
    };

    const normalizeStatus = (status) => {
        if (status === 'pending') return 'un-active';
        if (status === 'confirmed') return 'active';
        return status;
    };

    const getFilteredAppointments = () => {
        return appointments.filter(app => {
            const matchDate = filterDate ? app.appointment_date.startsWith(filterDate) : true;
            const matchStatus = filterStatus ? normalizeStatus(app.status) === filterStatus : true;
            return matchDate && matchStatus;
        });
    };

    const handleEdit = (appointment) => {
        setSelectedAppointment(appointment);
        setEditStatus(appointment.status);
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await api.put(`/appointments/${selectedAppointment.id}`, {
                status: editStatus
            });
            setSuccess('Cập nhật trạng thái thành công!');
            setShowEditModal(false);
            fetchAppointments();
        } catch (err) {
            setError(err.response?.data?.message || 'Cập nhật thất bại');
        }
    };

    const handleDeleteClick = (appointment) => {
        setAppointmentToDelete(appointment);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        setError('');
        setSuccess('');

        try {
            await api.delete(`/appointments/${appointmentToDelete.id}`);
            setSuccess('Xóa lịch hẹn thành công!');
            setShowDeleteModal(false);
            fetchAppointments();
        } catch (err) {
            setError(err.response?.data?.message || 'Xóa thất bại');
            setShowDeleteModal(false);
        }
    };

    const handleViewDetails = (appointment) => {
        setViewAppointment(appointment);
        setShowViewModal(true);
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'un-active': { bg: 'warning', text: 'Chờ xác nhận' },
            active: { bg: 'info', text: 'Đã xác nhận' },
            completed: { bg: 'success', text: 'Hoàn thành' },
            cancelled: { bg: 'danger', text: 'Đã hủy' }
        };
        const normalized = normalizeStatus(status);
        const statusInfo = statusMap[normalized] || { bg: 'secondary', text: status };
        return <Badge bg={statusInfo.bg}>{statusInfo.text}</Badge>;
    };

    if (loading) return <div className="text-center py-5">Đang tải...</div>;

    return (
        <div>
            <h2 className="mb-4">Quản lý lịch hẹn</h2>

            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
            {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

            <div className="bg-white p-4 rounded shadow-sm">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <Form.Group>
                            <Form.Label>Lọc theo ngày</Form.Label>
                            <Form.Control
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group>
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                <option value="un-active">Chờ xác nhận</option>
                                <option value="active">Đã xác nhận</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Đã hủy</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </div>

                <Table responsive hover>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th>ID</th>
                            <th>Bệnh nhân</th>
                            <th>Bác sĩ</th>
                            <th>Khoa</th>
                            <th>Ngày</th>
                            <th>Giờ</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredAppointments().map(appointment => {
                            const dateObj = new Date(appointment.appointment_date);
                            const dateStr = dateObj.toLocaleDateString('vi-VN');
                            const timeStr = dateObj.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

                            return (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.patient?.name}</td>
                                    <td>{appointment.doctor?.user?.name}</td>
                                    <td>{appointment.department?.name}</td>
                                    <td>{dateStr}</td>
                                    <td>{timeStr}</td>
                                    <td>{getStatusBadge(appointment.status)}</td>
                                    <td>
                                        {/* Show Accept button if status doesn't seem to be confirmed/cancelled yet. 
                                        Note: 'un-active' is used for pending in this system based on DB context 
                                    */}
                                        {normalizeStatus(appointment.status) === 'un-active' && (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="me-2"
                                                title="Chấp nhận"
                                                onClick={() => handleAccept(appointment.id)}
                                            >
                                                Chấp nhận
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleViewDetails(appointment)}
                                        >
                                            <FaEye />
                                        </Button>
                                        <Button
                                            variant="outline-warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEdit(appointment)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteClick(appointment)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                {appointments.length === 0 && (
                    <div className="text-center py-4 text-muted">
                        Chưa có lịch hẹn nào
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật trạng thái lịch hẹn</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                                required
                            >
                                <option value="un-active">Chờ xác nhận</option>
                                <option value="active">Đã xác nhận</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Đã hủy</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
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

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa lịch hẹn này?
                    <br />
                    <small className="text-danger">Lưu ý: Thao tác này không thể hoàn tác!</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* View Details Modal */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết lịch hẹn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewAppointment && (
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Mã lịch hẹn:</th>
                                    <td>{viewAppointment.id}</td>
                                </tr>
                                <tr>
                                    <th>Bệnh nhân:</th>
                                    <td>{viewAppointment.patient?.name}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{viewAppointment.patient?.email}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại:</th>
                                    <td>{viewAppointment.patient?.phone}</td>
                                </tr>
                                <tr>
                                    <th>Bác sĩ:</th>
                                    <td>{viewAppointment.doctor?.user?.name || 'Chưa chọn'}</td>
                                </tr>
                                <tr>
                                    <th>Khoa:</th>
                                    <td>{viewAppointment.department?.name || 'Chưa chọn'}</td>
                                </tr>
                                <tr>
                                    <th>Ngày hẹn:</th>
                                    <td>{viewAppointment.appointment_date ? new Date(viewAppointment.appointment_date).toLocaleDateString('vi-VN') : ''}</td>
                                </tr>
                                <tr>
                                    <th>Giờ hẹn:</th>
                                    <td>{viewAppointment.appointment_date ? new Date(viewAppointment.appointment_date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''}</td>
                                </tr>
                                <tr>
                                    <th>Lý do khám:</th>
                                    <td>{viewAppointment.reason || 'Không có'}</td>
                                </tr>
                                <tr>
                                    <th>Ghi chú:</th>
                                    <td>{viewAppointment.notes || 'Không có'}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái:</th>
                                    <td>{getStatusBadge(viewAppointment.status)}</td>
                                </tr>
                                <tr>
                                    <th>Ngày tạo:</th>
                                    <td>{new Date(viewAppointment.created_at).toLocaleString('vi-VN')}</td>
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
        </div>
    );
};

export default ManageAppointments;
