import { useEffect, useMemo, useState } from 'react';

export type UseSearchProps<T> = {
  rows: T[];
  searchKeys: (keyof T)[];
  delay?: number;
};

export function useSearch<T>({
  rows,
  searchKeys,
  delay = 200,
}: UseSearchProps<T>) {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, delay);
    return () => clearTimeout(id);
  }, [query, delay]);

  const filteredRows = useMemo(() => {
    if (!debouncedQuery) return rows;

    return rows.filter((eachRow) =>
      searchKeys.some((value) => {
        const data = eachRow[value];
        return String(data ?? '')
          .toLowerCase()
          .includes(debouncedQuery);
      })
    );
  }, [rows, debouncedQuery, searchKeys]);

  return {
    query,
    setQuery,
    filteredRows,
  };
}
