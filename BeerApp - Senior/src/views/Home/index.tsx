import { useEffect, useState } from 'react';
import { fetchData, fetchFavouriteData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link, Stack, Alert } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const [isError, setIsError] = useState<boolean>(false);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  useEffect(() => {
    fetchFavouriteData(setSavedList);
  }, []);

  const removeItems = () => {
    if (!selectedItems.length) {
        setIsError(true);
    } else {
        setIsError(false);
        if (savedList.length) {
            const filteredItemsIds = savedList.filter((item) => !selectedItems.includes(item.id));
            localStorage.setItem('favouriteList', JSON.stringify(filteredItemsIds.map((item) => item.id)));
            setSavedList(filteredItemsIds);
        }
    }
  }

  const selectedItem = (id: string) => {
    if (selectedItems.includes(id)) {
        const filteredItemsIds = selectedItems.filter((item) => item !== id);
        setSelectedItems(filteredItemsIds);
    } else {
        setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label='Filter...' variant='outlined' />
                <Button variant='contained'>Reload list</Button>
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
          
          <Paper>
            {isError &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">Can't remove. Please select any item</Alert>
                </Stack>
            }
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={removeItems}>
                  {selectedItems.length === savedList.length || selectedItems.length === 0 ? 'Remove all items' : 'Remove selected items'}
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox onClick={selectedItem.bind(this, beer.id)} />
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
