import { useEffect, useState } from 'react';

import { Beer } from '../../types';
import { FavoriteBeerList } from './favoriteBeerList';
import { fetchData } from './utils';
import { Welcome } from './welcome';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  return (
    <article>
      <section>
        <main>
          <Welcome/>
          <FavoriteBeerList beerList={beerList} />
        </main>
      </section>
    </article>
  );
};

export default Home;
