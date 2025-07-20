// frontend/src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Common Modules
import Home from './modules/common/Home';
import Login from './modules/common/Login';
import Register from './modules/common/Register';
import ForgotPassword from './modules/common/ForgotPassword';

// Admin Modules
import AdminHome from './modules/admin/AdminHome';
import AllUsers from './modules/admin/AllUsers';
import AllAdminBookings from './modules/admin/AllBookings'; // Admin's view of all bookings
import AllAdminProperties from './modules/admin/AllProperty'; // Admin's view of all properties

// Owner Modules
import OwnerHome from './modules/user/Owner/OwnerHome';
import AddProperty from './modules/user/Owner/AddProperty';
import OwnersAllProperties from './modules/user/Owner/AllProperties'; // Owner's own properties
import OwnersAllBookings from './modules/user/Owner/AllBookings'; // Owner's bookings

// Renter Modules
import RenterHome from './modules/user/renter/RenterHome';
import RentersAllProperties from './modules/user/renter/AllProperties'; // Renter's view of all properties
import PropertyDetailPage from './modules/user/renter/PropertyDetailPage'; // New: For single property view
import RentersAllBookings from './modules/user/renter/AllBookings'; // Renter's own bookings

function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Basic redirection after login
  useEffect(() => {
    if (!loading && user) {
      if (user.type === 'Admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.type === 'Owner' && user.isApproved) {
        navigate('/owner/dashboard', { replace: true });
      } else if (user.type === 'Renter') {
        navigate('/renter/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="loading-screen">Loading application...</div>;
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} /> {/* Public or Renter view */}

          {/* Renter Protected Routes */}
          <Route path="/renter/dashboard" element={<ProtectedRoute allowedRoles={['Renter']}><RenterHome /></ProtectedRoute>} />
          <Route path="/renter/properties" element={<ProtectedRoute allowedRoles={['Renter']}><RentersAllProperties /></ProtectedRoute>} />
          <Route path="/renter/bookings" element={<ProtectedRoute allowedRoles={['Renter']}><RentersAllBookings /></ProtectedRoute>} />

          {/* Owner Protected Routes */}
          <Route path="/owner/dashboard" element={<ProtectedRoute allowedRoles={['Owner']} requiresApproval={true}><OwnerHome /></ProtectedRoute>} />
          <Route path="/owner/properties/add" element={<ProtectedRoute allowedRoles={['Owner']} requiresApproval={true}><AddProperty /></ProtectedRoute>} />
          <Route path="/owner/properties" element={<ProtectedRoute allowedRoles={['Owner']} requiresApproval={true}><OwnersAllProperties /></ProtectedRoute>} />
          <Route path="/owner/bookings" element={<ProtectedRoute allowedRoles={['Owner']} requiresApproval={true}><OwnersAllBookings /></ProtectedRoute>} />

          {/* Admin Protected Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['Admin']}><AdminHome /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['Admin']}><AllUsers /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['Admin']}><AllAdminBookings /></ProtectedRoute>} />
          <Route path="/admin/properties" element={<ProtectedRoute allowedRoles={['Admin']}><AllAdminProperties /></ProtectedRoute>} />

          {/* Fallback Route for 404 */}
          <Route path="*" element={<div className="not-found"><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;