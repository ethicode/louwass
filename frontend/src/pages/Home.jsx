import { useEffect, useState } from "react";
import { getListings } from "../services/listingService";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import Grid from '@mui/material/Grid';
import { Box, Container, Paper, Toolbar } from "@mui/material";
import Searchbar from "../components/Searchbar";
import Category from "../components/Category";


function Home() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        getListings()
            .then((res) => setListings(res.data))
            .catch((err, grey) => console.error(err));
    }, []);

    return (
        <div>
            <Navbar />
            {/* <h1>Liste des biens</h1> */}
            <Toolbar/>
            <Container>
                <Category />
                <Searchbar />
                
                <Box sx={{ fontWeight: 'bold', m: 0, fontSize: 20, marginTop: '70px' }}>Pour les vacances</Box>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    {listings.map((listing) => (
                        <Grid size={{ xs: 6, md: 2 }}>
                            <ListingCard key={listing.id} listing={listing} />
                        </Grid>
                    )
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default Home;
