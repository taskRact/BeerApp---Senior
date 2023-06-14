import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Favorite } from '../Favorite/Favorite';

export interface BeerListProps {
  items: { id: string, name: string }[]
  showHeader?: boolean,
  favoriteBeers: Record<string, string| false>,
  setFavoriteBeers: ReturnType<typeof useFavoriteBeers>[1]
}

export default function BeerList({ items, showHeader = false, favoriteBeers, setFavoriteBeers }: BeerListProps) {
  const toggleFavorite = (id: string, name: string) => setFavoriteBeers({
    ...favoriteBeers,
    [id!]: favoriteBeers[id] ? false : name
  });
  const navigate = useNavigate();
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
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
          {items.map((item) => (
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
  );
}
