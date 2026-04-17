// frontend/src/modules/user/renter/RenterHome.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RenterHome() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Fetch all available properties for display on dashboard
                const response = await axios.get('/api/properties/all');
                setProperties(response.data.slice(0, 6)); // Show a few on home, link to all
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    if (loading) return <div className="loading-screen">Loading properties...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="renter-home-dashboard">
            <h1>Welcome, Renter!</h1>
            <p>Explore available properties or check your bookings.</p>

            <section className="dashboard-section">
                <h2>Featured Properties</h2>
                {properties.length === 0 ? (
                    <p>No properties available at the moment.</p>
                ) : (
                    <div className="properties-grid">
                        {properties.map((property) => (
                            <div key={property._id} className="property-card">
                                {property.images && property.images.length > 0 && (
                                    <img src={property.images[0]} alt={property.address} className="property-img" />
                                )}
                                <div className="property-card-content">
                                    <h3>{property.address}</h3>
                                    <p>Type: {property.propertyType}</p>
                                    <p>Rent: ${property.rentAmount}/month</p>
                                    <Link to={`/properties/${property._id}`} className="btn btn-small">
                                        Get Info
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Link to="/renter/properties" className="btn">
                        View All Properties
                    </Link>
                    <Link to="/renter/bookings" className="btn">
                        My Bookings
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default RenterHome;