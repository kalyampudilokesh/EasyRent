// frontend/src/modules/user/renter/AllBookings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RentersAllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Fetch bookings specific to the logged-in renter
                // Axios interceptor will automatically add the JWT token
                const response = await axios.get('/api/properties/renter/bookings');
                setBookings(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) return <div className="loading-screen">Loading your bookings...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="renter-bookings-list">
            <h1>My Booking Requests</h1>
            {bookings.length === 0 ? (
                <p className="info-message">You have no active booking requests.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Property Address</th>
                            <th>Property Type</th>
                            <th>Owner</th>
                            <th>Your Message</th>
                            <th>Status</th>
                            <th>Requested On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.property ? booking.property.address : 'N/A'}</td>
                                <td>{booking.property ? booking.property.propertyType : 'N/A'}</td>
                                <td>{booking.owner ? booking.owner.name : 'N/A'}</td>
                                <td>{booking.renterDetails.message || 'No message'}</td>
                                <td>
                                    {/* Apply dynamic class based on status for styling */}
                                    <span className={`status-${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RentersAllBookings;