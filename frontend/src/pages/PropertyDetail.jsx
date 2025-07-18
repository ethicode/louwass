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

function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(() => {
        console.log('property.media')
        getPropertyById(id)
            .then((res) => setProperty(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    // if (!property) return <p>Chargement...</p>;

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
                            {property.media && property.media.map((item, index) => (
                                <ImageListItem key={item.id}>
                                    <img
                                        srcSet={`${item.file}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.file}?w=164&h=164&fit=crop&auto=format`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Paper >
                    <hr />
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
