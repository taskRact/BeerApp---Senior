/* eslint-disable max-lines-per-function */
// eslint-disable-next-line max-len
import { Button, Paper } from '@mui/material';

import BeerList from '../../components/BeerList';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types';
import styles from './favoriteBeerList.module.css';

export function FavoriteBeerList() {
  const [favoriteBeers, setFavoriteBeers] = useFavoriteBeers();

  const removeAllItems = () => setFavoriteBeers({});
  const favoriteList = Object.entries(favoriteBeers)
    .filter(([, beerName]) => beerName !== false)
    .map(([id, name]) => ({
      id,
      name
    })) as Beer[];

  return (

    <Paper>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h3>Favorite beers</h3>
          <Button variant="contained" size="small" onClick={removeAllItems}>
            Remove all items
          </Button>
        </div>
        <BeerList
          items={favoriteList}
          favoriteBeers={favoriteBeers}
          setFavoriteBeers={setFavoriteBeers}
        />
      </div>
    </Paper>
  );
}
