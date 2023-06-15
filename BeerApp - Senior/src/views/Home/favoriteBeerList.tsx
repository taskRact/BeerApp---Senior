import { Box, Button, List, ListItem, Paper, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';

import { Favorite } from '../../components/Favorite/Favorite';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types';

export interface BeerListProps {
  items: Beer[]
}

export function FavoriteBeerList() {
  const [favoriteBeers, setFavoriteBeers, toggleFavorite] = useFavoriteBeers();
  const navigate = useNavigate();
  const favoriteList = Object.entries(favoriteBeers)
    .filter(([, beerName]) => beerName !== false)
    .map(([id, name]) => ({
      id,
      name
    })) as Beer[];

  return (

    <Paper>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }} padding={2}>
        <Typography variant="h6" component="h4">Saved breweries</Typography>
        <Button variant="contained" size="small" onClick={() => setFavoriteBeers({})}>
            Remove all items
        </Button>
      </Box>
      <List>
        {favoriteList.map(({ id, name }) => (
          <ListItem key={id} >
            <ListItemIcon>
              <Favorite toggleFavorite={() => toggleFavorite(id, name)} isFavorite={!!favoriteBeers[id]} />
            </ListItemIcon>
            <ListItemButton onClick={() => navigate(`/beer/${id}`)}>{name}</ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

