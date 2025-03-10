import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BuyerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/Pro', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products.');
            } finally {
                setLoading(false);
            }
        };

        if (authToken) {
            fetchProducts();
        } else {
            setError('User is not authenticated.');
            setLoading(false);
        }
    }, [authToken]);

    const handlePurchaseRequest = (productName) => {
        alert(`Purchase request for '${productName}' has been sent successfully!`);
    };

    if (loading) {
        return <p className="text-center text-primary mt-5" style={{ fontSize: '20px' }}>Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-danger mt-5" style={{ fontSize: '20px' }}>{error}</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Buyer Dashboard</h2>

            <section>
                <h3 className="text-success mb-3">Available Products</h3>
                <div className="row">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <div className="card shadow-sm">
                                    <img
                                        src={product.imageUrl || 'https://via.placeholder.com/200'}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ objectFit: 'cover', height: '200px' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-success">{product.name}</h5>
                                        <p className="card-text">{product.description || 'No description available'}</p>
                                        <p className="card-text font-weight-bold">Price: {product.price}</p>
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
                                            onClick={() => handlePurchaseRequest(product.name)}
                                        >
                                            Request Purchase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No products available.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BuyerDashboard;
