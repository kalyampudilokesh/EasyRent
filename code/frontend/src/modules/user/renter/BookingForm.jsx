// frontend/src/modules/user/renter/BookingForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // Correct path: three levels up to src, then into context

function BookingForm({ propertyId, propertyAddress, ownerId }) {
    const { user } = useAuth(); // Get logged-in user details from AuthContext
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '', // Pre-fill if user is logged in
        email: user?.email || '',
        phone: '', // Renter's phone number
        message: '', // Message to the owner
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Basic validation
        if (!user || user.type !== 'Renter') {
            setError('You must be logged in as a Renter to book a property.');
            setLoading(false);
            return;
        }
        if (!formData.name || !formData.email) {
            setError('Please provide your name and email for the booking request.');
            setLoading(false);
            return;
        }

        try {
            // Send booking request to the backend
            // The backend endpoint is /api/properties/:id/book
            await axios.post(`/api/properties/${propertyId}/book`, {
                renterDetails: formData, // Send the collected renter details
            });

            setSuccess(true);
            alert('Booking request sent successfully! The owner will review it.'); // Simple alert for now
            navigate('/renter/bookings'); // Redirect to renter's bookings page
        } catch (err) {
            console.error('Booking failed:', err);
            setError(err.response?.data?.message || 'Failed to send booking request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return <div className="success-message">Your booking request has been sent successfully! Redirecting...</div>;
    }

    return (
        <div className="booking-form-container form-container my-4">
            <section className="heading">
                <h2>Request to Book {propertyAddress}</h2>
                <p>Please provide your contact details for the owner.</p>
            </section>

            {error && <div className="error-message">{error}</div>}

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            placeholder="Enter your name"
                            required
                            readOnly={!!user?.name} // Make read-only if pre-filled from user context
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            required
                            readOnly={!!user?.email} // Make read-only if pre-filled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number (Optional):</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={onChange}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message to Owner:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={onChange}
                            rows="4"
                            placeholder="Any specific questions or details for the owner?"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-block" disabled={loading}>
                        {loading ? 'Sending Request...' : 'Send Booking Request'}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default BookingForm;