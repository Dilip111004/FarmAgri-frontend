import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ setLoginStatus, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // API call to login
      const response = await axios.post('http://localhost:3001/login', { email, password });

      if (response.status === 200) {
        const { token, user } = response.data; // Extract token and user details

        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Save user details in app state
        setUser(user);
        setLoginStatus(true);

        // Redirect to the products page
        navigate('/products'); // Change this if your products route is different
      }
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Login</h2>
      <form onSubmit={handleLogin} className="card p-4 shadow">
        {/* Email Field */}
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password Field */}
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Error Message */}
        {error && <p className="text-danger">{error}</p>}
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
