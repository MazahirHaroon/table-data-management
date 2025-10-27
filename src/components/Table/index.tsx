import { type TableIdKey } from '@typesData/characters';
import Header from './header';
import Row from './row';

interface TableProps<T extends { id: TableIdKey }> {
  caption: string;
  headers: Extract<keyof T, string>[];
  rows: T[];
}

export const Table = <T extends { id: TableIdKey }>({
  caption,
  headers,
  rows,
}: TableProps<T>) => (
  <table className='table-auto  border border-gray-400'>
    <caption className='text-2xl font-bold text-blue-500 mb-4'>
      {caption}
    </caption>
    <Header headers={headers} />
    <tbody>
      {rows.map((row) => (
        <Row key={row.id} headers={headers} row={row} />
      ))}
    </tbody>
  </table>
);
