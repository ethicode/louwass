import { useState } from "react";
import { searchListings } from "../services/listingService";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import { Container, Grid, Box, Typography, Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        searchListings(query)
            .then((res) => {
                setResults(res.data);
                setError(null);
                setSearched(true);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setResults([]);
                    setError("Aucun résultat trouvé.");
                } else {
                    setError("Erreur lors de la recherche.");
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Navbar />
            <Container>
                {/* Barre de recherche */}
                <Paper
                    component="form"
                    elevation={3}
                    onSubmit={handleSearch}
                    sx={{ p: '10px 4px', display: 'flex', alignItems: 'center', marginTop: '50px' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Rechercher un bien par titre"
                        inputProps={{ 'aria-label': 'search listings' }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                {/* Résultats */}
                <Box sx={{ marginTop: '30px' }}>
                    {loading && <Typography>Chargement...</Typography>}

                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}

                    {!loading && results.length > 0 && (
                        <>
                            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mb: 2 }}>
                                Résultats de recherche
                            </Typography>
                            <Grid container spacing={2}>
                                {results.map((listing) => (
                                    <Grid item xs={12} sm={6} md={4} key={listing.id}>
                                        <ListingCard listing={listing} />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}

                    {searched && !loading && results.length === 0 && !error && (
                        <Typography sx={{ mt: 2 }}>
                            Aucun bien trouvé pour "<strong>{query}</strong>".
                        </Typography>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default Search;
