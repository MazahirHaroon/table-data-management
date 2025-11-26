import { useMemo, useCallback, useState } from 'react';
import type { FilterOption } from '@typesData/table';

export type UseFilterProps<T> = {
  rows: T[];
  options?: Partial<Record<keyof T, FilterOption[]>>;
};

export const useFilter = <T>({ rows, options = {} }: UseFilterProps<T>) => {
  const [active, setActive] = useState<Partial<Record<keyof T, unknown[]>>>({});

  const toggleValue = useCallback((column: keyof T, value: unknown) => {
    setActive((prev) => {
      const currentColumn = (prev && prev[column]) ?? [];
      const index = currentColumn.findIndex(
        (columnValue) => columnValue === value
      );
      const activeStateCopy = { ...prev };

      if (index >= 0) {
        const currentColumnCopy = [...currentColumn];
        currentColumnCopy.splice(index, 1);

        if (currentColumnCopy.length === 0) {
          delete activeStateCopy[column];
        } else {
          activeStateCopy[column] = currentColumnCopy;
        }
      } else {
        activeStateCopy[column] = [...currentColumn, value];
      }

      return activeStateCopy;
    });
  }, []);

  const clearColumn = useCallback((column?: keyof T) => {
    setActive((prev) => {
      if (typeof column === 'undefined') return {};
      const activeStateCopy = { ...prev };
      delete activeStateCopy[column];
      return activeStateCopy;
    });
  }, []);

  const getOptions = useCallback(
    (column: keyof T) => {
      return options[column] ?? [];
    },
    [options]
  );

  const filteredRows: T[] = useMemo(() => {
    const activeColumnNames = Object.keys(active) as (keyof T)[];

    if (!activeColumnNames.length) return rows;

    return rows.filter((row) =>
      activeColumnNames.every((column) => {
        const selectedFilters = active[column] ?? [];
        const columnValue = row[column];
        return selectedFilters.some(
          (filterValue) => filterValue === columnValue
        );
      })
    );
  }, [rows, active]);

  return {
    filteredRows,
    activeFilters: active,
    toggleValue,
    clearColumn,
    getOptions,
  };
};
