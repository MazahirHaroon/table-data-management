import { memo } from 'react';

interface HeaderProps {
  headers: (string | number | symbol)[];
  enableSelect?: boolean;
  selectColumnLabel?: string;
}

export const Header = ({
  headers,
  enableSelect = false,
  selectColumnLabel = 'Select',
}: HeaderProps) => (
  <thead className='sticky top-0'>
    <tr>
      {enableSelect && (
        <th className='border-2 border-table-border font-family-body text-text-color-subheading bg-primary-light p-4 w-2 text-center'>
          {selectColumnLabel}
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
