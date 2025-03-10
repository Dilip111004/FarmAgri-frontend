import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const { productId } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null); // State to hold product details
    const [loading, setLoading] = useState(true); // State to show loading spinner
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate(); // Used to navigate the user after a successful purchase

    useEffect(() => {
        // Fetch product details from the API
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`); // API endpoint to fetch a specific product
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching product details');
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    // Function to handle purchase requests
    const handlePurchaseRequest = async () => {
        try {
            await axios.post('/api/purchase', {
                productId: product._id,
            });
            alert('Purchase request sent successfully!');
            navigate('/buyer/dashboard'); // Navigate to buyer's dashboard
        } catch (error) {
            alert('Error sending purchase request');
        }
    };

    if (loading) return <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#17a2b8' }}>Loading product details...</p>;
    if (error) return <p style={{ color: '#dc3545', textAlign: 'center', fontSize: '18px' }}>{error}</p>;

    return (
        <div className="container" style={{ marginTop: '50px', backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="text-center" style={{ color: '#28a745', fontSize: '2.5rem', fontWeight: '600' }}>{product.name}</h2>
            <p style={{ fontSize: '1.2rem', color: '#333', textAlign: 'justify' }}>{product.description}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}><strong>Price:</strong> ${product.price}</p>
            <p style={{ fontSize: '1.1rem', color: '#555' }}><strong>Seller:</strong> {product.sellerName}</p>
            <div className="text-center">
                <button
                    onClick={handlePurchaseRequest}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        borderRadius: '4px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Request Purchase
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
