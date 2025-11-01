import { useContext, memo } from 'react';

import type { TableIdKey } from '@typesData/table';
import { TableFeatureContext } from '@context/tableFeatureContext';

import { CheckBox } from '@custom-ui';

interface RowProps<T extends { id: TableIdKey }> {
  headers: (string | number | symbol)[];
  row: T;
  itemHeight: number;
}

export const Row = <T extends { id: TableIdKey }>({
  headers,
  row,
  itemHeight,
}: RowProps<T>) => {
  const { selectedIds, toggleSelection } = useContext(TableFeatureContext);

  const selected = selectedIds ? selectedIds.has(row.id) : undefined;
  const showCheckbox =
    typeof selected !== 'undefined' && typeof toggleSelection === 'function';

  return (
    <tr key={row.id} style={{ height: itemHeight }}>
      {showCheckbox && (
        <td className='border-2 border-table-border p-4 w-12 text-center'>
          <CheckBox
            name={`select-row-${row.id}`}
            label='Select character details row'
            hideLabel={true}
            checked={selected}
            onChange={() => toggleSelection(row.id)}
          />
        </td>
      )}

      {headers.map((key) => {
        const cell = row[key as keyof T];
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
};

export default memo(Row);
