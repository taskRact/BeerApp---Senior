import { Button, Checkbox, Link, Paper, TextField } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types';
import styles from '../../views/Home/Home.module.css';

export function FavoriteBeerList({ beerList }: { beerList: Beer[] }) {
  const [favoriteBeers, setFavoriteBeers] = useFavoriteBeers();
  const favoriteList = beerList.filter((beer) => favoriteBeers[beer.id]);

  const removeAll = () => setFavoriteBeers({});

  return (

    <Paper>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h3>Saved items</h3>
          <Button variant="contained" size="small" onClick={removeAll}>
            Remove all items
          </Button>
        </div>
        <ul className={styles.list}>
          {favoriteList.map((beer, index) => (
            <li key={index.toString()}>
              <Checkbox />
              <Link component={RouterLink} to={`/beer/${beer.id}`}>
                {beer.name}
              </Link>
            </li>
          ))}
          {!beerList.length && <p>Loading items</p>}
          {!favoriteList.length && <p>No saved items</p>}
        </ul>
      </div>
    </Paper>
  );
}
