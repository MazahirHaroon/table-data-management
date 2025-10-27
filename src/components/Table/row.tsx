import type { TableIdKey } from '@typesData/characters';

interface RowProps<T extends { id: TableIdKey }> {
  headers: (keyof T)[];
  row: T;
}

export const Row = <T extends { id: TableIdKey }>({
  headers,
  row,
}: RowProps<T>) => {
  return (
    <tr key={row.id}>
      {headers.map((key) => {
        const cell = row[key];
        return (
          <td
            key={String(key)}
            className='border border-gray-300 p-4 w-48 text-left truncate'
          >
            {cell as React.ReactNode}
          </td>
        );
      })}
    </tr>
  );
};

export default Row;
