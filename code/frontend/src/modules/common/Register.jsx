// frontend/src/modules/common/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '', // For confirmation
        type: 'Renter', // Default
    });

    const { name, email, password, password2, type } = formData;
    const { register } = useAuth();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert('Passwords do not match'); // Replace with a proper notification system
            return;
        }

        try {
            await register(name, email, password, type);
            alert('Registration successful! You can now log in.'); // Replace with notification
            // Redirection handled by App.js useEffect
        } catch (error) {
            alert(`Registration failed: ${error}`); // Replace with notification
        }
    };

    return (
        <div className="form-container">
            <section className="heading">
                <h1>Sign Up</h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">User Type</label>
                        <select
                            id="type"
                            name="type"
                            value={type}
                            onChange={onChange}
                            className="form-control"
                        >
                            <option value="Renter">Renter</option>
                            <option value="Owner">Owner</option>
                            {/* Admin option is not exposed for public registration */}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            SIGN UP
                        </button>
                    </div>
                </form>
            </section>
            <p>
                Have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
}

export default Register;