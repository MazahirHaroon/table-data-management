import { type TableIdKey } from '@typesData/characters';

import Header from './header';
import Row from './row';
interface TableProps<T extends { id: TableIdKey }> {
  caption: string;
  hideCaption?: boolean;
  headers: Extract<keyof T, string>[];
  rows: T[];
  maxHeightClass?: string;
}

export const Table = <T extends { id: TableIdKey }>({
  caption,
  hideCaption = false,
  headers,
  rows,
  maxHeightClass = 'max-h-[60vh]',
}: TableProps<T>) => (
  <div
    className={`${maxHeightClass} overflow-y-scroll relative`}
    // added for testing
    // onScroll={(e) => {
    //   console.log(`Scrolled: ${e.currentTarget.scrollTop}`);
    // }}
  >
    <table className='table-auto border-2 border-table-border border-collapse'>
      <caption
        className={`text-secondary-heading text-text-color-subheading font-family-heading font-bold ${
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
  </div>
);
