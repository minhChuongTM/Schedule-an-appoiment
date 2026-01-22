import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import api from '../../services/api'

const RegisterDoctor = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        birthdate: '',
        gender: 'male',
        address: '',
        level: '',
        department_id: '',
        description: ''
    })

    const [departments, setDepartments] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchDepartments()
    }, [])

    const fetchDepartments = async () => {
        try {
            const response = await api.get('/departments')
            setDepartments(response.data.data)
        } catch (err) {
            console.error('Lỗi khi tải danh sách khoa:', err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            await api.post('/admin/register/doctor', formData)
            setSuccess('Đăng ký bác sĩ thành công!')
            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                phone: '',
                birthdate: '',
                gender: 'male',
                address: '',
                level: '',
                department_id: '',
                description: ''
            })
        } catch (err) {
            const errorData = err.response?.data
            if (errorData?.errors) {
                const errorMessages = Object.values(errorData.errors).flat().join('\n')
                setError(errorMessages)
            } else {
                setError(errorData?.message || 'Đăng ký bác sĩ thất bại')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 className="mb-4">Đăng ký bác sĩ mới</h2>
            
            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
            {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-3">Thông tin cá nhân</h5>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày sinh <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Giới tính <span className="text-danger">*</span></Form.Label>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <hr className="my-4" />
                <h5 className="mb-3">Thông tin nghề nghiệp</h5>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Chức vụ <span className="text-danger">*</span></Form.Label>
                            <Form.Select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn chức vụ</option>
                                <option value="Bác sĩ điều trị">Bác sĩ điều trị</option>
                                <option value="Trưởng khoa">Trưởng khoa</option>
                                <option value="Phó trưởng khoa">Phó trưởng khoa</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Khoa <span className="text-danger">*</span></Form.Label>
                            <Form.Select
                                name="department_id"
                                value={formData.department_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn khoa</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Mô tả lịch làm việc</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Ví dụ: Thứ 2, 4, 6: 8:00 - 12:00 và 13:00 - 17:00"
                    />
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            backgroundColor: 'var(--brandColor)', 
                            border: 'none',
                            padding: '10px 30px'
                        }}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng ký bác sĩ'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default RegisterDoctor
