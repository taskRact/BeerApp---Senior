/* eslint-disable max-lines-per-function */
import BusinessIcon from '@mui/icons-material/Business';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LinkIcon from '@mui/icons-material/Link';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import SegmentIcon from '@mui/icons-material/Segment';
import { Link, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import ListWithIcon, { ListWithIconProps } from '../../components/ListWithIcon';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer as IBeer } from '../../types';
import { BeerMap } from './map';
import { segments } from './segments';
import { fetchData } from './utils';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const [favoriteBeers, setFavoriteBeers] = useFavoriteBeers();

  const isFavorite = !!favoriteBeers[id!];
  const navigate = useNavigate();
  const toggleFavorite = () => setFavoriteBeers({
    ...favoriteBeers,
    [id!]: !isFavorite
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData.bind(null, setBeer, id), [id]);

  const items: ListWithIconProps['items'] = [
    {
      icon: <SegmentIcon />,
      title: 'Type',
      children:

        <Tooltip title={segments[beer?.brewery_type ?? 'planning']}>
          <div>
            <Typography variant="body1">{beer?.brewery_type}</Typography>
            {/* <HelpOutlineIcon /> */}
          </div>
        </Tooltip>
    },
    {
      icon: <LinkIcon />,
      title: 'Website',
      children: beer?.website_url && <Link noWrap href={beer.website_url}>{beer.website_url}</Link>
    },
    {
      icon: <PhoneRoundedIcon />,
      title: 'Phone',
      children: beer?.phone && <Link href={`tel:${beer.phone}`}>{beer.phone}</Link>
    },
    {
      icon: <BusinessIcon />,
      title: 'Address',
      children: <>
        <Typography variant="body1">
          {beer?.street}
        </Typography>
        <Typography variant="body1">
          {beer?.postal_code}, {beer?.city}, {beer?.state || beer?.state_province}
        </Typography>
        <Typography variant="body1">
          {beer?.country}
        </Typography>
      </>
    }
  ];

  return (
    <article>
      <section>
        <header>
          <Typography variant="h2" marginBottom={6}>
            {beer?.name}
            <IconButton size="large" onClick={toggleFavorite}>
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Typography>
        </header>
        <main>
          <Grid container>
            <Grid md={6} xs={12}>
              <ListWithIcon items={items} />
            </Grid>
            <Grid md={6} xs={12} >
              <BeerMap beer={beer} />
            </Grid>
          </Grid>
        </main>
        <footer>
          <button onClick={() => navigate(-1)}>Go back</button>
        </footer>
      </section>
    </article>
  );
};

export default Beer;
