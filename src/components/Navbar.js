import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from './assest/logo.jpg';

const Navbar = ({ user, isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const navbarCollapseRef = useRef(null);

  const handleLinkClick = () => {
    // Close the navbar smoothly for mobile view
    if (navbarCollapseRef.current) {
      const collapseElement = navbarCollapseRef.current;
      collapseElement.classList.remove('show');

      setTimeout(() => {
        collapseElement.classList.add('collapse');
      }, 350);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-lg"
      style={{
        background:
          'linear-gradient(135deg, #4CAF50 0%, #8BC34A 35%, #FFC107 75%, #FF9800 100%)',
      }}
    >
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold text-white" to="/" style={{ textDecoration: 'none' }}>
              <img src={logo} alt="Logo" style={{ width: '80px', marginRight: '20px' }} />
              <span className="fs-1"> Crop Connect </span>
</Link>


        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/seller-dashboard" onClick={handleLinkClick}>
                Seller Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/buyer-dashboard" onClick={handleLinkClick}>
                Buyer Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/add-product" onClick={handleLinkClick}>
                Add Product
              </Link>
            </li>
          </ul>

          {/* Render login/signup or user info */}
          {!isLoggedIn ? (
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/signup" onClick={handleLinkClick}>
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/login" onClick={handleLinkClick}>
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li
                className="nav-item d-flex align-items-center"
                style={{
                  backgroundColor: '#f0f8ff', // Light blue background
                  borderRadius: '30px', // Round the corners for a pill shape
                  padding: '10px 20px', // Slightly larger padding for better spacing
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                  transition: 'transform 0.3s ease-in-out', // Smooth animation for hover effect
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)'; // Slightly enlarge on hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)'; // Reset to original size
                }}
              >
                <FaUserCircle size={30} className="me-2" style={{ color: '#007bff' }} />
                <span
                  className="navbar-text"
                  style={{
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '16px', // Set a specific font size
                    textTransform: 'capitalize', // Capitalize the first letter of each word
                    letterSpacing: '0.5px', // Slight spacing between letters
                  }}
                >
                  Welcome <span style={{ color: '#28a745' }}>{user.name}</span>,{' '}
                  <span style={{ color: '#ffc107' }}>{user.cType}</span>
                </span>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                  style={{ color: '#ff4d4d', fontWeight: 'bold' }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
