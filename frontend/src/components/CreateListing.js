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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [imagePreviews, setImagePreviews] = React.useState([]);

    const handleFileChange = e => {
        setFile(e.target.files[0]);
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
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (file) data.append('media', file);

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
                            sx={{ '& .MuiTextField-root': { m: 1 } }}
                            noValidate
                            autoComplete="off"
                        >
                            <h2>Créer une annonce</h2>
                            {success && <p style={{ color: 'green' }}>Annonce créée avec succès !</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <TextField fullWidth type="text" name="title" placeholder="Titre" onChange={handleChange} required /><br />
                                <TextField fullWidth multiline rows={4} name="description" placeholder="Description" onChange={handleChange} required /><br />
                                <TextField fullWidth type="number" name="price_per_day" placeholder="Prix par jour" onChange={handleChange} required /><br />
                                <TextField fullWidth type="text" name="location" placeholder="Lieu" onChange={handleChange} required /><br />
                                <TextField fullWidth type="date" name="available_from" onChange={handleChange} required /><br />
                                <TextField fullWidth type="date" name="available_to" onChange={handleChange} required /><br />
                                <TextField fullWidth type="number" name="category" placeholder="ID Catégorie" onChange={handleChange} required /><br />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem value={category.id}>{category.title}</MenuItem>
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
                                        onChange={handleFileChange2}
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

                                <TextField type="file" onChange={handleFileChange} accept="image/*" /><br /><br />

                                <button type="submit">Publier</button>
                            </form>
                        </Box>
                    </div>
                </Paper>
            </Container>
            <Container>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World"
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Disabled"
                            defaultValue="Hello World"
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Read Only"
                            defaultValue="Hello World"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            id="outlined-number"
                            label="Number"
                            type="number"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                        <TextField id="outlined-search" label="Search field" type="search" />
                        <TextField
                            id="outlined-helperText"
                            label="Helper text"
                            defaultValue="Default Value"
                            helperText="Some important text"
                        />
                    </div>
                </Box>
                <Autocomplete
                    // sx={{ width: 300 }}
                    options={categories}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField {...params} label="Highlights" margin="normal" />
                    )}
                    renderOption={(props, option, { inputValue }) => {
                        const { key, ...optionProps } = props;
                        const matches = match(option.title, inputValue, { insideWords: true });
                        const parts = parse(option.title, matches);

                        return (
                            <li key={key} {...optionProps}>
                                <div>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        );
                    }}
                />
            </Container>

        </div>
    );
};

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default CreateListing;
