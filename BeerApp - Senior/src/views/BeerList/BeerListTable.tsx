/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
import { Box, TableSortLabel } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Beer } from '../../types';

export type Order = 'asc' | 'desc' | 'none';

export type SortFields = keyof Beer;

interface Columns {
  id: SortFields,
  label: string
}

const columns: Columns[] = [
  {
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

interface Props {
  total: number
  page: number
  rowsPerPage: number
  setPage: (page: number) => void
  setRowsPerPage: (page: number) => void

  items: Beer[]
  order: Order
  orderBy: SortFields

  setSort: (id: SortFields) => void
}

export default function BeerListTable(props: Props) {
  const {
    items,
    setPage,
    setRowsPerPage,
    order,
    orderBy,
    page,
    rowsPerPage,
    setSort,
    total
  } = props;

  const navigate = useNavigate();

  return (
    <Box>
      <TableContainer sx={{
        maxHeight: 600
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(({ id, label }) => (
                <TableCell key={id}>
                  <TableSortLabel
                    active={orderBy === id && order !== 'none'}
                    // eslint-disable-next-line no-nested-ternary, no-undefined
                    direction={orderBy === id ? order === 'none' ? undefined : order : 'asc'}
                    onClick={() => setSort(id)}
                  >{label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              td: {
                border: 0
              }
            }}>
            {items.map((item) => (
              <TableRow key={item.id} onClick={() => navigate(`/beer/${item.id}`)}>
                {columns.map(({ id }) => <TableCell>{item[id]}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(event: unknown, newPage: number) => setPage(newPage)}
        onRowsPerPageChange={(ev: ChangeEvent<HTMLInputElement>) => setRowsPerPage(parseInt(ev.target.value, 10))}
      />
    </Box>
  );
}
