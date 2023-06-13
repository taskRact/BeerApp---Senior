/* eslint-disable max-lines-per-function */
import { Button, Checkbox, Link, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { FavoriteBeerList } from '../../components/FavoriteBeerList';
import { Beer } from '../../types';
import styles from './Home.module.css';
import { fetchData } from './utils';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label="Filter..." variant="outlined" />
                <Button variant="contained" onClick={fetchData.bind(null, setBeerList)}>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>
          <FavoriteBeerList beerList={beerList} />
        </main>
      </section>
    </article>
  );
};

export default Home;
