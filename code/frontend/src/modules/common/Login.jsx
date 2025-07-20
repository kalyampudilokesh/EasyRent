// frontend/src/modules/common/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const { login } = useAuth();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // Redirection handled by App.js useEffect
        } catch (error) {
            alert(`Login failed: ${error}`); // Replace with a proper notification system
        }
    };

    return (
        <div className="form-container">
            <section className="heading">
                <h1>Login</h1>
                <p>Login to your account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
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
                        <button type="submit" className="btn btn-block">
                            LOGIN
                        </button>
                    </div>
                </form>
            </section>
            <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
        </div>
    );
}

export default Login;