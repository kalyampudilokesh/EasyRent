// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles, requiresApproval = false }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="loading-screen">Loading authentication...</div>;
    }

    if (!user) {
        // Not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.type)) {
        // Authenticated but not authorized for this role
        return <Navigate to="/unauthorized" replace />; // You'll need to create this page
    }

    if (requiresApproval && user.type === 'Owner' && !user.isApproved) {
        // Owner needs approval
        return <Navigate to="/owner-pending-approval" replace />; // You'll need to create this page
    }

    return children;
};

export default ProtectedRoute;