import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Typography, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Map from './Map';
import saveAsFavourite from '../../utils/favoritesUtils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Beer = () => {
    const { id } = useParams();
    const [beer, setBeer] = useState<IBeer>();
    const [favourite, setFavourite] = useState<Array<string>>([]);

    // eslint-disable-next-line
    useEffect(fetchData.bind(this, setBeer, id), [id]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('favouriteList') || '[]');
        setFavourite(data);
    }, [id]);

    const saveFavourite = (id: string) => {
        saveAsFavourite(id, setFavourite);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <h2>Beer Details</h2>
            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <article>
                        <section>
                            <Typography variant="h4" gutterBottom>
                                {beer?.name} <IconButton onClick={saveFavourite.bind(this, beer?.id ?? "")} color="primary" size="large">
                                    {favourite.includes(beer?.id ?? '') ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </Typography>
                            <Typography variant="body1">
                                <b>Type:</b> {beer?.brewery_type}
                            </Typography>
                            <Typography variant="body1">
                                <b>Street:</b> {beer?.street}
                            </Typography>
                            <Typography variant="body1">
                                <b>City:</b> {beer?.city}
                            </Typography>
                            <Typography variant="body1">
                                <b>State:</b> {beer?.state}
                            </Typography>
                            <Typography variant="body1">
                                <b>Postal Code:</b> {beer?.postal_code}
                            </Typography>
                            <Typography variant="body1">
                                <b>Country:</b> {beer?.country}
                            </Typography>
                            <Typography variant="body1">
                                <b>Longitude:</b> {beer?.longitude}
                            </Typography>
                            <Typography variant="body1">
                                <b>Latitude:</b> {beer?.latitude}
                            </Typography>
                            <Typography variant="body1">
                                <b>Phone:</b> {beer?.phone}
                            </Typography>
                            <Typography variant="body1">
                                <b>Website:</b> {beer?.website_url}
                            </Typography>
                        </section>
                    </article>
                </Grid>
                <Grid item xs={12} md={7}>
                    {beer?.latitude && beer?.longitude && <Map lat={Number(beer.latitude)} lang={Number(beer.longitude)} />}
                </Grid>
            </Grid>
        </Box>

    );
};

export default Beer;
