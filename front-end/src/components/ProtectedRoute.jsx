import { Navigate, Outlet } from 'react-router';
import { useAuth } from '~/services/auth/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/dang-nhap" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
