import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";
import { getCategoryById, getListingByCategory } from "../services/categoryService";
import { Container, Grid } from "@mui/material";
import Searchbar from "../components/Searchbar";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";

function CategoryDetail() {
  const { id } = useParams();

  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListingByCategory(id)
      .then((res) => setListings(res.data))
      .catch((err) => console.error(err));
  }, []);


  if (!listings) return <p>Chargement...</p>;

  return (
    <div>
      <Navbar />
      {/* <h1>Liste des biens</h1> */}
      <Container>
        <Searchbar />
        {/* <Category /> */}
        <Grid container spacing={2} sx={{ marginTop: '30px' }}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default CategoryDetail;
