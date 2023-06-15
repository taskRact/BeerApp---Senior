/* eslint-disable max-lines-per-function */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Favorite } from '../../components/Favorite/Favorite';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer as IBeer } from '../../types';
import { BeerDetails } from './beerDetails';
import { GoodToKnow } from './goodToKnow';
import { BeerMap } from './map';
import { fetchData } from './utils';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const [favoriteBeers, , toggleFavorite] = useFavoriteBeers();

  const isFavorite = !!favoriteBeers[id!];
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData.bind(null, setBeer, id), [id]);

  return (
    <article>
      <section>
        <header>
          <Typography variant="h2" marginBottom={6}>
            {beer?.name}
            <Favorite toggleFavorite={() => toggleFavorite(beer!.id, beer!.name)} isFavorite={isFavorite} />
          </Typography>
        </header>
        <main>
          <Grid container marginBottom={5} spacing={2}>
            <Grid md={6} xs={12}>
              <BeerDetails beer={beer} />
              <GoodToKnow type={beer?.brewery_type} />
              <Box marginTop={5}>
                <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate('/beer')}>
                  Go to the beer list
                </Button>
              </Box>
            </Grid>
            <Grid md={6} xs={12} >
              <BeerMap beer={beer} />
            </Grid>
          </Grid>
        </main>
      </section>
    </article>
  );
};

export default Beer;
