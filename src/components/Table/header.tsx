import { memo } from 'react';

interface HeaderProps {
  headers: (string | number | symbol)[];
  selectLabel?: string;
}

export const Header = ({ headers, selectLabel }: HeaderProps) => (
  <thead className='sticky top-0'>
    <tr>
      {typeof selectLabel !== 'undefined' && (
        <th className='border-2 border-table-border font-family-body text-text-color-subheading bg-primary-light p-4 w-2 text-center'>
          {selectLabel}
        </th>
      )}
      {headers.map((header) => (
        <th
          key={String(header)}
          className='border-2 border-table-border font-family-body text-text-color-subheading bg-primary-light p-4 w-48 text-left capitalize'
        >
          {header as React.ReactNode}
        </th>
      ))}
    </tr>
  </thead>
);

export default memo(Header);
