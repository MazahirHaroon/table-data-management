import React, { useState, memo } from 'react';

import {
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  ArrowDownUp,
  X,
} from 'lucide-react';

import type { SortDirection, FilterOption } from '@typesData/table';

import { FilterMenu } from './options';

interface HeaderProps<T> {
  headers: (keyof T)[];
  // select props
  enableSelect?: boolean;
  selectColumnLabel?: string;

  // sort props
  enableSort?: boolean;
  sortKeys?: (keyof T)[];
  sortState?: { column?: keyof T; direction: SortDirection };
  onToggleSort?: (column: keyof T) => void;
  onSetSort?: (column?: keyof T, direction?: SortDirection) => void;
  onClearSort?: () => void;

  // filter props
  enableFilter?: boolean;
  filterOptions?: Partial<Record<keyof T, FilterOption[]>>;
  activeFilters?: Partial<Record<keyof T, unknown[]>>;
  onToggleFilter?: (column: keyof T, value: unknown) => void;
  onClearFilter?: (column?: keyof T) => void;
  getFilterOptions?: (column: keyof T) => FilterOption[];
}

const Header = <T,>({
  headers,
  // select props
  enableSelect = false,
  selectColumnLabel = 'Select',
  // sort props
  enableSort = false,
  sortKeys,
  sortState,
  onToggleSort,
  onClearSort,
  // filter props
  enableFilter,
  filterOptions,
  activeFilters,
  onToggleFilter,
  onClearFilter,
  getFilterOptions,
}: HeaderProps<T>) => {
  const [openForColumn, setOpenForColumn] = useState<keyof T | undefined>(
    undefined
  );

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
          aria-label={
            direction === 'asc'
              ? `Sort ${String(header)} descending`
              : `Sort ${String(header)} ascending`
          }
        >
          {direction === 'asc' ? (
            <ArrowUpNarrowWide aria-hidden='true' />
          ) : direction === 'desc' ? (
            <ArrowDownWideNarrow aria-hidden='true' />
          ) : (
            <ArrowDownUp aria-hidden='true' />
          )}
        </button>

        <button
          type='button'
          aria-label={`Clear sort for ${String(header)}`}
          onClick={(e) => {
            e.stopPropagation();
            onClearSort?.();
          }}
          className='text-[10px] leading-none ml-1'
        >
          <X aria-hidden='true' />
        </button>
      </div>
    );
  };

  const renderFilter = (header: keyof T) => {
    if (!enableFilter) return null;
    const options = getFilterOptions
      ? getFilterOptions(header)
      : (filterOptions && filterOptions[header]) ?? [];

    if (!options || options.length === 0) return null;

    const selected = (activeFilters && activeFilters[header]) ?? [];
    return (
      <FilterMenu
        header={header}
        isOpen={openForColumn === header}
        setOpen={setOpenForColumn}
        options={options}
        selected={selected}
        onClearFilter={onClearFilter}
        onToggleFilter={onToggleFilter}
      />
    );
  };

  return (
    <thead className='sticky top-0'>
      <tr>
        {enableSelect && (
          <th
            scope='col'
            className='border-2 border-table-border font-family-body text-text-color-subheading bg-primary-light p-4 w-2 text-center'
          >
            {selectColumnLabel}
          </th>
        )}
        {headers.map((header) => {
          const isSorted = sortState?.column === header;
          const ariaSort =
            isSorted && sortState?.direction === 'asc'
              ? 'ascending'
              : isSorted && sortState?.direction === 'desc'
              ? 'descending'
              : 'none';

          return (
            <th
              key={String(header)}
              scope='col'
              aria-sort={ariaSort}
              className='border-2 border-table-border font-family-body text-text-color-subheading bg-primary-light p-4 w-48 text-left capitalize'
            >
              <div className='flex items-center'>
                <span className='flex-1'>{header as React.ReactNode}</span>
                {renderSortControls(header)}
                {renderFilter(header)}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const MemoHeader = memo(Header) as unknown as <T>(
  props: HeaderProps<T>
) => React.ReactElement;
export default MemoHeader;
