import { Box, TableSortLabel } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type FavoriteBeers, useFavoriteBeers } from '../../hooks/useFavoriteBeers';
import { Beer } from '../../types/beer';
import { Favorite } from '../Favorite/Favorite';

export interface BeerListProps {
  items: Beer[]
  showControls?: boolean,
  favoriteBeers: FavoriteBeers,
  setFavoriteBeers: ReturnType<typeof useFavoriteBeers>[1]
}

type Order = 'asc' | 'desc' | 'none';
type SortFields = keyof Beer | 'favorite' | undefined;

export interface BeerListHeader {
  id: SortFields,
  label: string
}

export interface BeerListHeaderProps {
  orderBy: string | undefined
  order: Order
  setSort: (id: SortFields) => void

  headers: BeerListHeader[]
}

const nextOrder = {
  asc: 'desc',
  desc: 'none',
  none: 'asc'
} as Record<Order, Order>;

const defaultHeaders: BeerListHeader[] = [
  {
    id: 'favorite',
    label: 'isFavorite'
  }, {
    id: 'name',
    label: 'Name'
  }, {
    id: 'country',
    label: 'Country'
  }, {
    id: 'brewery_type',
    label: 'Type'
  }
];

function sortItems(items: BeerListProps['items'], favoriteBeers: FavoriteBeers, order: Order, orderBy: SortFields) {
  if (order === 'none') {
    return items;
  }

  const orderNumber = order === 'asc' ? 1 : -1;

  let comparator;

  // eslint-disable-next-line no-undefined
  if (orderBy === undefined) {
    return items;
  }

  if (orderBy === 'favorite') {
    comparator = (a: Beer, b: Beer) => (Number(favoriteBeers[a.id]) - Number(favoriteBeers[b.id])) * orderNumber;
  } else {
    comparator = (a: Beer, b: Beer) => {
      const valA = a[orderBy]!;
      const valB = b[orderBy]!;
      const result = valA.localeCompare(valB);

      return result * orderNumber;
    };
  }

  return [...items].sort(comparator);
}

function BeerListHeader({ order, orderBy, headers, setSort }: BeerListHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {headers.map(({ id, label }) => (
          <TableCell>
            <TableSortLabel
              active={orderBy === id && order !== 'none'}
              direction={orderBy === id ? order === 'none' ? undefined : order : 'asc'} // eslint-disable-line no-nested-ternary, max-len, no-undefined
              onClick={() => setSort(id)}
            >{label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// eslint-disable-next-line max-lines-per-function
export default function BeerList({ items, showControls = false, favoriteBeers, setFavoriteBeers }: BeerListProps) {
  const toggleFavorite = (id: string, name: string) => setFavoriteBeers({
    ...favoriteBeers,
    [id!]: favoriteBeers[id] ? false : name
  });
  const navigate = useNavigate();
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);
  const [order, setOrder] = useState<Order>('none');
  const [orderBy, setOrderBy] = useState<SortFields>();

  function setSort(id: SortFields) {
    const newOrder: Order = orderBy === id ? nextOrder[order] : 'asc';

    setOrderBy(id);
    setOrder(newOrder);
  }

  const sortedItems = useMemo(() => sortItems(items, favoriteBeers, order, orderBy), [items, order, orderBy]);

  return (
    <Box>
      <TableContainer sx={{
        maxHeight: 600
      }}>
        <Table stickyHeader>
          {showControls && <BeerListHeader
            order={order}
            orderBy={orderBy}
            headers={defaultHeaders}
            setSort={setSort}
          />}
          <TableBody
            sx={{
              td: {
                border: 0
              }
            }}>
            {sortedItems.map((item) => (
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
