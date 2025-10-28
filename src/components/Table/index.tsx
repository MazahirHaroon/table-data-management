import { type TableIdKey } from '@typesData/characters';

import Header from './header';
import Row from './row';

interface TableProps<T extends { id: TableIdKey }> {
  caption: string;
  hideCaption?: boolean;
  headers: Extract<keyof T, string>[];
  rows: T[];
}

export const Table = <T extends { id: TableIdKey }>({
  caption,
  hideCaption = false,
  headers,
  rows,
}: TableProps<T>) => (
  <table className='table-auto border-2 border-table-border'>
    <caption
      className={`text-secondary-heading text-text-color-subheading font-family-heading font-bold  mb-4 ${
        hideCaption ? 'sr-only' : ''
      }`}
    >
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
