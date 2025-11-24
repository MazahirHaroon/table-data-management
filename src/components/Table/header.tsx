import { memo } from 'react';

import {
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  ArrowDownUp,
  X,
} from 'lucide-react';

import type { SortDirection } from '@typesData/table';

interface HeaderProps<T> {
  headers: (keyof T)[];
  enableSelect?: boolean;
  selectColumnLabel?: string;
  enableSort?: boolean;
  sortKeys?: (keyof T)[];
  sortState?: { column?: keyof T; direction: SortDirection };
  onToggleSort?: (column: keyof T) => void;
  onSetSort?: (column?: keyof T, direction?: SortDirection) => void;
  onClearSort?: () => void;
}

export const Header = <T,>({
  headers,
  enableSelect = false,
  selectColumnLabel = 'Select',
  enableSort = false,
  sortKeys,
  sortState,
  onToggleSort,
  onClearSort,
}: HeaderProps<T>) => {
  const renderSortControls = (header: keyof T) => {
    if (!enableSort || !sortKeys?.includes(header)) return null;
    const isActive = sortState?.column === header;
    const direction = isActive ? sortState?.direction : 'none';

    return (
      <div className='inline-flex items-center gap-1 ml-2'>
        <button
          type='button'
          onClick={() => onToggleSort?.(header)}
          className='text-xs leading-none'
        >
          {direction === 'asc' ? (
            <ArrowUpNarrowWide />
          ) : direction === 'desc' ? (
            <ArrowDownWideNarrow />
          ) : (
            <ArrowDownUp />
          )}
        </button>

        <button
          type='button'
          aria-label={`Clear sort`}
          onClick={(e) => {
            e.stopPropagation();
            onClearSort?.();
          }}
          className='text-[10px] leading-none ml-1'
        >
          <X />
        </button>
      </div>
    );
  };
  return (
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
            <div className='flex items-center'>
              <span className='flex-1'>{header as React.ReactNode}</span>
              {renderSortControls(header)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default memo(Header);
