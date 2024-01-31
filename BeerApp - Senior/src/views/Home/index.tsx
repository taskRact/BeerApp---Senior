import { useEffect, useState } from 'react';
import { fetchData, fetchFavouriteData, searchBreweries } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link, Stack, Alert, CircularProgress, Box } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
    const [beerList, setBeerList] = useState<Array<Beer>>([]);
    const [savedList, setSavedList] = useState<Array<Beer>>([]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // eslint-disable-next-line
    useEffect(() => {
        setLoading(true); // Set loading to true when starting to fetch data
        fetchData(setBeerList)
            .finally(() => setLoading(false)); // Set loading to false when data is fetched (success or error)
    }, []);

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

    const refreshList = () => {
        setLoading(true); // Set loading to true when starting to fetch data
        fetchData(setBeerList)
            .finally(() => setLoading(false)); // Set loading to false when data is fetched (success or error)
    };

    const handleSearchBreweries = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        searchBreweries(setBeerList, search);
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
                                <TextField onChange={handleSearchBreweries} label='Filter...' variant='outlined' />
                                <Button variant='contained' onClick={refreshList}>Reload list</Button>
                            </div>
                            <ul className={styles.list}>
                                {loading ? (
                                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    beerList.map((beer, index) => (
                                        <li key={index.toString()}>
                                            <Checkbox />
                                            <Link component={RouterLink} to={`/beer/${beer.id}`}>
                                                {beer.name}
                                            </Link>
                                        </li>
                                    ))
                                )}
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
