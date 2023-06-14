import SearchIcon from '@mui/icons-material/Search';
import { Backdrop, Box, Paper, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useMemo, useState } from 'react';

import BeerList from '../../components/BeerList';
import { useDebounce } from '../../hooks/useDebounce';
import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types';
import { fetchData, fetchMetadata, fetchSearchData } from './utils';

// eslint-disable-next-line max-lines-per-function
const BeerListView = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [favoriteBeers, setFavoriteBeers] = useFavoriteBeers();

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const onPageChange = (event: unknown, newPage: number) => setPage(newPage);
  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function fetchWithLoader() {
    setLoading(true);
    if (filterValue) {
      fetchSearchData((newBeerList) => {
        setBeerList(newBeerList);
        setLoading(false);
        setTotal(newBeerList.length);
      }, filterValue, {
        page,
        per_page: rowsPerPage // eslint-disable-line camelcase
      });
    } else {
      fetchData((newBeerList) => {
        setBeerList(newBeerList);
        setLoading(false);
      }, {
        page,
        per_page: rowsPerPage // eslint-disable-line camelcase
      });
    }
  }

  const [filterValue, setFilterValue] = useState('');
  const debouncedRequest = useDebounce(fetchWithLoader);

  useEffect(() => fetchMetadata(setTotal), []);
  useEffect(debouncedRequest, [filterValue, page, rowsPerPage, debouncedRequest]);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <Paper sx={{
            position: 'relative'
          }}>
            <Backdrop open={isLoading} sx={{
              position: 'absolute',
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}> <CircularProgress /></Backdrop>
            <Box padding={2} sx={{
              display: 'flex',
              alignItems: 'flex-end'
            }}>
              <SearchIcon />
              <TextField
                placeholder="Filter"
                variant="standard"
                onChange={(ev) => setFilterValue(ev.target.value)}
              />
            </Box>
            <BeerList
              items={beerList}
              favoriteBeers={favoriteBeers}
              showControls={true}
              setFavoriteBeers={setFavoriteBeers}
            />
            <TablePagination
              component="div"
              count={total}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default BeerListView;
