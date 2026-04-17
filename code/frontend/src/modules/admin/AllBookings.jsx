// frontend/src/modules/admin/AllBookings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllAdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/admin/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="loading-screen">Loading all bookings...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="admin-all-bookings">
      <h1>All Bookings (Admin View)</h1>
      {bookings.length === 0 ? (
        <p>No bookings found in the system.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Property Address</th>
              <th>Renter Name</th>
              <th>Owner Name</th>
              <th>Status</th>
              <th>Requested On</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.property ? booking.property.address : 'N/A'}</td>
                <td>{booking.renter ? booking.renter.name : 'N/A'}</td>
                <td>{booking.owner ? booking.owner.name : 'N/A'}</td>
                <td><span className={`status-${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllAdminBookings;