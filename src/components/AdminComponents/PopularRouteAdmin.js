import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const PopularRouteAdmin = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the current popular routes
        axios.get(`${config.apiBaseUrl}/popular-routes`)
            .then(response => {
                if (response.data) {
                    setRoutes(response.data);
                } else {
                    setError('Invalid response format');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching popular routes');
                setLoading(false);
            });
    }, []);

    const handleRouteChange = (index, field, value) => {
        const newRoutes = [...routes];
        newRoutes[index][field] = value;
        setRoutes(newRoutes);
    };

    const handleFileChange = (index, file) => {
        const newRoutes = [...routes];
        newRoutes[index].file = file;
        setRoutes(newRoutes);
    };

    const handleAddRoute = () => {
        setRoutes([...routes, { from: '', to: '', title: '', imageUrl: '', file: null }]);
    };

    const handleRemoveRoute = (index) => {
        const newRoutes = routes.filter((_, i) => i !== index);
        setRoutes(newRoutes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        routes.forEach(route => {
            const formData = new FormData();
            formData.append('from', route.from);
            formData.append('to', route.to);
            formData.append('title', route.title);
            if (route.file) {
                formData.append('image', route.file); // Ensure the field name is 'image'
            }

            const url = route._id ? `${config.apiBaseUrl}/popular-routes/${route._id}` : `${config.apiBaseUrl}/popular-routes`;
            const method = route._id ? 'put' : 'post';
            axios[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    alert('Popular routes updated successfully');
                })
                .catch(error => {
                    setError('Error updating popular routes');
                });
        });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - Popular Routes
            </Typography>
            <form onSubmit={handleSubmit}>
                {routes.map((route, routeIndex) => (
                    <Paper key={route._id || routeIndex} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="From"
                                variant="outlined"
                                fullWidth
                                value={route.from}
                                onChange={(e) => handleRouteChange(routeIndex, 'from', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="To"
                                variant="outlined"
                                fullWidth
                                value={route.to}
                                onChange={(e) => handleRouteChange(routeIndex, 'to', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={route.title}
                                onChange={(e) => handleRouteChange(routeIndex, 'title', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(routeIndex, e.target.files[0])}
                            />
                        </Box>
                        <Box mt={2}>
                            <IconButton onClick={() => handleRemoveRoute(routeIndex)} color="secondary">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddRoute} startIcon={<Add />}>
                    Add Route
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Popular Routes
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default PopularRouteAdmin;