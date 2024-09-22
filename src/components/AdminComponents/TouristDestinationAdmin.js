import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config'; // Updated path
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const TouristDestinationAdmin = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the current tourist destinations
        axios.get(`${config.apiBaseUrl}/tourist-destinations`)
            .then(response => {
                if (response.data) {
                    setDestinations(response.data);
                } else {
                    setError('Invalid response format');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching tourist destinations');
                setLoading(false);
            });
    }, []);

    const handleDestinationChange = (index, field, value) => {
        const newDestinations = [...destinations];
        newDestinations[index][field] = value;
        setDestinations(newDestinations);
    };

    const handleFileChange = (index, file) => {
        const newDestinations = [...destinations];
        newDestinations[index].file = file;
        setDestinations(newDestinations);
    };

    const handleAddDestination = () => {
        setDestinations([...destinations, { name: '', image: '', file: null }]);
    };

    const handleRemoveDestination = (index) => {
        const newDestinations = destinations.filter((_, i) => i !== index);
        setDestinations(newDestinations);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        destinations.forEach(destination => {
            const formData = new FormData();
            formData.append('name', destination.name);
            if (destination.file) {
                formData.append('image', destination.file); // Ensure the field name is 'image'
            }

            const url = destination._id ? `${config.apiBaseUrl}/tourist-destinations/${destination._id}` : `${config.apiBaseUrl}/tourist-destinations`;
            const method = destination._id ? 'put' : 'post';
            axios[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    alert('Tourist destinations updated successfully');
                    // Update the destinations state with the new data
                    setDestinations(prevDestinations => {
                        const updatedDestinations = [...prevDestinations];
                        const index = updatedDestinations.findIndex(d => d._id === destination._id);
                        if (index !== -1) {
                            updatedDestinations[index] = response.data;
                        } else {
                            updatedDestinations.push(response.data);
                        }
                        return updatedDestinations;
                    });
                })
                .catch(error => {
                    setError('Error updating tourist destinations');
                });
        });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - Tourist Destinations
            </Typography>
            <form onSubmit={handleSubmit}>
                {destinations.map((destination, destinationIndex) => (
                    <Paper key={destination._id || destinationIndex} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={destination.name}
                                onChange={(e) => handleDestinationChange(destinationIndex, 'name', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(destinationIndex, e.target.files[0])}
                            />
                            {destination.image && (
                                <img
                                    src={`${config.baseUrl}/${destination.image}`}
                                    alt={destination.name}
                                    style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                                />
                            )}
                        </Box>
                        <Box mt={2}>
                            <IconButton onClick={() => handleRemoveDestination(destinationIndex)} color="secondary">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddDestination} startIcon={<Add />}>
                    Add Destination
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Tourist Destinations
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default TouristDestinationAdmin;