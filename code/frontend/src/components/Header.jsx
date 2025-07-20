// frontend/src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct path: one level up to src, then into context

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">HOUSEHUNT</Link>
            </div>
            <nav>
                <ul>
                    {user ? (
                        <>
                            <li>
                                <span className="user-info">Welcome, {user.name} ({user.type})</span>
                            </li>
                            {/* Conditional navigation based on user type */}
                            {user.type === 'Renter' && (
                                <>
                                    <li><Link to="/renter/properties">Properties</Link></li>
                                    <li><Link to="/renter/bookings">My Bookings</Link></li>
                                </>
                            )}
                            {user.type === 'Owner' && user.isApproved && (
                                <>
                                    <li><Link to="/owner/properties">My Properties</Link></li>
                                    <li><Link to="/owner/properties/add">Add Property</Link></li>
                                    <li><Link to="/owner/bookings">Property Bookings</Link></li>
                                </>
                            )}
                            {user.type === 'Admin' && (
                                <>
                                    <li><Link to="/admin/users">Manage Users</Link></li>
                                    <li><Link to="/admin/properties">All Properties</Link></li>
                                    <li><Link to="/admin/bookings">All Bookings</Link></li>
                                </>
                            )}
                            <li>
                                <button className="btn" onClick={onLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;