// src/components/CreateListing.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Autocomplete, Box, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { getCategories } from '../services/categoryService';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreateListing = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Erreur chargement catégories", err));
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price_per_day: '',
        location: '',
        available_from: '',
        available_to: '',
        category: '',
        owner: 1,
    });

    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'category' ? parseInt(value) : value
        }));
    };

    const [files, setFiles] = React.useState([]);
    const [imagePreviews, setImagePreviews] = React.useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setImagePreviews(selectedFiles.map(file => URL.createObjectURL(file)));
    };


    const handleFileChange2 = (event) => {
        const files = event.target.files;
        if (files) {
            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setImagePreviews(imageUrls);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        // Ajouter chaque image sous le même nom (ex: media ou images)
        files.forEach((file, index) => {
            data.append('media', file); // ou "images" selon ton backend
        });

        const token = localStorage.getItem('access');

        try {
            const response = await axios.post('http://localhost:8000/api/listings/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Success:', response.data);
            setSuccess(true);
            setError(null);
        } catch (err) {
            console.error(err.response);
            setError('Une erreur est survenue');
            setSuccess(false);
        }
    };


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div>
            <Navbar />
            <Container>
                <Paper sx={{ p: 3, my: 6 }} elevation={3} >
                    <div style={{ margin: '0 auto' }}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ '& .MuiTextField-root': { m: 1 } }}
                            noValidate
                            autoComplete="off"
                            encType="multipart/form-data"
                        >
                            <h2>Créer une annonce</h2>
                            {success && <p style={{ color: 'green' }}>Annonce créée avec succès !</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <TextField fullWidth type="text" name="title" placeholder="Titre" onChange={handleChange} required /><br />
                            <TextField fullWidth multiline rows={4} name="description" placeholder="Description" onChange={handleChange} required /><br />
                            <TextField fullWidth type="number" name="price_per_day" placeholder="Prix par jour" onChange={handleChange} required /><br />
                            <TextField fullWidth type="text" name="location" placeholder="Lieu" onChange={handleChange} required /><br />
                            <TextField fullWidth type="date" name="available_from" onChange={handleChange} required /><br />
                            <TextField fullWidth type="date" name="available_to" onChange={handleChange} required /><br />
                            {/* <TextField fullWidth type="number" name="category" placeholder="ID Catégorie" onChange={handleChange} required /><br /> */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                                <Select
                                    name='category'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                                    ))}
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    // onChange={(event) => console.log(event.target.files)}
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
                                {imagePreviews.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`preview-${index}`}
                                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                                    />
                                ))}
                            </Box>

                            <TextField type="file" onChange={handleFileChange2} accept="image/*" /><br /><br />

                            <Button type="submit" variant="contained" sx={{ m: 1 }}>
                                Publier
                            </Button>
                        </Box>
                    </div>
                </Paper>
            </Container>

        </div>
    );
};

export default CreateListing;
