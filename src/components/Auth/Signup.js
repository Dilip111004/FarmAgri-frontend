import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customertype, setcustomertype] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
        customertype
      });

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Signup</h2>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        {/* Username */}
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Customer type */}
<div className="form-group mb-3">
  <label htmlFor="customertype" className="form-label">
    Customer Type
  </label>
  <select
    className="form-control"
    id="customertype"
    name="customertype"
    required
    value={customertype}
    onChange={(e) => setcustomertype(e.target.value)}
  >
    <option value="" disabled>
      Select your customer type
    </option>
    <option value="Buyer">Buyer</option>
    <option value="Seller">Seller</option>
  </select>
</div>


        {/* Password */}
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Display success or error messages */}
        {error && <p className="text-danger text-center">{error}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}

        {/* Signup Button */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ padding: "10px 0", fontSize: "1.1rem", fontWeight: "600" }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
