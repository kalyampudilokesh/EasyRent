// frontend/src/modules/user/renter/AllProperties.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RentersAllProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('/api/properties/all'); // Public endpoint for all properties
                setProperties(response.data);
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
        <div className="properties-list">
            <h1>Available Properties</h1>
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
        </div>
    );
}

export default RentersAllProperties;