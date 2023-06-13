/* eslint-disable max-lines-per-function */
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import SegmentIcon from '@mui/icons-material/Segment';
import { Link, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import ListWithIcon, { ListWithIconProps } from '../../components/ListWithIcon';
import { Beer as IBeer } from '../../types';
import { BeerMap } from './map';
import { segments } from './segments';
import { fetchData } from './utils';

// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

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
          <Typography variant="h2" marginBottom={6}>{beer?.name}</Typography>
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
          <RouterLink to=".." relative="path">
            Back to the list
          </RouterLink>
        </footer>
      </section>
    </article>
  );
};

export default Beer;
