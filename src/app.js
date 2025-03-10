import './app.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import BuyerDashboard from './components/dashboard/BuyerDashboard';
import SellerDashboard from './components/dashboard/SellerDashboard';
import ProductList from './components/Marketplace/ProductList';
import AddProduct from './components/Marketplace/AddProduct';
import Navbar from './components/Navbar';
import FooterBar from './components/FoterBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Load user and login status from localStorage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user'); // Clear user data
    localStorage.removeItem('authToken'); // Clear auth token
  };

  return (
    <div className="App">
      {/* Always render Navbar */}
      <Navbar user={user} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Routes>
        {/* Login and Signup Routes */}
        {!isLoggedIn ? (
          <>
            <Route
              path="/login"
              element={
                <Login
                  setUser={(user) => {
                    setUser(user);
                    setIsLoggedIn(true);
                    localStorage.setItem('user', JSON.stringify(user));
                  }}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProductList />} /> {/* Display ProductList when not logged in */}
          </>
        ) : (
          <>
            {/* Conditional Routes for Buyer and Seller Dashboards */}
            {isLoggedIn && user?.cType === 'Buyer' && (
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            )}
            {isLoggedIn && user?.cType === 'Seller' && (
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
            )}

            {/* Redirect users based on cType */}
            {isLoggedIn && user?.cType === 'buyer' && (
              <Route path="/" element={<Navigate to="/buyer-dashboard" />} />
            )}
            {isLoggedIn && user?.cType === 'seller' && (
              <Route path="/" element={<Navigate to="/seller-dashboard" />} />
            )}

            {/* Add Product (Only accessible by Seller) */}
            <Route
              path="/add-product"
              element={
                isLoggedIn && user?.cType === 'Seller' ? (
                  <AddProduct />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            
            {/* Default Route */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  user?.cType === 'buyer' ? (
                    <Navigate to="/buyer-dashboard" />
                  ) : (
                    <Navigate to="/seller-dashboard" />
                  )
                ) : (
                  <ProductList />
                )
              }
            />
          </>
        )}

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <h1
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '3rem',
                textAlign: 'center',
                color: '#ff0000', // Optional: Add color for emphasis
              }}
            >
              You Do Not Have Access To This Page
            </h1>
          }
        />
      </Routes>

      {/* FooterBar is always displayed */}
      <FooterBar />
    </div>
  );
}

export default App;
