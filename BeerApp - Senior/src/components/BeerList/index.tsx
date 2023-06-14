import { Box, TableSortLabel } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types/beer';
import { Favorite } from '../Favorite/Favorite';

export interface BeerListProps {
  items: Beer[]
  showControls?: boolean,
  favoriteBeers: Record<string, string | false>,
  setFavoriteBeers: ReturnType<typeof useFavoriteBeers>[1]
}

// eslint-disable-next-line max-lines-per-function
export default function BeerList({ items, showControls = false, favoriteBeers, setFavoriteBeers }: BeerListProps) {
  const toggleFavorite = (id: string, name: string) => setFavoriteBeers({
    ...favoriteBeers,
    [id!]: favoriteBeers[id] ? false : name
  });
  const navigate = useNavigate();
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <Box>
      <TableContainer sx={{
        maxHeight: 600
      }}>
        <Table stickyHeader>
          {showControls &&
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel>Is favorite</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Name</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Country</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Type</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
          }
          <TableBody
            sx={{
              td: {
                border: 0
              }
            }}>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Favorite
                    toggleFavorite={() => toggleFavorite(item.id, item.name)}
                    isFavorite={!!favoriteBeers[item.id]}
                  />
                </TableCell>
                <TableCell onClick={() => onBeerClick(item.id)}>{item.name}</TableCell>
                <TableCell onClick={() => onBeerClick(item.id)}>{item.country}</TableCell>
                <TableCell onClick={() => onBeerClick(item.id)}>{item.brewery_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
