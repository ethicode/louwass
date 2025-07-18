import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import house from './house.jpg';
import { getCategories } from '../services/categoryService';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid } from '@mui/material';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    // height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  // width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function Category() {

  const [categories, setCateories] = React.useState([]);

  React.useEffect(() => {
    getCategories()
      .then((res) => setCateories(res.data))
      .catch((err) => console.error(err));
  }, []);


  return (
    <div>
      <Grid container spacing={0.3} sx={{ marginTop: '30px' }}>
        {categories.map((category) => (
          <Grid size={2}>
            <Link to={`/categories/${category.id}/listings`}>
              <ImageButton
                focusRipple
                key="1kjlhjk"
                sx={{width:'100%'}}
                // style={{
                //   width: 100,
                // }}
              >
                <ImageSrc style={{ backgroundImage: `url(${category.file || house})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={(theme) => ({
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: `calc(${theme.spacing(1)} + 6px)`,
                    })}
                  >
                    {category.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </Link>
          </Grid>

        ))}
      </Grid>
    </div>
  );
}