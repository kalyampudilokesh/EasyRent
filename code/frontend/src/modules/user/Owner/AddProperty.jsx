// frontend/src/modules/user/Owner/AddProperty.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProperty() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        propertyType: '',
        adAdType: 'Rent',
        address: '',
        description: '',
        rentAmount: '',
    });
    const [imageFiles, setImageFiles] = useState([]); // For actual file objects
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        setImageFiles(Array.from(e.target.files));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData(); // FormData for file uploads
            for (const key in formData) {
                data.append(key, formData[key]);
            }
            imageFiles.forEach((file) => {
                data.append('images', file); // 'images' must match the field name in multer middleware
            });

            await axios.post('/api/owners/properties', data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });
            alert('Property added successfully!');
            navigate('/owner/properties');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to add property');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-property-container form-container">
            <section className="heading">
                <h1>Add New Property</h1>
                <p>Fill in the details for your property listing.</p>
            </section>
            {error && <div className="error-message">{error}</div>}
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="propertyType">Property Type:</label>
                        <input
                            type="text"
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={onChange}
                            placeholder="e.g., Apartment, House"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adAdType">Ad Type:</label>
                        <select
                            id="adAdType"
                            name="adAdType"
                            value={formData.adAdType}
                            onChange={onChange}
                            required
                        >
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={onChange}
                            placeholder="Enter full address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            placeholder="Describe your property"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rentAmount">Rent Amount ($/month):</label>
                        <input
                            type="number"
                            id="rentAmount"
                            name="rentAmount"
                            value={formData.rentAmount}
                            onChange={onChange}
                            placeholder="e.g., 1500"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="images">Property Images:</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {imageFiles.length > 0 && (
                            <p>{imageFiles.length} file(s) selected.</p>
                        )}
                    </div>
                    <button type="submit" className="btn btn-block" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Property'}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default AddProperty;