import type { TableIdKey } from '@typesData/characters';
import { memo } from 'react';

interface RowProps<T extends { id: TableIdKey }> {
  headers: (string | number | symbol)[];
  row: T;
  itemHeight: number;
}

export const Row = <T extends { id: TableIdKey }>({
  headers,
  row,
  itemHeight,
}: RowProps<T>) => (
  <tr key={row.id} style={{ height: itemHeight }}>
    {headers.map((key) => {
      const cell = row[key];
      return (
        <td
          key={String(key)}
          className='border-2 font-family-body text-text-color-subheading border-table-border p-4 w-48 text-left truncate'
        >
          {cell as React.ReactNode}
        </td>
      );
    })}
  </tr>
);

export default memo(Row);
