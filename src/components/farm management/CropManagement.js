import React, { useState } from 'react';
import axios from 'axios';

const CropManagement = () => {
    const [cropName, setCropName] = useState('');
    const [plantingDate, setPlantingDate] = useState('');
    const [harvestDate, setHarvestDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/crops', { cropName, plantingDate, harvestDate });
            alert('Crop added successfully!');
        } catch (error) {
            console.error('Error saving crop data', error);
        }
    };

    return (
        <div className="container" style={{ marginTop: '50px', padding: '30px', backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="text-center text-success mb-4" style={{ fontSize: '2.5rem', fontWeight: '700' }}>Crop Management</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    type="text"
                    placeholder="Crop Name"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="form-control"
                    style={{
                        padding: '15px',
                        fontSize: '1.1rem',
                        borderRadius: '5px',
                        border: '2px solid #28a745',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#218838'}
                    onBlur={(e) => e.target.style.borderColor = '#28a745'}
                />
                <input
                    type="date"
                    value={plantingDate}
                    onChange={(e) => setPlantingDate(e.target.value)}
                    className="form-control"
                    style={{
                        padding: '15px',
                        fontSize: '1.1rem',
                        borderRadius: '5px',
                        border: '2px solid #007bff',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0056b3'}
                    onBlur={(e) => e.target.style.borderColor = '#007bff'}
                />
                <input
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="form-control"
                    style={{
                        padding: '15px',
                        fontSize: '1.1rem',
                        borderRadius: '5px',
                        border: '2px solid #ffc107',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#e0a800'}
                    onBlur={(e) => e.target.style.borderColor = '#ffc107'}
                />
                <button
                    type="submit"
                    className="btn btn-success"
                    style={{
                        padding: '12px 20px',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        borderRadius: '5px',
                        backgroundColor: '#28a745',
                        border: 'none',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                    Add Crop
                </button>
            </form>
        </div>
    );
};

export default CropManagement;
