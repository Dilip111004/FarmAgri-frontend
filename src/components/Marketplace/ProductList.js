import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Pro'); // API endpoint to fetch products from MongoDB
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <h2 className="text-center text-success mb-4" style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                Available Products
            </h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div
                            className="card"
                            style={{
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#f9f9f9',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <img
                                src={product.imageUrl} // Using MongoDB image URL from backend
                                className="card-img-top"
                                alt={product.name}
                                style={{
                                    borderTopLeftRadius: '8px',
                                    borderTopRightRadius: '8px',
                                    objectFit: 'cover',
                                    height: '200px',
                                }}
                            />
                            <div className="card-body">
                                <h5
                                    className="card-title"
                                    style={{ fontSize: '1.8rem', fontWeight: '600', color: '#28a745' }}
                                >
                                    {product.name}
                                </h5>
                                <p className="card-text" style={{ fontSize: '1rem', color: '#555', marginBottom: '15px' }}>
                                    {product.description}
                                </p>
                                <p
                                    className="card-text"
                                    style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff' }}
                                >
                                    Price: {product.price}
                                </p>
                                {/* <button
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
                                    onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
                                >
                                    Request Purchase
                                </button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
