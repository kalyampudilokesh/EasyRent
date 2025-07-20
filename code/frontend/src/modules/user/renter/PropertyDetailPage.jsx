// frontend/src/modules/user/renter/PropertyDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from './BookingForm'; // Assuming BookingForm.jsx is in the same directory

function PropertyDetailPage() {
    const { id } = useParams(); // Get property ID from URL parameter
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                // Fetch single property details from the backend
                const response = await axios.get(`/api/properties/${id}`);
                setProperty(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]); // Re-run effect if ID changes

    if (loading) return <div className="loading-screen">Loading property details...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (!property) return <div className="info-message">Property not found or unavailable.</div>;

    return (
        <div className="property-detail-page">
            <div className="property-header">
                <h1>{property.address}</h1>
                <p>Owned by: {property.owner.name} ({property.owner.email})</p>
            </div>

            <div className="property-images">
                {property.images && property.images.length > 0 ? (
                    property.images.map((imgSrc, index) => (
                        // Assuming images are served statically from /uploads or a CDN
                        <img key={index} src={imgSrc} alt={`${property.address} ${index + 1}`} className="detail-image" />
                    ))
                ) : (
                    <p>No images available for this property.</p>
                )}
            </div>

            <div className="property-info">
                <p><strong>Type:</strong> {property.propertyType}</p>
                <p><strong>Ad Type:</strong> {property.adAdType}</p>
                <p><strong>Rent Amount:</strong> ${property.rentAmount}/month</p>
                <p><strong>Availability:</strong> {property.isAvailable ? 'Available' : 'Not Available'}</p>
                <p><strong>Description:</strong></p>
                <p>{property.description}</p>
            </div>

            {/* Show booking form if the property is available */}
            {property.isAvailable && (
                <BookingForm
                    propertyId={property._id}
                    propertyAddress={property.address}
                    ownerId={property.owner._id}
                />
            )}
            {!property.isAvailable && <p className="not-available-message">This property is currently not available for booking.</p>}
        </div>
    );
}

export default PropertyDetailPage;