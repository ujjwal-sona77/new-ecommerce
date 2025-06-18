import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export const AuthRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/home" replace />;
    }

    return children;
};
