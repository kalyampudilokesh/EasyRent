// frontend/src/modules/admin/AllProperty.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllAdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/admin/properties');
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div className="loading-screen">Loading all properties...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="admin-all-properties">
      <h1>All Properties (Admin View)</h1>
      {properties.length === 0 ? (
        <p>No properties found in the system.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Property ID</th>
              <th>Address</th>
              <th>Type</th>
              <th>Ad Type</th>
              <th>Rent Amount</th>
              <th>Owner</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td>{property._id}</td>
                <td>{property.address}</td>
                <td>{property.propertyType}</td>
                <td>{property.adAdType}</td>
                <td>${property.rentAmount}</td>
                <td>{property.owner ? property.owner.name : 'N/A'}</td>
                <td>{property.isAvailable ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllAdminProperties;