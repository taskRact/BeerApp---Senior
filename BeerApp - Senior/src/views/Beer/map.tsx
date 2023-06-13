import { Typography } from '@mui/material';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import { Beer } from '../../types';

function LocationMap({ latlang }: { latlang: [number, number] }) {
  return (
    <MapContainer center={latlang} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latlang}></Marker>
    </MapContainer>
  );
}

export function BeerMap({ beer }: { beer?: Beer }) {
  if (!beer || !beer.latitude) {
    return (
      <div/>

    // <Typography variant="body1">No location provided</Typography>
    );
  }

  return <LocationMap latlang={[parseFloat(beer.latitude), parseFloat(beer.longitude)]} />;
}
