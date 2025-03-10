// src/components/Dashboard/SellerDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SellerDashboard = () => {
    const [crops, setCrops] = useState([]);
    const [livestock, setLivestock] = useState([]);
    const [products, setProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFarmData = async () => {
            try {
                const cropData = await axios.get('http://localhost:3001/Crop');
                const livestockData = await axios.get('http://localhost:3001/Live');
                setCrops(cropData.data);
                setLivestock(livestockData.data);
            } catch (err) {
                setError('Error fetching farm data');
                console.error('Error fetching farm data:', err);
            }
        };
        
        const fetchSellerData = async () => {
            try {
                // Corrected the URL to /api/products and /api/requests
                const productData = await axios.get('http://localhost:3001/Pro');
                const requestData = await axios.get('http://localhost:3001/Requests');
                setProducts(productData.data);
                setRequests(requestData.data);
            } catch (err) {
                setError('Error fetching seller data');
                console.error('Error fetching seller data:', err);
            }
        };
        

        // Fetch both farm data and seller data using Promise.all to handle all the data requests
        Promise.all([fetchFarmData(), fetchSellerData()])
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

    const handleApprove = () => {
        alert('Purchase request approved!');
        setTimeout(() =>  3000);
    };

    

    const handleReject = () => {
        alert('Purchase request rejected!');
        setTimeout(() =>  3000);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">Seller Dashboard</h2>

            {/* Farm Data Section */}
            <section className="mb-5">
                <h3 className="text-success mb-3">Your Farm Data</h3>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Crops</h4>
                        {crops.length > 0 ? (
                            <div className="card shadow-sm p-3 mb-3">
                                {crops.map((crop) => (
                                    <p key={crop._id}>  {/* Ensure '_id' is used if the database is MongoDB */}
                                        <strong>{crop.name}</strong> - Planted on: {crop.plantingDate}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p>No crops data available.</p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <h4>Livestock</h4>
                        {livestock.length > 0 ? (
                            <div className="card shadow-sm p-3 mb-3">
                                {livestock.map((l) => (
                                    <p key={l._id}>  {/* Ensure '_id' is used if the database is MongoDB */}
                                        <strong>{l.animalType}</strong> [Count: {l.count}]<br />
                                        Health Status: {l.healthStatus}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p>No livestock data available.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="mb-5">
                <h3 className="text-success mb-3">Your Products</h3>
                <div className="row">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <div
                                    className="card"
                                    style={{
                                        width: '18rem',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                        backgroundColor: '#f9f9f9',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    <img
                                        src={product.imageUrl}  // Ensure this field is provided in your backend
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', objectFit: 'cover', height: '200px' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ fontSize: '1.8rem', fontWeight: '600', color: '#28a745' }}>
                                            {product.name}
                                        </h5>
                                        <p className="card-text" style={{ fontSize: '1rem', color: '#555', marginBottom: '15px' }}>
                                            {product.description}
                                        </p>
                                        <p className="card-text" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff' }}>
                                            Price: {product.price}
                                        </p>
                                        <button
                                            className="btn btn-primary w-100"
                                            style={{
                                                padding: '10px 0',
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                borderRadius: '5px',
                                                backgroundColor: '#28a745',
                                                border: 'none',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                                        >
                                            Request Purchase
                                        </button>
                                    
                                       
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products data available.</p>
                    )}
                </div>
            </section>

            {/* Purchase Requests Section */}
            <section>
                <h3 className="text-success mb-3">Purchase Requests</h3>
                <div className="row">
                    {requests.length > 0 ? (
                        requests.map((request) => (
                            <div key={request._id} className="col-md-6 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <p>
                                            Product: <strong>{request.productName}</strong> - Requested by: {request.buyerEmail}
                                        </p>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => handleApprove(request._id)}  // Ensure '_id' if MongoDB is used
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleReject(request._id)}  // Ensure '_id' if MongoDB is used
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No purchase requests available.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SellerDashboard;
