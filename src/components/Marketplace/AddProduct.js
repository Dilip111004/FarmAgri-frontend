import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Added imageUrl state

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to backend with product data
            const response = await axios.post('http://localhost:3001/api/products', {
                name,
                price,
                description,
                imageUrl,
            });

            if (response.status === 201) {
                alert("Product added successfully!");
                // Reset form fields after submission
                setName('');
                setPrice('');
                setDescription('');
                setImageUrl('');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('There was an error adding the product.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="p-4 shadow rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
