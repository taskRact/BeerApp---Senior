import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Typography, IconButton, Paper } from '@mui/material';
import Map from './Map';
import saveAsFavourite from '../../utils/favoritesUtils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './Beer.module.css';

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
        <Paper className={styles.root}>
            {beer && (
                <div className={styles.cardContent}>
                    <Typography variant="h3" component="h3" className={styles.title}>
                        {beer?.name} <IconButton onClick={saveFavourite.bind(this, beer?.id ?? "")} color="primary" size="large">
                            {favourite.includes(beer?.id ?? '') ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Typography>
                    <Typography variant="h4" component="h4" className={styles.subtitle}>
                        Type: {beer?.brewery_type}
                    </Typography>
                    <Typography className={styles.subheading}>Website:</Typography>
                    <Typography variant="body2" component="p">
                        {beer?.website_url
                            ? (<a href={beer?.website_url} target='_blank' rel="noreferrer">{beer?.website_url}</a>)
                            : ('No website available')
                        }
                    </Typography>
                    <Typography className={styles.subheading}>Phone:</Typography>
                    <Typography variant="body2" component="p">
                        {beer?.phone
                            ? (<a href="tel:{beer?.phone}">{beer?.phone}</a>)
                            : ('No phone available')
                        }
                    </Typography>
                    <Typography variant="h4" component="h4" className={styles.subheading}>Location:</Typography>
                    <Typography variant="body2" component="p">
                        {beer?.street}, {beer?.postal_code}
                        <br />{beer?.city}, {beer?.state}
                        <br />{beer?.country}
                    </Typography>
                    {beer?.latitude && beer?.longitude && (
                        <div>
                            <Map lat={Number(beer.latitude)} lang={Number(beer.longitude)} />
                            <Typography variant="h6" component="h6" className={styles.subheading}>Coordinate: {+(beer.latitude)}, {+(beer.longitude)}</Typography>
                        </div>
                    )}
                </div>
            )}
        </Paper>
    );
};

export default Beer;
