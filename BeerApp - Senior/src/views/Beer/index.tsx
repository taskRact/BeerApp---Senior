import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchBeerData, useMuiStyles } from './utils';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api'
import "./Beer.css";
import { getSavedBeer, getSavedBeerList, saveBeerList, toggleSavedListItem } from '../../api/localStorageApi/beerLocalStorage';
import { Checkbox } from '@mui/material';


const Beer = () => {
  const { id } = useParams() as { id: string };
  const [ beer, setBeer ] = useState<IBeer>();
  const [savedList, setSavedList] = useState<Array<IBeer>>([]);
  const { classes } = useMuiStyles();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  });

  useEffect(() => {
    setSavedList(getSavedBeerList());
  }, []);

  useEffect(() => {
    if (navigator.onLine) {
      fetchBeerData(setBeer, id)
    } else {
      setBeer(getSavedBeer(id))
    }
  }, [id]);

  const handleToggleFavorite = (id: string) => {
    const updatedSavedList = toggleSavedListItem(id, savedList, [beer as IBeer]);
    saveBeerList(updatedSavedList);
    setSavedList(updatedSavedList);
  }; 

  return (
    <Paper className={classes.root}>
      {!beer && (<div>Loading ... </div>)}
      {beer && (<div className={classes.cardContent}>
        <div>
          <Typography variant="subtitle2" component="span">
            <Checkbox 
                    checked={savedList.some((fav) => fav.id === id)}
                    onChange={() => handleToggleFavorite(id)} />
            id: {beer?.id}
          </Typography>
          <Typography variant="h1" component="h1" className={classes.title}>
            {beer?.name}
          </Typography>
          <Typography variant="h2" component="h2" className={classes.subtitle}>
            Type: {beer?.brewery_type}
          </Typography>
          <Typography className={classes.subheading}>Website:</Typography>
          <Typography variant="body2" component="p">
            { beer?.website_url 
              ? (<a href={beer?.website_url} target='_blank' rel="noreferrer">{beer?.website_url}</a>)
              : ('No website available')
            }
          </Typography>
          <Typography className={classes.subheading}>Phone:</Typography>
          <Typography variant="body2" component="p">
            { beer?.phone 
              ? (<a href="tel:{beer?.phone}">{beer?.phone}</a>)
              : ('No phone available')
            }
          </Typography>
          <Typography variant="h3" component="h3" className={classes.subheading}>Location:</Typography>
          <Typography variant="body2" component="p">
            {beer?.street}, {beer?.postal_code}
            <br/>{beer?.city}, {beer?.state}
            <br/>{beer?.country}
          </Typography>
          {beer?.latitude && beer?.longitude && (
            <div>
              {!isLoaded ? (
                  <h1>Map is Loading...</h1>
                ) : (
                  <GoogleMap
                    mapContainerClassName="map-container"
                    center={{ lat: beer?.latitude, lng: beer?.longitude }}
                    zoom={16}>
                    <MarkerF position={{ lat: beer?.latitude, lng: beer?.longitude }} />
                  </GoogleMap>
                )}
            </div>
          )}
        </div>
      </div>)}
    </Paper>
  );
};

export default Beer;
