import { useMemo, useState, useCallback } from 'react';

import type { SortDirection } from '@typesData/table';

import { numericCompare, stringCompare } from 'src/utils/conditionalCheck';

export type UseSortProps<T> = {
  rows: T[];
  defaultSort?: {
    column?: keyof T;
    direction?: Exclude<SortDirection, 'none'>;
  };
  sortComparators?: Partial<{ [K in keyof T]: (a: T[K], b: T[K]) => number }>;
};

export function useSort<T>({
  rows,
  defaultSort,
  sortComparators = {},
}: UseSortProps<T>) {
  const [sortState, setSortState] = useState<{
    column?: keyof T;
    direction: SortDirection;
  }>({
    column: defaultSort?.column,
    direction: defaultSort?.column ? defaultSort?.direction ?? 'asc' : 'none',
  });

  const clearSort = useCallback(() => {
    setSortState({ column: undefined, direction: 'none' });
  }, []);

  const toggleSort = useCallback((column: keyof T) => {
    setSortState((prev) => {
      if (prev.column !== column) return { column, direction: 'asc' };
      return {
        column,
        direction: prev.direction === 'asc' ? 'desc' : 'asc',
      };
    });
  }, []);

  const sortedRows = useMemo(() => {
    if (sortState.direction === 'none' || !sortState.column) {
      return rows;
    }

    const col = sortState.column;
    const directionValue = sortState.direction === 'asc' ? 1 : -1;
    const comparator = sortComparators[col];

    const items = rows.map((rowValue, index) => ({ rowValue, index }));

    items.sort((a, b) => {
      const columnValueA = (a.rowValue as T)[col];
      const columnValueB = (b.rowValue as T)[col];

      if (comparator) {
        return comparator(columnValueA, columnValueB) * directionValue;
      }

      const numA = Number(columnValueA);
      const numB = Number(columnValueB);
      if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
        return numericCompare(numA, numB, directionValue, a.index, b.index);
      }

      return stringCompare(
        columnValueA,
        columnValueB,
        directionValue,
        a.index,
        b.index
      );
    });

    return items.map((item) => item.rowValue);
  }, [rows, sortState, sortComparators]);

  return {
    sortedRows,
    sortState,
    toggleSort,
    clearSort,
  };
}
