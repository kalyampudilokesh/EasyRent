// frontend/src/modules/common/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    // In a real application, you would send a request to your backend
    // to send a password reset link to the provided email.
    // This is a placeholder for the UI.
    if (email) {
      setMessage('If an account with that email exists, a password reset link has been sent.');
      setEmail('');
    } else {
      setError('Please enter your email address.');
    }
  };

  return (
    <div className="form-container">
      <section className="heading">
        <h1>Forgot Password?</h1>
        <p>Enter your email to reset your password</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Reset Password
            </button>
          </div>
        </form>
      </section>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <p>
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;