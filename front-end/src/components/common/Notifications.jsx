import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { FaBell, FaCheck } from 'react-icons/fa';
import { useAuth } from '~/services/auth/AuthContext';
import api from '~/services/api';

const Notifications = () => {
    const { refreshUser } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await api.get('/notifications');
            if (response.data.success) {
                setNotifications(response.data.data);
                setUnreadCount(response.data.data.filter(n => !n.is_read).length); // Changed from !n.read_at to !n.is_read
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, is_read: true } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
            if (refreshUser) refreshUser();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
                <h5 className="mb-0 text-primary">
                    <FaBell className="me-2" />
                    Thông báo
                    {unreadCount > 0 && (
                        <Badge bg="danger" className="ms-2 rounded-pill">
                            {unreadCount}
                        </Badge>
                    )}
                </h5>
                <Button variant="link" size="sm" onClick={fetchNotifications}>
                    Làm mới
                </Button>
            </Card.Header>
            <ListGroup variant="flush" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <ListGroup.Item
                            key={notification.id}
                            onClick={() => {
                                if (!notification.is_read) {
                                    markAsRead(notification.id);
                                }
                            }}
                            className={`d-flex justify-content-between align-items-start py-3 cursor-pointer ${!notification.is_read ? 'bg-dark text-white bg-opacity-10' : ''}`}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{notification.title}</div>
                                <small className={`${!notification.is_read ? 'text-dark fw-medium' : 'text-muted'} d-block mb-1`}>{notification.message}</small>
                                <small className="text-secondary" style={{ fontSize: '0.8rem' }}>
                                    {new Date(notification.created_at).toLocaleString('vi-VN')}
                                </small>
                            </div>
                            {!notification.is_read && (
                                <Badge bg="primary" pill style={{ fontSize: '0.6rem' }}>
                                    Mới
                                </Badge>
                            )}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="text-center text-muted py-4">
                        Không có thông báo nào
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );
};

export default Notifications;
