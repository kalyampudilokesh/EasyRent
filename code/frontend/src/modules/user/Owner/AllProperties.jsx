// frontend/src/modules/user/Owner/AllProperties.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OwnersAllProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('/api/owners/properties');
                setProperties(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const handleDeleteProperty = async (propertyId, propertyAddress) => {
        if (window.confirm(`Are you sure you want to delete the property at ${propertyAddress}?`)) {
            try {
                await axios.delete(`/api/owners/properties/${propertyId}`);
                setProperties((prevProperties) => prevProperties.filter((p) => p._id !== propertyId));
                alert('Property deleted successfully!');
            } catch (err) {
                alert(`Failed to delete property: ${err.response?.data?.message || err.message}`);
            }
        }
    };

    const handleToggleAvailability = async (propertyId, currentAvailability) => {
        try {
            const newAvailability = !currentAvailability;
            await axios.put(`/api/owners/properties/${propertyId}`, { isAvailable: newAvailability });
            setProperties((prevProperties) =>
                prevProperties.map((p) =>
                    p._id === propertyId ? { ...p, isAvailable: newAvailability } : p
                )
            );
            alert(`Property availability updated to ${newAvailability ? 'Available' : 'Not Available'}`);
        } catch (err) {
            alert(`Failed to update availability: ${err.response?.data?.message || err.message}`);
        }
    };

    if (loading) return <div className="loading-screen">Loading your properties...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="owner-all-properties">
            <h1>My Properties</h1>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/owner/properties/add" className="btn">Add New Property</Link>
            </div>
            {properties.length === 0 ? (
                <p>You have not listed any properties yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Type</th>
                            <th>Rent</th>
                            <th>Available</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property._id}>
                                <td>{property.address}</td>
                                <td>{property.propertyType}</td>
                                <td>${property.rentAmount}</td>
                                <td>
                                    <span className={`status-${property.isAvailable ? 'approved' : 'rejected'}`}>
                                        {property.isAvailable ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-small"
                                        onClick={() => handleToggleAvailability(property._id, property.isAvailable)}
                                    >
                                        {property.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                                    </button>
                                    {/* Link to an edit page if you create one */}
                                    {/* <Link to={`/owner/properties/edit/${property._id}`} className="btn btn-small" style={{ marginLeft: '5px' }}>Edit</Link> */}
                                    <button
                                        className="btn btn-small btn-danger"
                                        style={{ marginLeft: '5px' }}
                                        onClick={() => handleDeleteProperty(property._id, property.address)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OwnersAllProperties;