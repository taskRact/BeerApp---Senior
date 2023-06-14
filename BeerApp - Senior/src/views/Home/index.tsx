import BeerList from '../../components/BeerList';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { FavoriteBeerList } from './favoriteBeerList';
import { Welcome } from './welcome';

const Home = () => (
  <article>
    <section>
      <main>
        <Welcome />
        <FavoriteBeerList />
      </main>
    </section>
  </article>
);

export default Home;
