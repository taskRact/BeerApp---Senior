/* eslint-disable no-magic-numbers */
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Favorite } from '../../components/Favorite/Favorite';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types/beer';

export interface BeerListProps {
  items: Beer[]
}

export default function SelectedListItem({ items }: BeerListProps) {
  const navigate = useNavigate();
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);
  const [favoriteBeers, setFavoriteBeers] = useFavoriteBeers();
  const toggleFavorite = (id: string, name: string) => setFavoriteBeers({
    ...favoriteBeers,
    [id!]: favoriteBeers[id] ? false : name
  });

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper'
    }}>
      <List>
        {items.map(({ id, name }) => (
          <ListItemButton onClick={() => onBeerClick(id)} >
            <ListItemIcon>
              <Favorite toggleFavorite={() => toggleFavorite(id, name)} isFavorite={!!favoriteBeers[id]} />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        ))}

      </List>
    </Box>
  );
}
