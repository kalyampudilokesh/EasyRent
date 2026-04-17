// frontend/src/modules/user/Owner/AllBookings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OwnersAllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const {data} = await axios.get('/api/owners/bookings');
                setBookings(data);
                setLoading(false);
            } catch (err) {
                setError(err.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        if (window.confirm(`Are you sure you want to change this booking status to ${newStatus}?`)) {
            try {
                const response = await axios.put(`/api/owners/bookings/${bookingId}/status`, { status: newStatus });
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking._id === bookingId ? { ...booking, status: newStatus } : booking
                    )
                );
                alert(`Booking status updated to ${newStatus}!`);
            } catch (err) {
                alert(`Failed to update status: ${err.response?.data?.message || err.message}`);
            }
        }
    };

    if (loading) return <div className="loading-screen">Loading bookings...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="owner-bookings-list">
            <h1>Bookings for My Properties</h1>
            {bookings.length === 0 ? (
                <p>No bookings received yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Property Address</th>
                            <th>Renter Name</th>
                            <th>Renter Email</th>
                            <th>Renter Phone</th>
                            <th>Renter Message</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.property ? booking.property.address : 'N/A'}</td>
                                <td>{booking.renterDetails.name}</td>
                                <td>{booking.renterDetails.email}</td>
                                <td>{booking.renterDetails.phone || 'N/A'}</td>
                                <td>{booking.renterDetails.message || 'No message'}</td>
                                <td>
                                    <span className={`status-${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>
                                    {booking.status === 'pending' && (
                                        <>
                                            <button className="btn btn-small" onClick={() => handleStatusChange(booking._id, 'approved')}>Approve</button>
                                            <button className="btn btn-small btn-danger" style={{ marginLeft: '5px' }} onClick={() => handleStatusChange(booking._id, 'rejected')}>Reject</button>
                                        </>
                                    )}
                                    {booking.status === 'approved' && (
                                        <button className="btn btn-small btn-success" onClick={() => handleStatusChange(booking._id, 'completed')}>Mark Completed</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OwnersAllBookings;