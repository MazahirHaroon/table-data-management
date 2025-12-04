import React, { memo } from 'react';

import type { TableIdKey } from '@typesData/table';

import { CheckBox } from '@custom-ui';

interface RowProps<T extends { id: TableIdKey }> {
  headers: (string | number | symbol)[];
  row: T;
  itemHeight: number;
  enableSelect?: boolean;
  selected?: boolean;
  toggleSelection: (id: TableIdKey) => void;
}

export const Row = <T extends { id: TableIdKey }>({
  headers,
  row,
  itemHeight,
  enableSelect = false,
  selected = false,
  toggleSelection,
}: RowProps<T>) => {
  return (
    <tr
      role='row'
      tabIndex={0}
      aria-selected={selected ? 'true' : 'false'}
      style={{ height: itemHeight }}
      className='hover:bg-gray-50 focus:outline-none'
    >
      {enableSelect && (
        <td
          role='cell'
          className='border-2 border-table-border p-4 w-12 text-center'
        >
          <CheckBox
            name={`select-row-${String(row.id)}`}
            label={`Select row ${String(row.id)}`}
            hideLabel={true}
            checked={selected}
            onChange={() => toggleSelection(row.id)}
            aria-checked={selected}
            className='justify-center'
          />
        </td>
      )}

      {headers.map((key, idx) => {
        const cell = row[key as keyof T];

        if (idx === 0) {
          return (
            <th
              key={String(key)}
              scope='row'
              className='border-2 font-family-body text-text-color-subheading border-table-border p-4 w-48 text-left truncate'
            >
              {cell as React.ReactNode}
            </th>
          );
        }

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
