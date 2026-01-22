import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Badge, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import api from '../../services/api';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Edit Modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);

    // View Details Modal
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewDoctor, setViewDoctor] = useState(null);

    useEffect(() => {
        fetchDoctors(currentPage);
        fetchDepartments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchDoctors = async (page = 1) => {
        try {
            setLoading(true);
            const response = await api.get(`/doctors?page=${page}`);
            if (response.data.success) {
                const paginated = response.data.data;
                setDoctors(paginated.data || []);
                setCurrentPage(paginated.current_page || 1);
                setTotalPages(paginated.last_page || 1);
            } else {
                setDoctors([]);
                setCurrentPage(1);
                setTotalPages(1);
            }
        } catch (err) {
            setError('Không thể tải danh sách bác sĩ');
        } finally {
            setLoading(false);
        }
    };

    const [filterDepartment, setFilterDepartment] = useState('');
    const [filterLevel, setFilterLevel] = useState('');

    const getFilteredDoctors = () => {
        return doctors.filter(doc => {
            const matchDept = filterDepartment ? doc.department_id?.toString() === filterDepartment : true;
            const matchLevel = filterLevel ? doc.level === filterLevel : true;
            return matchDept && matchLevel;
        });
    };

    const fetchDepartments = async () => {
        try {
            const response = await api.get('/departments');
            setDepartments(response.data.data);
        } catch (err) {
            console.error('Lỗi khi tải danh sách khoa:', err);
        }
    };

    const handleEdit = (doctor) => {
        setSelectedDoctor(doctor);
        setEditFormData({
            name: doctor.user?.name || '',
            email: doctor.user?.email || '',
            phone: doctor.user?.phone || '',
            level: doctor.level,
            department_id: doctor.department_id,
            description: doctor.description || ''
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await api.put(`/admin/doctors/${selectedDoctor.user_id}`, editFormData);
            setSuccess('Cập nhật thông tin bác sĩ thành công!');
            setShowEditModal(false);
            fetchDoctors(currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Cập nhật thất bại');
        }
    };

    const handleDeleteClick = (doctor) => {
        setDoctorToDelete(doctor);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        setError('');
        setSuccess('');

        try {
            await api.delete(`/admin/doctors/${doctorToDelete.user_id}`);
            setSuccess('Xóa bác sĩ thành công!');
            setShowDeleteModal(false);
            fetchDoctors(currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Xóa thất bại');
            setShowDeleteModal(false);
        }
    };

    const handleViewDetails = async (doctor) => {
        try {
            const response = await api.get(`/doctors/${doctor.user_id}`);
            setViewDoctor(response.data.data);
            setShowViewModal(true);
        } catch (err) {
            setError('Không thể tải thông tin chi tiết');
        }
    };

    const renderPagination = () => {
        const items = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        items.push(
            <Pagination.First key="first" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        );
        items.push(
            <Pagination.Prev key="prev" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
        );

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        items.push(
            <Pagination.Next key="next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
        );
        items.push(
            <Pagination.Last key="last" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        );

        return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
    };

    if (loading) return <div className="text-center py-5">Đang tải...</div>;

    return (
        <div>
            <h2 className="mb-4">Quản lý bác sĩ</h2>

            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
            {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

            <div className="bg-white p-4 rounded shadow-sm">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <Form.Group>
                            <Form.Label>Lọc theo Khoa</Form.Label>
                            <Form.Select
                                value={filterDepartment}
                                onChange={(e) => setFilterDepartment(e.target.value)}
                            >
                                <option value="">Tất cả khoa</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group>
                            <Form.Label>Lọc theo Chức vụ</Form.Label>
                            <Form.Select
                                value={filterLevel}
                                onChange={(e) => setFilterLevel(e.target.value)}
                            >
                                <option value="">Tất cả chức vụ</option>
                                <option value="Bác sĩ điều trị">Bác sĩ điều trị</option>
                                <option value="Trưởng khoa">Trưởng khoa</option>
                                <option value="Phó trưởng khoa">Phó trưởng khoa</option>
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
                            <th>Chức vụ</th>
                            <th>Khoa</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredDoctors().map(doctor => (
                            <tr key={doctor.user_id}>
                                <td>{doctor.user_id}</td>
                                <td>{doctor.user?.name}</td>
                                <td>{doctor.user?.email}</td>
                                <td>{doctor.user?.phone}</td>
                                <td>
                                    <Badge bg="info">{doctor.level}</Badge>
                                </td>
                                <td>{doctor.department?.name}</td>
                                <td>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleViewDetails(doctor)}
                                    >
                                        <FaEye />
                                    </Button>
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEdit(doctor)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDeleteClick(doctor)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {renderPagination()}
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa thông tin bác sĩ</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editFormData.name || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editFormData.email || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={editFormData.phone || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Chức vụ</Form.Label>
                            <Form.Select
                                name="level"
                                value={editFormData.level || ''}
                                onChange={handleEditChange}
                                required
                            >
                                <option value="Bác sĩ điều trị">Bác sĩ điều trị</option>
                                <option value="Trưởng khoa">Trưởng khoa</option>
                                <option value="Phó trưởng khoa">Phó trưởng khoa</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Khoa</Form.Label>
                            <Form.Select
                                name="department_id"
                                value={editFormData.department_id || ''}
                                onChange={handleEditChange}
                                required
                            >
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả lịch làm việc</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={editFormData.description || ''}
                                onChange={handleEditChange}
                            />
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
                            Lưu thay đổi
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
                    Bạn có chắc chắn muốn xóa bác sĩ <strong>{doctorToDelete?.name}</strong>?
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
                    <Modal.Title>Thông tin chi tiết bác sĩ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewDoctor && (
                        <div>
                            <div className="text-center mb-4">
                                <img
                                    src={viewDoctor.avatar || 'https://via.placeholder.com/150'}
                                    alt={viewDoctor.name}
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Họ tên:</th>
                                        <td>{viewDoctor.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{viewDoctor.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Số điện thoại:</th>
                                        <td>{viewDoctor.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Ngày sinh:</th>
                                        <td>{viewDoctor.birthdate}</td>
                                    </tr>
                                    <tr>
                                        <th>Giới tính:</th>
                                        <td>
                                            {viewDoctor.gender === 'male' ? 'Nam' : viewDoctor.gender === 'female' ? 'Nữ' : 'Khác'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ:</th>
                                        <td>{viewDoctor.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Chức vụ:</th>
                                        <td><Badge bg="info">{viewDoctor.level}</Badge></td>
                                    </tr>
                                    <tr>
                                        <th>Khoa:</th>
                                        <td>{viewDoctor.department?.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Lịch làm việc:</th>
                                        <td>{viewDoctor.description || 'Chưa cập nhật'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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

export default ManageDoctors;
