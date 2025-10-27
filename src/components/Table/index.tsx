import { type TableIdKey } from '@typesData/characters';

interface TableProps<T extends { id: TableIdKey }> {
  headers: string[];
  rows: T[];
}

export const Table = <T extends { id: TableIdKey }>({
  headers,
  rows,
}: TableProps<T>) => (
  <table className='table-auto  border border-gray-400'>
    <caption className='text-2xl font-bold text-blue-500 mb-4'>
      Character's Data
    </caption>
    <thead>
      <tr>
        {headers.map((header) => (
          <th className='border border-gray-300 p-4 w-48 text-left capitalize'>
            {header as React.ReactNode}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
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
      ))}
    </tbody>
  </table>
);
