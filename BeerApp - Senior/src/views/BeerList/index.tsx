import { useMemo, useState } from 'react';

import { Beer } from '../../types';
import BeerListTable, { type Order, type SortFields } from './BeerListTable';

const nextOrder = {
  asc: 'desc',
  desc: 'none',
  none: 'asc'
} as Record<Order, Order>;

function sortItems(items: Beer[], order: Order, orderBy: SortFields) {
  if (order === 'none') {
    return items;
  }

  const orderNumber = order === 'asc' ? 1 : -1;

  // eslint-disable-next-line no-undefined
  if (orderBy === undefined) {
    return items;
  }

  const comparator = (a: Beer, b: Beer) => {
    const valA = a[orderBy]!;
    const valB = b[orderBy]!;
    const result = valA.localeCompare(valB);

    return result * orderNumber;
  };

  return [...items].sort(comparator);
}

export default function BeerListView() {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState<Array<Beer>>([]);
  const [order, setOrder] = useState<Order>('none');
  const [orderBy, setOrderBy] = useState<SortFields>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const setSort = (id: SortFields) => {
    const newOrder: Order = orderBy === id ? nextOrder[order] : 'asc';

    setOrderBy(id);
    setOrder(newOrder);
  };

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const sortedItems = useMemo(() => sortItems(items, order, orderBy), [items, order, orderBy]);

  return (
    <BeerListTable
      items={sortedItems}
      setPage={setPage}
      setRowsPerPage={onRowsPerPageChange}
      order={order}
      orderBy={orderBy}
      page={page}
      rowsPerPage={rowsPerPage}
      setSort={setSort}
      total={total}
    />
  );
}
