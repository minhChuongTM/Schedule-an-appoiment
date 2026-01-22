import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router';
import { FaCalendarAlt, FaHospital, FaUserMd, FaClock, FaNotesMedical } from 'react-icons/fa';
import api from '~/services/api';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDoctors, setLoadingDoctors] = useState(false);
    const [loadingAvailability, setLoadingAvailability] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [busyTimes, setBusyTimes] = useState([]);

    const [formData, setFormData] = useState({
        department_id: searchParams.get('department_id') || '',
        doctor_id: searchParams.get('doctor_id') || '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
        notes: ''
    });

    useEffect(() => {
        fetchDepartments();
        fetchUserInfo();
        const doctorId = searchParams.get('doctor_id');
        if (doctorId) {
            // Nếu có doctor_id từ URL, fetch thông tin bác sĩ
            fetchDoctorInfo(doctorId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (formData.department_id) {
            fetchDoctorsByDepartment(formData.department_id);
        }
    }, [formData.department_id]);

    useEffect(() => {
        if (formData.doctor_id && formData.appointment_date) {
            fetchDoctorAvailability(formData.doctor_id, formData.appointment_date);
        } else {
            setBusyTimes([]);
        }
    }, [formData.doctor_id, formData.appointment_date]);

    useEffect(() => {
        if (busyTimes.includes(formData.appointment_time)) {
            setFormData(prev => ({
                ...prev,
                appointment_time: ''
            }));
        }
    }, [busyTimes]);

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

    const fetchDoctorsByDepartment = async (departmentId) => {
        try {
            setLoadingDoctors(true);
            const response = await api.get(`/departments/${departmentId}/doctors`);
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoadingDoctors(false);
        }
    };

    const fetchDoctorInfo = async (doctorId) => {
        try {
            const response = await api.get(`/doctors/${doctorId}`);
            if (response.data.success) {
                const doctor = response.data.data;
                setFormData(prev => ({
                    ...prev,
                    department_id: doctor.department_id.toString()
                }));
            }
        } catch (error) {
            console.error('Error fetching doctor info:', error);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await api.get('/auth/me');
            if (response.data.success) {
                setUserInfo(response.data.data.user);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const fetchDoctorAvailability = async (doctorId, date) => {
        try {
            setLoadingAvailability(true);
            const response = await api.get('/appointments/availability', {
                params: { doctor_id: doctorId, date }
            });
            if (response.data.success) {
                setBusyTimes(response.data.data?.busy_times || []);
            }
        } catch (error) {
            console.error('Error fetching availability:', error);
            setBusyTimes([]);
        } finally {
            setLoadingAvailability(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const next = { ...prev, [name]: value };

            if (name === 'appointment_date') {
                next.appointment_time = '';
            }

            // Khi chọn doctor, tự động set department
            if (name === 'doctor_id') {
                const selectedDoctor = doctors.find(d => d.user_id.toString() === value);
                if (selectedDoctor) {
                    next.department_id = selectedDoctor.department_id.toString();
                }
                next.appointment_time = '';
            }

            // Khi thay đổi department, reset doctor
            if (name === 'department_id') {
                next.doctor_id = '';
                next.appointment_time = '';
            }

            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Kết hợp date và time
            const appointmentDateTime = `${formData.appointment_date}T${formData.appointment_time}:00`;

            const submitData = {
                department_id: formData.department_id || null,
                doctor_id: formData.doctor_id || null,
                appointment_date: appointmentDateTime,
                reason: formData.reason || null,
                notes: formData.notes || null
            };

            const response = await api.post('/appointments', submitData);

            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    navigate('/thong-tin-cua-toi');
                }, 2000);
            }
        } catch (err) {
            console.error('Booking error:', err);
            if (err.response?.status === 409) {
                // Conflict - bác sĩ đã có lịch
                setError(err.response.data.message);
                if (err.response.data.suggested_time) {
                    setError(prev => prev + ` Thời gian gợi ý: ${new Date(err.response.data.suggested_time).toLocaleString('vi-VN')}`);
                }
            } else if (err.response?.data?.errors) {
                const errors = Object.values(err.response.data.errors).flat();
                setError(errors.join(', '));
            } else {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Lấy ngày tối thiểu (hôm nay)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Lấy ngày tối đa (6 tháng sau)
    const getMaxDate = () => {
        const future = new Date();
        future.setMonth(future.getMonth() + 6);
        return future.toISOString().split('T')[0];
    };

    const morningSlots = [
        { value: '08:00', label: '08:00 - 8 giờ sáng' },
        { value: '08:30', label: '08:30 - 8 giờ 30 sáng' },
        { value: '09:00', label: '09:00 - 9 giờ sáng' },
        { value: '09:30', label: '09:30 - 9 giờ 30 sáng' },
        { value: '10:00', label: '10:00 - 10 giờ sáng' },
        { value: '10:30', label: '10:30 - 10 giờ 30 sáng' },
        { value: '11:00', label: '11:00 - 11 giờ sáng' },
        { value: '11:30', label: '11:30 - 11 giờ 30 sáng' }
    ];

    const afternoonSlots = [
        { value: '13:00', label: '13:00 - 1 giờ chiều' },
        { value: '13:30', label: '13:30 - 1 giờ 30 chiều' },
        { value: '14:00', label: '14:00 - 2 giờ chiều' },
        { value: '14:30', label: '14:30 - 2 giờ 30 chiều' },
        { value: '15:00', label: '15:00 - 3 giờ chiều' },
        { value: '15:30', label: '15:30 - 3 giờ 30 chiều' },
        { value: '16:00', label: '16:00 - 4 giờ chiều' },
        { value: '16:30', label: '16:30 - 4 giờ 30 chiều' }
    ];

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-sm">
                        <Card.Header style={{ backgroundColor: 'var(--brandColor)', color: 'white' }}>
                            <h4 className="mb-0 fw-bold">
                                <FaCalendarAlt className="me-2" />
                                Đặt Lịch Khám
                            </h4>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <div className="mb-4 p-3 bg-light rounded">
                                <h6 className="fw-bold mb-3 text-primary">Thông tin bệnh nhân</h6>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Họ và tên</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={userInfo?.name || ''}
                                                disabled
                                                className="bg-white"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Ngày sinh</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={userInfo?.birthdate || 'Chưa cập nhật'}
                                                disabled
                                                className="bg-white"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                {/* Department Selection */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">
                                        <FaHospital className="me-2" style={{ color: 'var(--brandColor)' }} />
                                        Chọn Khoa <span className="text-muted">(Tùy chọn)</span>
                                    </Form.Label>
                                    <Form.Select
                                        name="department_id"
                                        value={formData.department_id}
                                        onChange={handleChange}
                                        size="lg"
                                    >
                                        <option value="">-- Chọn khoa --</option>
                                        {departments.map(dept => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Text className="text-muted">
                                        Bạn có thể chọn khoa mà không cần chọn bác sĩ cụ thể
                                    </Form.Text>
                                </Form.Group>

                                {/* Doctor Selection */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">
                                        <FaUserMd className="me-2" style={{ color: 'var(--brandColor)' }} />
                                        Chọn Bác Sĩ <span className="text-muted">(Tùy chọn)</span>
                                    </Form.Label>
                                    <Form.Select
                                        name="doctor_id"
                                        value={formData.doctor_id}
                                        onChange={handleChange}
                                        disabled={!formData.department_id || loadingDoctors}
                                        size="lg"
                                    >
                                        <option value="">-- Chọn bác sĩ --</option>
                                        {doctors.map(doctor => (
                                            <option key={doctor.user_id} value={doctor.user_id}>
                                                {doctor.user.name} - {doctor.level}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {loadingDoctors && <Spinner animation="border" size="sm" className="ms-2" />}
                                    <Form.Text className="text-muted">
                                        Chọn bác sĩ sẽ tự động chọn khoa tương ứng
                                    </Form.Text>
                                </Form.Group>

                                {/* Appointment Date & Time */}
                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                <FaClock className="me-2" style={{ color: 'var(--brandColor)' }} />
                                                Ngày Hẹn <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="appointment_date"
                                                value={formData.appointment_date}
                                                onChange={handleChange}
                                                min={getMinDate()}
                                                max={getMaxDate()}
                                                required
                                                size="lg"
                                                style={{ fontSize: '1.1rem' }}
                                            />
                                            <Form.Text className="text-muted">
                                                Chọn ngày khám (trong vòng 6 tháng)
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                Giờ Hẹn <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="appointment_time"
                                                value={formData.appointment_time}
                                                onChange={handleChange}
                                                required
                                                size="lg"
                                                style={{ fontSize: '1.1rem' }}
                                            >
                                                <option value="">-- Chọn giờ --</option>
                                                <optgroup label="Buổi sáng">
                                                    {morningSlots.map(slot => (
                                                        <option
                                                            key={slot.value}
                                                            value={slot.value}
                                                            disabled={busyTimes.includes(slot.value)}
                                                        >
                                                            {slot.label}{busyTimes.includes(slot.value) ? ' (Đã có lịch)' : ''}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                                <optgroup label="Buổi chiều">
                                                    {afternoonSlots.map(slot => (
                                                        <option
                                                            key={slot.value}
                                                            value={slot.value}
                                                            disabled={busyTimes.includes(slot.value)}
                                                        >
                                                            {slot.label}{busyTimes.includes(slot.value) ? ' (Đã có lịch)' : ''}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            </Form.Select>
                                            <Form.Text className="text-muted">
                                                {loadingAvailability && 'Đang kiểm tra lịch của bác sĩ...'}
                                                {!loadingAvailability && formData.doctor_id && formData.appointment_date && busyTimes.length > 0 && (
                                                    <>Đã có lịch vào: {busyTimes.join(', ')}</>
                                                )}
                                                {!loadingAvailability && (!formData.doctor_id || !formData.appointment_date || busyTimes.length === 0) && (
                                                    <>Chọn giờ khám phù hợp</>
                                                )}
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Reason */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">
                                        <FaNotesMedical className="me-2" style={{ color: 'var(--brandColor)' }} />
                                        Lý Do Khám <span className="text-muted">(Tùy chọn)</span>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        placeholder="Mô tả triệu chứng hoặc lý do khám bệnh..."
                                    />
                                </Form.Group>

                                {/* Notes */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Ghi Chú</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Thông tin bổ sung (nếu có)..."
                                    />
                                </Form.Group>

                                {/* Submit Buttons */}
                                <div className="d-flex gap-3">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        size="lg"
                                        style={{
                                            backgroundColor: 'var(--brandColor)',
                                            borderColor: 'var(--brandColor)',
                                            flex: 1
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner animation="border" size="sm" className="me-2" />
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            <>
                                                <FaCalendarAlt className="me-2" />
                                                Đặt Lịch
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        size="lg"
                                        onClick={() => navigate(-1)}
                                        disabled={loading}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Info Card */}
                    <Card className="mt-4 border-0 bg-light">
                        <Card.Body>
                            <h6 className="fw-bold mb-3">Lưu ý:</h6>
                            <ul className="mb-0">
                                <li>Chỉ cần chọn ngày giờ là có thể đặt lịch</li>
                                <li>Bạn có thể chọn thêm khoa hoặc bác sĩ cụ thể (không bắt buộc)</li>
                                <li>Khi chọn bác sĩ, khoa sẽ được tự động chọn</li>
                                <li>Lịch hẹn sẽ ở trạng thái chờ xác nhận</li>
                                <li>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BookAppointment;
