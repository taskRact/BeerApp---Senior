import { useEffect, useState } from 'react';
import { fetchData, searchBreweries } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';
import { getSavedBeerList, saveBeerList, toggleSavedListItem } from '../../api/localStorageApi/beerLocalStorage';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [search, setSearch] = useState('');

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);
  useEffect(() => {
    setSavedList(getSavedBeerList())
  }, []);

  const refreshList = () => {
    fetchData(setBeerList);
  };


  const handleToggleFavorite = (id: string) => {
    const updatedSavedList = toggleSavedListItem(id, savedList, beerList);
    saveBeerList(updatedSavedList);
    setSavedList(updatedSavedList);
  };  

  const handleSearchBreweries = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    searchBreweries(setBeerList, search);
  }

  const handleClearFavorits = () => {
    saveBeerList([]);
    setSavedList([]);
  }

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField onChange={handleSearchBreweries} label='Filter...' variant='outlined' />
                <Button onClick={refreshList} variant='contained'>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={beer.id}>
                    <Checkbox
                    checked={savedList.some((fav) => fav.id === beer.id)}
                    onChange={() => handleToggleFavorite(beer.id)} />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button
                onClick={handleClearFavorits}
                 variant='contained' size='small'>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={beer.id}>
                    <Checkbox 
                    checked={true}
                    onChange={() => handleToggleFavorite(beer.id)}/>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
