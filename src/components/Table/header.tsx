import { useContext, memo } from 'react';

import { TableFeatureContext } from '@context/tableFeatureContext';

interface HeaderProps {
  headers: (string | number | symbol)[];
}

export const Header = ({ headers }: HeaderProps) => {
  const { selectLabel, toggleSelection } = useContext(TableFeatureContext);

  const showSelect =
    typeof selectLabel !== 'undefined' || typeof toggleSelection === 'function';

  return (
    <thead className='sticky top-0'>
      <tr>
        {showSelect && (
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
};

export default memo(Header);
