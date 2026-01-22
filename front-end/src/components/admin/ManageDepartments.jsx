import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '~/services/api';

const ManageDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingDept, setEditingDept] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await api.get('/departments');
            if (response.data.success) {
                setDepartments(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleShow = (dept = null) => {
        if (dept) {
            setEditingDept(dept);
            setFormData({ name: dept.name, description: dept.description || '' });
        } else {
            setEditingDept(null);
            setFormData({ name: '', description: '' });
        }
        setError('');
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (editingDept) {
                // Update
                const response = await api.put(`/admin/departments/${editingDept.id}`, formData);
                if (response.data.success) {
                    setSuccess('Cập nhật khoa thành công');
                    fetchDepartments();
                    handleClose();
                }
            } else {
                // Create
                const response = await api.post('/admin/register/department', formData);
                if (response.data.success) {
                    setSuccess('Thêm khoa thành công');
                    fetchDepartments();
                    handleClose();
                }
            }
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khoa này?')) {
            try {
                const response = await api.delete(`/admin/departments/${id}`);
                if (response.data.success) {
                    setSuccess('Xóa khoa thành công');
                    fetchDepartments();
                    setTimeout(() => setSuccess(''), 3000);
                }
            } catch (err) {
                alert(err.response?.data?.message || 'Có lỗi xảy ra khi xóa');
            }
        }
    };

    return (
        <div className="card border-0 shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Quản lý Khoa</h4>
                <Button variant="primary" onClick={() => handleShow()} style={{ backgroundColor: 'var(--brandColor)', border: 'none' }}>
                    <FaPlus className="me-2" />
                    Thêm Khoa
                </Button>
            </div>

            {success && <Alert variant="success">{success}</Alert>}

            <Table responsive hover>
                <thead className="bg-light">
                    <tr>
                        <th>ID</th>
                        <th>Tên Khoa</th>
                        <th>Mô tả</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.id}>
                            <td>{dept.id}</td>
                            <td>{dept.name}</td>
                            <td>{dept.description}</td>
                            <td>
                                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(dept)}>
                                    <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(dept.id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {departments.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">Chưa có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingDept ? 'Cập nhật Khoa' : 'Thêm Khoa Mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên Khoa</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>
                                Hủy
                            </Button>
                            <Button type="submit" variant="primary" style={{ backgroundColor: 'var(--brandColor)', border: 'none' }}>
                                {editingDept ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageDepartments;
