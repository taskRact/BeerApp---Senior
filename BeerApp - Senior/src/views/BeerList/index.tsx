/* eslint-disable max-lines-per-function */
import SportsBar from '@mui/icons-material/SportsBar';
// eslint-disable-next-line max-len
import { Avatar, Button, Checkbox, Link, List, ListItemAvatar, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Beer } from '../../types';
import { fetchData } from './utils';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <List>
            {beerList.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(null, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
          <Paper>
            <div>
              <div>
                <TextField label="Filter..." variant="outlined" />
                <Button variant="contained" onClick={fetchData.bind(null, setBeerList)}>Reload list</Button>
              </div>
              <ul>
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
        </main>
      </section>
    </article>
  );
};

export default BeerList;
