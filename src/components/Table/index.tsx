import React, { useState, useRef, useEffect, useCallback } from 'react';

import type {
  TableIdKey,
  TableFeatures,
  SelectConfig,
  SearchConfig,
  SortConfig,
  FilterConfig,
} from '@typesData/table';

import { FEATURE_SET } from 'src/constants/table';

import { useSearch, useSelection, useSort, useFilter } from '@hooks/Table';

import { PrimaryButton, Search } from '@custom-ui';

import Header from './header';
import Row from './row';

interface TableProps<T extends { id: TableIdKey }> {
  caption: string;
  hideCaption?: boolean;
  headers: (keyof T)[];
  rows: T[];

  // virtualization - scroll
  maxHeightClass?: string;
  itemHeight?: number;
  overscan?: number;
  scrollToTopSignal?: number;

  // features
  features?: TableFeatures[];
  selectConfig?: SelectConfig;
  searchConfig?: SearchConfig<T>;
  sortConfig?: SortConfig<T>;
  filterConfig?: FilterConfig<T>;
}

export const Table = <T extends { id: TableIdKey }>({
  caption,
  hideCaption = false,
  headers,
  rows,

  // virtualization - scroll
  maxHeightClass = 'max-h-[585px]',
  itemHeight = 58,
  overscan = 5,
  scrollToTopSignal,

  // features
  features = [],
  selectConfig,
  searchConfig,
  sortConfig,
  filterConfig,
}: TableProps<T>) => {
  const {
    columnLabel: SelectColumnLabel,
    buttonLabel: SelectButtonLabel,
    onAction: SelectAction,
  } = selectConfig ?? {};

  const {
    searchKeys,
    placeholder,
    delay,
    width: SearchBarWidth,
  } = searchConfig ?? {};
  const { sortKeys, defaultSort, sortComparators } = sortConfig ?? {};
  const { options: filterOptions } = filterConfig ?? {};

  const {
    hasId: hasSelectedId,
    toggle: toggleSelection,
    handleSelect,
  } = useSelection({
    onAction: SelectAction,
  });

  const {
    query,
    setQuery,
    filteredRows: searchedRows,
  } = useSearch({
    rows,
    searchKeys: searchKeys ?? headers,
    delay,
  });

  const {
    filteredRows: afterFilterRows,
    activeFilters,
    toggleValue: onToggleFilter,
    clearColumn: onClearFilter,
    getOptions: getFilterOptions,
  } = useFilter<T>({
    rows: searchedRows,
    options: filterOptions ?? {},
  });

  const {
    sortedRows: finalRows,
    sortState,
    toggleSort,
    clearSort,
  } = useSort<T>({
    rows: afterFilterRows,
    defaultSort,
    sortComparators,
  });

  const enableSelect = features.includes(FEATURE_SET.SELECT_AND_ACTION);
  const enableSearch = features.includes(FEATURE_SET.SEARCH);
  const enableSort = features.includes(FEATURE_SET.SORT);
  const enableFilter = features.includes(FEATURE_SET.FILTER);

  const totalRows = finalRows.length;
  const totalHeight = totalRows * itemHeight;

  const [scrollTop, setScrollTop] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tickingRef = useRef<boolean>(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setContainerHeight(el.clientHeight || 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = containerHeight
    ? Math.ceil(containerHeight / itemHeight) + overscan * 2
    : 0;
  const endIndex = Math.min(totalRows - 1, startIndex + visibleCount - 1);
  const displayRows = finalRows.slice(startIndex, endIndex + 1);

  const topSpacerHeight = startIndex * itemHeight;
  const bottomSpacerHeight = Math.max(
    0,
    totalHeight - topSpacerHeight - displayRows.length * itemHeight
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const top = (e.target as HTMLDivElement).scrollTop;
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      setScrollTop(top);
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    if (scrollTop > totalHeight - containerHeight) {
      setScrollTop(Math.max(0, totalHeight - containerHeight));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalRows, containerHeight]);

  useEffect(() => {
    if (typeof scrollToTopSignal === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    el.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setScrollTop(0);
  }, [scrollToTopSignal]);

  const liveStatus = query
    ? `Showing ${finalRows.length} results for '${query}'.`
    : `Showing ${finalRows.length} rows.`;
  const visibleRange = `Visible rows ${startIndex + 1} to ${Math.min(
    endIndex + 1,
    totalRows
  )} of ${totalRows}.`;

  return (
    <div className='flex flex-col'>
      <div
        className={`flex ${
          features.length > 1 ? 'justify-between' : 'justify-end'
        } items-center w-full p-2 border-2 border-table-border`}
      >
        {enableSearch ? (
          <div className='m-2'>
            <Search
              id={`${caption}-table-search-input`}
              name={`${caption}-table-search-input`}
              query={query}
              setQuery={setQuery}
              placeholder={placeholder}
              width={SearchBarWidth}
            />
          </div>
        ) : null}
        {enableSelect ? (
          <div className='m-2'>
            <PrimaryButton size='sm' onClick={() => handleSelect()}>
              {SelectButtonLabel}
            </PrimaryButton>
          </div>
        ) : null}
      </div>

      <div
        aria-live='polite'
        aria-atomic='true'
        className='sr-only'
        id='table-status'
      >
        {liveStatus} {visibleRange}
      </div>

      <div
        ref={containerRef}
        className={`${maxHeightClass} overflow-y-auto relative`}
        onScroll={handleScroll}
        role='region'
        tabIndex={0}
        aria-label={`${caption} table scroll region`}
      >
        <table className='table-fixed border-2 border-table-border border-collapse w-full'>
          <caption
            className={`text-secondary-heading text-text-color-subheading font-family-heading font-bold ${
              hideCaption ? 'sr-only' : ''
            }`}
          >
            {caption}
          </caption>

          <Header
            headers={headers}
            enableSelect={enableSelect}
            selectColumnLabel={SelectColumnLabel}
            enableSort={enableSort}
            sortKeys={sortKeys}
            sortState={sortState}
            onToggleSort={toggleSort}
            onClearSort={clearSort}
            enableFilter={enableFilter}
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            onToggleFilter={onToggleFilter}
            onClearFilter={onClearFilter}
            getFilterOptions={getFilterOptions}
          />

          <tbody>
            {topSpacerHeight > 0 && (
              <tr style={{ height: topSpacerHeight }}>
                <td
                  className='p-0 border-none'
                  colSpan={headers.length + (enableSelect ? 1 : 0)}
                />
              </tr>
            )}

            {displayRows.map((row) => (
              <Row
                key={row.id}
                headers={headers}
                row={row}
                itemHeight={itemHeight}
                enableSelect={enableSelect}
                selected={hasSelectedId(row.id)}
                toggleSelection={toggleSelection}
              />
            ))}

            {bottomSpacerHeight > 0 && (
              <tr style={{ height: bottomSpacerHeight }}>
                <td
                  className='p-0 border-none'
                  colSpan={headers.length + (enableSelect ? 1 : 0)}
                />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
