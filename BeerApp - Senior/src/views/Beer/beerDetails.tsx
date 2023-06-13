/* eslint-disable max-lines-per-function */
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import SegmentIcon from '@mui/icons-material/Segment';
import { Link, Tooltip, Typography } from '@mui/material';

import ListWithIcon, { ListWithIconProps } from '../../components/ListWithIcon';
import { Beer as IBeer } from '../../types';
import { segments } from './segments';

export function BeerDetails({ beer }: { beer?: IBeer }) {
  const items: ListWithIconProps['items'] = [
    {
      icon: <SegmentIcon color="secondary" />,
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
      icon: <LinkIcon color="secondary" />,
      title: 'Website',
      children: beer?.website_url && <Link noWrap href={beer.website_url}>{beer.website_url}</Link>
    },
    {
      icon: <PhoneRoundedIcon color="secondary" />,
      title: 'Phone',
      children: beer?.phone && <Link href={`tel:${beer.phone}`}>{beer.phone}</Link>
    },
    {
      icon: <BusinessIcon color="secondary" />,
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

  return <ListWithIcon items={items} />;
}
