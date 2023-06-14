import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';

import BeerList from '../../components/BeerList';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types';
import { fetchData } from './utils';

const BeerListView = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [favoriteBeers, setFavoriteBeers] = useFavoriteBeers();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>

          <Paper>
            <BeerList
              items={beerList}
              favoriteBeers={favoriteBeers}
              setFavoriteBeers={setFavoriteBeers}
            />
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default BeerListView;
