// VirtualTable.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { TableIdKey } from '@typesData/characters';
import Header from './header';
import Row from './row';

interface TableProps<T extends { id: TableIdKey }> {
  caption: string;
  hideCaption?: boolean;
  headers: (keyof T)[];
  rows: T[];
  maxHeightClass?: string;
  itemHeight?: number;
  overscan?: number;
  scrollToTopSignal?: number;
}

export const Table = <T extends { id: TableIdKey }>({
  caption,
  hideCaption = false,
  headers,
  rows,
  maxHeightClass = 'max-h-[585px]',
  itemHeight = 58,
  overscan = 5,
  scrollToTopSignal,
}: TableProps<T>) => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tickingRef = useRef<boolean>(false);

  const totalRows = rows.length;
  const totalHeight = totalRows * itemHeight;

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
  const displayRows = rows.slice(startIndex, endIndex + 1);

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
    el.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollTop(0);
  }, [scrollToTopSignal]);

  return (
    <div
      ref={containerRef}
      className={`${maxHeightClass} overflow-y-auto relative`}
      onScroll={handleScroll}
    >
      <table className='table-auto border-2 border-table-border border-collapse w-full'>
        <caption
          className={`text-secondary-heading text-text-color-subheading font-family-heading font-bold ${
            hideCaption ? 'sr-only' : ''
          }`}
        >
          {caption}
        </caption>

        <Header headers={headers} />

        <tbody>
          {topSpacerHeight > 0 && (
            <tr style={{ height: topSpacerHeight }}>
              <td className='p-0 border-none' colSpan={headers.length} />
            </tr>
          )}

          {displayRows.map((row) => (
            <Row
              key={row.id}
              headers={headers}
              row={row}
              itemHeight={itemHeight}
            />
          ))}

          {bottomSpacerHeight > 0 && (
            <tr style={{ height: bottomSpacerHeight }}>
              <td className='p-0 border-none' colSpan={headers.length} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
