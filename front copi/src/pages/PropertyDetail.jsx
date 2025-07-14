import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";
import Navbar from "../components/Navbar";
import { Box, Card, Container, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,

};

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
];

function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        getPropertyById(id)
            .then((res) => setProperty(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!property) return <p>Chargement...</p>;

    return (
        <div>
            <Box>
                <Navbar />
                <Container>
                    <Paper elevation={5} sx={{
                        // width: 100,
                        // height: 100,
                        marginTop: 10,
                        // borderRadius: '20px', // Apply border-radius to make it circular
                        objectFit: 'cover', // Ensure the image covers the circular area
                    }}>
                        <ImageList
                            // sx={{ width: 500, height: 450 }}
                            variant="quilted"
                            cols={4}
                            rowHeight={300}
                        >
                            {itemData.map((item) => (
                                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                    <img
                                        {...srcset(item.img, 2000, item.rows, item.cols)}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Paper >
                    <Typography component="div">
                        <Box sx={{ fontWeight: 'medium', m: 1 }}>{property.type} {property.location}</Box>
                        <Box sx={{ fontWeight: 'bold', m: 1 }}>{property.price_per_day}</Box>
                        <Box sx={{ fontWeight: 'medium', m: 1 }}>{property.description}</Box>
                        <Box sx={{ fontWeight: 1000, m: 1 }}>{property.type}</Box>
                        <Box sx={{ fontWeight: 'bold', m: 1 }}>{property.type}</Box>
                    </Typography>
                </Container>
            </Box>
        </div>

    );
}

export default PropertyDetail;
