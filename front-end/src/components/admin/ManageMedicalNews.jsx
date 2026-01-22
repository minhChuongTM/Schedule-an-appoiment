import React, { useState, useEffect, useCallback } from 'react'
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import api from '~/services/api'

const ManageMedicalNews = () => {
    const [newsList, setNewsList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editingNews, setEditingNews] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image_url: '',
        category: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchNews = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/medical-news')
            
            if (response.data.success) {
                // Laravel pagination: response.data.data is an object with pagination info
                // The actual array is at response.data.data.data
                const paginatedData = response.data.data
                const newsArray = paginatedData.data || paginatedData
                
                // Ensure data is an array
                if (Array.isArray(newsArray)) {
                    setNewsList(newsArray)
                } else if (Array.isArray(paginatedData)) {
                    setNewsList(paginatedData)
                } else {
                    console.error('Data format unexpected:', paginatedData)
                    setNewsList([])
                }
            } else {
                setNewsList([])
            }
        } catch (error) {
            console.error('Error fetching news:', error)
            setNewsList([])
            setError('Không thể tải danh sách tin tức')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchNews()
    }, [fetchNews])

    const handleShow = (news = null) => {
        if (news) {
            setEditingNews(news)
            setFormData({
                title: news.title,
                content: news.content,
                image_url: news.image_url || '',
                category: news.category || ''
            })
        } else {
            setEditingNews(null)
            setFormData({ title: '', content: '', image_url: '', category: '' })
        }
        setError('')
        setShowModal(true)
    }

    const handleClose = () => setShowModal(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            if (editingNews) {
                // Update
                const response = await api.put(`/medical-news/${editingNews.id}`, formData)
                if (response.data.success) {
                    setSuccess('Cập nhật tin tức thành công')
                    fetchNews()
                    handleClose()
                }
            } else {
                // Create
                const response = await api.post('/medical-news', formData)
                if (response.data.success) {
                    setSuccess('Thêm tin tức thành công')
                    fetchNews()
                    handleClose()
                }
            }
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
            try {
                setError('')
                setSuccess('')
                const response = await api.delete(`/medical-news/${id}`)
                if (response.data.success) {
                    setSuccess('Xóa tin tức thành công')
                    fetchNews()
                    setTimeout(() => setSuccess(''), 3000)
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi xóa')
                setTimeout(() => setError(''), 3000)
            }
        }
    }

    return (
        <div className="card border-0 shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Quản lý Tin tức Y tế</h4>
                <Button variant="primary" onClick={() => handleShow()} style={{ backgroundColor: 'var(--brandColor)', border: 'none' }}>
                    <FaPlus className="me-2" />
                    Thêm Tin Tức
                </Button>
            </div>

            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Table responsive hover>
                <thead className="bg-light">
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Danh mục</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center">Đang tải...</td>
                        </tr>
                    ) : newsList.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">Chưa có tin tức nào</td>
                        </tr>
                    ) : (
                        newsList.map((news) => (
                            <tr key={news.id}>
                                <td>{news.id}</td>
                                <td>{news.title}</td>
                                <td>{news.category}</td>
                                <td>{new Date(news.created_at).toLocaleDateString('vi-VN')}</td>
                                <td>
                                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(news)}>
                                        <FaEdit />
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(news.id)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editingNews ? 'Cập nhật Tin Tức' : 'Thêm Tin Tức Mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="VD: Tim mạch, Dinh dưỡng..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL Hình ảnh</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>
                                Hủy
                            </Button>
                            <Button type="submit" variant="primary" style={{ backgroundColor: 'var(--brandColor)', border: 'none' }}>
                                {editingNews ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ManageMedicalNews