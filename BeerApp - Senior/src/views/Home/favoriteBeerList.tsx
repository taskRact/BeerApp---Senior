/* eslint-disable max-lines-per-function */
import { Button, Link, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Favorite } from '../../components/Favorite/Favorite';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types';
import styles from '../../views/Home/Home.module.css';

export function FavoriteBeerList({ beerList }: { beerList: Beer[] }) {
  const [favoriteBeers, setFavoriteBeers] = useFavoriteBeers();
  const favoriteList = Object.entries(favoriteBeers).filter(([, beerName]) => !!beerName);

  const removeAllItems = () => setFavoriteBeers({});

  return (

    <Paper>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h3>Saved items</h3>
          <Button variant="contained" size="small" onClick={removeAllItems}>
            Remove all items
          </Button>
        </div>
        <ul className={styles.list}>
          {favoriteList.map(([id, name], index) => { // eslint-disable-line no-shadow
            const isFavorite = !!favoriteBeers[id!];
            const toggleFavorite = () => setFavoriteBeers({
              ...favoriteBeers,
              [id!]: isFavorite ? false : name
            });

            return (
              <li key={index.toString()}>
                <Favorite toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
                <Link component={RouterLink} to={`/beer/${id}`}>
                  {name}
                </Link>
              </li>
            );
          })}
          {!favoriteList.length && <p>No saved items</p>}
        </ul>
      </div>
    </Paper>
  );
}
