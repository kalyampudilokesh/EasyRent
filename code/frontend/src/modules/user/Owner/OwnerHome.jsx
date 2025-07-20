// frontend/src/modules/user/Owner/OwnerHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function OwnerHome() {
  const { user } = useAuth();

  if (!user || user.type !== 'Owner' || !user.isApproved) {
    // This case should ideally be caught by ProtectedRoute, but good for robustness
    return <div className="error-message">You are not authorized to view this page or your account is not approved yet.</div>;
  }

  return (
    <div className="owner-home-dashboard">
      <h1>Welcome, {user.name} (Owner)!</h1>
      <p>Manage your properties and bookings here.</p>
      <div className="dashboard-actions">
        <Link to="/owner/properties" className="btn">My Properties</Link>
        <Link to="/owner/properties/add" className="btn" style={{ marginLeft: '10px' }}>Add New Property</Link>
        <Link to="/owner/bookings" className="btn" style={{ marginLeft: '10px' }}>View Bookings</Link>
      </div>
    </div>
  );
}

export default OwnerHome;