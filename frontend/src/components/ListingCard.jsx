import { Link } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Skeleton from '@mui/material/Skeleton';
import house from '../static/images/cards/house.jpg';
import { Avatar, Box, Button, CardActions, CardHeader, Chip, Collapse, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ListingCard({ listing }) {
    return (
        <div>
            <Card sx={{height:'100'}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={listing.media?.[0]?.file || house}
                    alt="Paella dish"
                />
                {/* <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                /> */}
                <CardContent sx={{ p: '10px' }} >
                    <Typography component="div" sx={{ mx: '0px' }} >
                        <Button variant="outlined" size="small">
                            {listing.price_per_day}
                        </Button>
                        <Box sx={{ fontWeight: 'subtitle2', m: 0, fontSize: 14 }}>{listing.type} {listing.location}</Box>
                        {/* <Box sx={{ fontWeight: 'subtitle2', m: 0, fontSize: 12 }}>{listing.title}</Box> */}
                        <Chip label={listing.location} color="primary" variant="outlined" />
                        <Box sx={{ fontWeight: 'bold', m: 0, fontSize: 14 }}>{listing.price_per_day}</Box>
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: '0px' }} disableSpacing>
                    <Chip label={listing.location} color="primary" variant="outlined" />
                    <IconButton sx={{ ml: 'auto' }} aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>


















            {/* <Link to={`/listings/${listing.id}`} underline="none"> */}

        </div>
    );
}

export default ListingCard;
