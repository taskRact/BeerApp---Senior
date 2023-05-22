import { useEffect, useState } from 'react';
import { ApiParams, Beer, TYPE } from '../../types';
import { fetchData } from './utils';
import { 
  Avatar, 
  Checkbox, 
  List, 
  TextField, 
  ListItemAvatar, 
  ListItemButton, 
  ListItemText, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Switch, 
  Grid, 
  Pagination
 } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import { getSavedBeerList, saveBeerList, toggleSavedListItem } from '../../api/localStorageApi/beerLocalStorage';


const breweryTypes =  [
  'ALL',
  'micro',
  'nano',
  'regional',
  'brewpub',
  'large',
  'planning',
  'bar',
  'contract',
  'proprietor',
  'closed'
]

const perPageOptions =  [
  '10',
  '20',
  '50',
  '100',
  '200'
]


const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState(breweryTypes[0]);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[0]);
  const [totalPages, setTotalPages] = useState(10);
  const [ savedOnly, setSavedOnly] = useState(false);

  const handleChangePage = (event:any, value:any) => {
    setPage(value);
  };

  const handleToggleFavorite = (id: string) => {
    const updatedSavedList = toggleSavedListItem(id, savedList, beerList);
    saveBeerList(updatedSavedList);
    setSavedList(updatedSavedList);
  };  

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  // eslint-disable-next-line
  useEffect(() => {
    const params = {
      per_page: perPage,
      page: page,
      sort: `type,name:${(sortAsc ? 'asc' : 'desc')}`,
      by_name: name
    } as ApiParams;
    if(type !== 'ALL') params.by_type = type as TYPE;

    fetchData(
      setBeerList, 
      setTotalPages, 
      params
    )
  }, [name, type, perPage, sortAsc, page, savedOnly]);

  useEffect(() => {
    setSavedList(getSavedBeerList())
    window.addEventListener('online', setSavedOnly.bind(this, false));
    if (navigator.onLine) {
      window.addEventListener('offline', () => {
        setSavedOnly(true);
        setBeerList(getSavedBeerList())
      });
    } else {
      setSavedOnly(true);
      setBeerList(getSavedBeerList())
      
    }
  }, []);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>

      <Grid container spacing={3} alignItems="center" justifyContent="space-around">
        {! savedOnly && (<>
        <Grid item xs={4}>
          <TextField
            label="Search by name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type">
              {breweryTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Per Page</InputLabel>
            <Select
              value={perPage}
              onChange={(e) => setPerPage(e.target.value)}
              label="Per Page">
                {perPageOptions.map((perPage) => (
                  <MenuItem key={perPage} value={perPage}>{perPage}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
        <FormControlLabel
          control={
            <Switch
              checked={sortAsc}
              onChange={(e) => setSortAsc(e.target.checked)}
              name="sort"
              color="primary"
            />
          }
          label="Sort Ascending"
        />
        </Grid>
        <Grid item xs={12} alignItems="center" justifyContent="space-around">
          <Pagination count={totalPages} page={page} onChange={handleChangePage} />
        </Grid>
        </>)}
        <Grid item xs={12}>
          <List>
            {beerList.map((beer) => (
              <ListItemButton key={beer.id} >
                <Checkbox 
                    checked={savedList.some((fav) => fav.id === beer.id)}
                    onChange={() => handleToggleFavorite(beer.id)} />
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} onClick={onBeerClick.bind(this, beer.id)} />
              </ListItemButton>
            ))}
          </List>
        </Grid>
        {! savedOnly && (<>
        <Grid item xs={12} alignItems="center" justifyContent="space-around">
          <Pagination count={totalPages} page={page} onChange={handleChangePage} />
        </Grid>
        </>)}
    </Grid>

          
        </main>
      </section>
    </article>
  );
};

export default BeerList;
