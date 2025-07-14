import { Link } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Skeleton from '@mui/material/Skeleton';
import house from '../static/images/cards/house.jpg';
import { Avatar, Box, Button, ButtonBase, CardActions, CardHeader, Chip, Collapse, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ListingCard({ listing }) {
    return (
        <div>
            <Link to={`/listings/${listing.id}`} >
                <ButtonBase>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            noWrap
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            // slotProps={{title: {noWrap: true}}}
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella kdnd fdfds f"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            component="img"
                            height="160"
                            image={listing.media?.[0]?.file || house}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} align="left">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button sx={{ mr: 'auto' }} aria-label="add to favorites" noWrap>
                                {listing.location}
                            </Button>
                            <Button sx={{}} variant="outlined" size="small" aria-label="add to favorites">
                                {listing.price_per_day}
                            </Button>
                        </CardActions>
                    </Card>
                </ButtonBase>
            </Link>
            {/* <Link to={`/listings/${listing.id}`} underline="none"> */}

        </div>
    );
}

export default ListingCard;
