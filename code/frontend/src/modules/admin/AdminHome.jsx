// frontend/src/modules/admin/AdminHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminHome() {
  return (
    <div className="admin-home-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin control panel. Here you can manage users, properties, and bookings.</p>
      <div className="dashboard-actions">
        <Link to="/admin/users" className="btn">Manage Users</Link>
        <Link to="/admin/properties" className="btn" style={{ marginLeft: '10px' }}>View All Properties</Link>
        <Link to="/admin/bookings" className="btn" style={{ marginLeft: '10px' }}>View All Bookings</Link>
      </div>
    </div>
  );
}

export default AdminHome;