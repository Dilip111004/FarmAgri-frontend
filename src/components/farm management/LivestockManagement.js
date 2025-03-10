import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LivestockManagement = () => {
    const [livestock, setLivestock] = useState([]); // State for livestock list
    const [newAnimal, setNewAnimal] = useState({ name: '', breed: '', age: '', healthStatus: '' }); // State for new animal
    const [editing, setEditing] = useState(null); // State to track which animal is being edited

    // Fetch livestock data when the component mounts
    useEffect(() => {
        const fetchLivestock = async () => {
            try {
                const response = await axios.get('/api/livestock');
                setLivestock(response.data);
            } catch (error) {
                console.error('Error fetching livestock data:', error);
            }
        };

        fetchLivestock();
    }, []);

    // Handle input changes for adding or editing animals
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnimal((prevAnimal) => ({
            ...prevAnimal,
            [name]: value,
        }));
    };

    // Add a new animal
    const handleAddAnimal = async () => {
        try {
            const response = await axios.post('/api/livestock', newAnimal);
            setLivestock([...livestock, response.data]);
            setNewAnimal({ name: '', breed: '', age: '', healthStatus: '' });
        } catch (error) {
            console.error('Error adding new animal:', error);
        }
    };

    // Edit an existing animal
    const handleEditAnimal = (animal) => {
        setEditing(animal._id);
        setNewAnimal({
            name: animal.name,
            breed: animal.breed,
            age: animal.age,
            healthStatus: animal.healthStatus,
        });
    };

    // Save changes after editing an animal
    const handleSaveAnimal = async () => {
        try {
            const response = await axios.put(`/api/livestock/${editing}`, newAnimal);
            setLivestock(livestock.map((animal) => (animal._id === editing ? response.data : animal)));
            setEditing(null);
            setNewAnimal({ name: '', breed: '', age: '', healthStatus: '' });
        } catch (error) {
            console.error('Error saving animal:', error);
        }
    };

    // Delete an animal from the list
    const handleDeleteAnimal = async (id) => {
        try {
            await axios.delete(`/api/livestock/${id}`);
            setLivestock(livestock.filter((animal) => animal._id !== id));
        } catch (error) {
            console.error('Error deleting animal:', error);
        }
    };

    return (
        <div className="livestock-management container" style={{ marginTop: '50px', padding: '30px', backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="text-center text-primary mb-4" style={{ fontSize: '2.5rem', fontWeight: '700' }}>Livestock Management</h2>
            
            <div className="add-animal" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', marginBottom: '30px' }}>
                <h4 className="text-success" style={{ fontSize: '1.5rem', fontWeight: '600' }}>{editing ? 'Edit Animal' : 'Add New Animal'}</h4>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newAnimal.name}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                    style={{ border: '2px solid #28a745', borderRadius: '5px', padding: '15px', fontSize: '1rem', transition: 'border-color 0.3s ease' }}
                    onFocus={(e) => e.target.style.borderColor = '#218838'}
                    onBlur={(e) => e.target.style.borderColor = '#28a745'}
                />
                <input
                    type="text"
                    name="breed"
                    placeholder="Breed"
                    value={newAnimal.breed}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                    style={{ border: '2px solid #007bff', borderRadius: '5px', padding: '15px', fontSize: '1rem', transition: 'border-color 0.3s ease' }}
                    onFocus={(e) => e.target.style.borderColor = '#0056b3'}
                    onBlur={(e) => e.target.style.borderColor = '#007bff'}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={newAnimal.age}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                    style={{ border: '2px solid #ffc107', borderRadius: '5px', padding: '15px', fontSize: '1rem', transition: 'border-color 0.3s ease' }}
                    onFocus={(e) => e.target.style.borderColor = '#e0a800'}
                    onBlur={(e) => e.target.style.borderColor = '#ffc107'}
                />
                <input
                    type="text"
                    name="healthStatus"
                    placeholder="Health Status"
                    value={newAnimal.healthStatus}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                    style={{ border: '2px solid #dc3545', borderRadius: '5px', padding: '15px', fontSize: '1rem', transition: 'border-color 0.3s ease' }}
                    onFocus={(e) => e.target.style.borderColor = '#c82333'}
                    onBlur={(e) => e.target.style.borderColor = '#dc3545'}
                />
                {editing ? (
                    <button onClick={handleSaveAnimal} className="btn btn-success w-100" style={{ padding: '12px', fontSize: '1.2rem' }}>Save</button>
                ) : (
                    <button onClick={handleAddAnimal} className="btn btn-primary w-100" style={{ padding: '12px', fontSize: '1.2rem' }}>Add Animal</button>
                )}
            </div>

            <div className="animal-list" style={{ marginTop: '30px' }}>
                <h4 className="text-info" style={{ fontSize: '1.8rem', fontWeight: '600' }}>Current Livestock</h4>
                {livestock.map((animal) => (
                    <div key={animal._id} className="animal-card card mb-3" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                        <h5 className="text-primary" style={{ fontSize: '1.4rem', fontWeight: '700' }}>{animal.name}</h5>
                        <p><strong>Breed:</strong> {animal.breed}</p>
                        <p><strong>Age:</strong> {animal.age} years</p>
                        <p><strong>Health Status:</strong> {animal.healthStatus}</p>
                        <div className="d-flex justify-content-between">
                            <button onClick={() => handleEditAnimal(animal)} className="btn btn-warning">Edit</button>
                            <button onClick={() => handleDeleteAnimal(animal._id)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LivestockManagement;
