import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Paper } from '@mui/material';
import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import { HeaderWithIcon } from '../../components/HeaderWithIcon';
import { Beer } from '../../types';

export function BeerMap({ beer }: { beer?: Beer }) {
  if (!beer || !beer.latitude) {
    return (<div />);
  }

  const latlang: LatLngTuple = [parseFloat(beer.latitude), parseFloat(beer.longitude)];

  return (
    <Paper>
      <Box padding={1}>
        <HeaderWithIcon icon={<LocationOnOutlinedIcon />} label="Location" />
      </Box>
      <MapContainer center={latlang} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={latlang}></Marker>
      </MapContainer>
    </Paper>
  );
}
