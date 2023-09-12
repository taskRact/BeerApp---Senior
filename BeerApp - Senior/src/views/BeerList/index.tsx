import { useEffect, useState } from 'react';
import { ApiParams, Beer as IBeer, SORT } from '../../types';
import { fetchData, fetchMeta } from './utils';
import { Grid, Pagination, TextField, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
import Beer from './beer';

const debounce = (func: any, timeout = 500) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const BeerList = () => {
  const [beerList, setBeerList] = useState<Array<IBeer>>([]);
  const [paginationMeta, setPaginationMeta] = useState<ApiParams>({});
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchData.call(this, setBeerList, { page: value });
  };

  useEffect(() => {
    fetchData.bind(this, setBeerList)();
    fetchMeta.bind(this, setPaginationMeta)();
  }, []);

  const handleChangeByCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => fetchData.call(this, setBeerList, { by_country: event.target.value }))();
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    const sortValue = event.target.value as SORT;
    fetchData.call(this, setBeerList, { sort: sortValue })
  };


  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <Grid container spacing={2}>
            <Grid item container lg={12}>
              <Grid item lg={10}>
              <InputLabel id="demo-simple-select-label">filter:</InputLabel> <TextField
                  id="outlined-controlled"
                  label="Country"
                  name="by_country"
                  onChange={handleChangeByCountry}
                />
              </Grid>

              <Grid item lg={2}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sort"
                    onChange={handleChangeSort}
                  >
                    <MenuItem value="desc">desc</MenuItem>
                    <MenuItem value="asc">asc</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {beerList.length !== 0 && beerList.map((beer) => (
              <Grid item lg={3} key={beer.id} >

                <Beer beer={beer} />

              </Grid>
            ))}
            <Grid item lg={12}><Pagination count={paginationMeta?.total ?? 0} onChange={handleChange} /></Grid>
          </Grid>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
