import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Favorite } from '../Favorite/Favorite';

export interface BeerListProps {
  items: { id: string, name: string }[]
  showHeader?: boolean,
  favoriteBeers: Record<string, string | false>,
  setFavoriteBeers: ReturnType<typeof useFavoriteBeers>[1]
}

// eslint-disable-next-line max-lines-per-function
export default function BeerList({ items, showHeader = false, favoriteBeers, setFavoriteBeers }: BeerListProps) {
  const toggleFavorite = (id: string, name: string) => setFavoriteBeers({
    ...favoriteBeers,
    [id!]: favoriteBeers[id] ? false : name
  });
  const navigate = useNavigate();
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const [page, setPage] = React.useState(0);
  // eslint-disable-next-line no-magic-numbers
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const onPageChange = (event: unknown, newPage: number) => setPage(newPage);
  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleItems = React.useMemo(() => items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
                                     [items, page, rowsPerPage]);

  return (
    <Box>
      <TableContainer>
        <Table>
          {showHeader &&
            <TableHead>
              <TableRow>
                <TableCell>Is favorite</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
          }
          <TableBody
            sx={{
              td: {
                border: 0
              }
            }}>
            {visibleItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Favorite
                    toggleFavorite={() => toggleFavorite(item.id, item.name)}
                    isFavorite={!!favoriteBeers[item.id]}
                  />
                </TableCell>
                <TableCell onClick={() => onBeerClick(item.id)}>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={items.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Box>
  );
}
