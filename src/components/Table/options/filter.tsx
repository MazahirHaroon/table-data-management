import { useRef, useEffect } from 'react';

import { X, Funnel } from 'lucide-react';

import type { FilterOption } from '@typesData/table';

import { CheckBox } from '@custom-ui';

interface FilterMenuProps<T> {
  header: keyof T;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<keyof T | undefined>>;
  options: FilterOption[];
  selected: unknown[];
  onClearFilter?: (column?: keyof T) => void;
  onToggleFilter?: (column: keyof T, value: unknown) => void;
}

export const FilterMenu = <T,>({
  header,
  isOpen,
  setOpen,
  options,
  selected,
  onClearFilter,
  onToggleFilter,
}: FilterMenuProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(target)) {
        setOpen(undefined);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(undefined);
    };

    document.addEventListener('mousedown', onPointer, true);
    document.addEventListener('touchstart', onPointer, true);
    document.addEventListener('keydown', onKey, true);

    return () => {
      document.removeEventListener('mousedown', onPointer, true);
      document.removeEventListener('touchstart', onPointer, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [isOpen, setOpen]);

  return (
    <div className='relative inline-block ml-2' ref={wrapperRef}>
      <button
        type='button'
        aria-haspopup='true'
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => (prev === header ? undefined : header));
        }}
        aria-label={`Open filter for ${String(header)}`}
        className='text-sm'
      >
        <Funnel />
      </button>
      {isOpen && (
        <div
          role='dialog'
          aria-label={`Filter ${String(header)}`}
          className='absolute z-50 mt-1 p-2 border bg-primary-light border-table-border'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='mb-2 flex justify-between gap-2'>
            <button
              type='button'
              onClick={() => {
                onClearFilter?.(header);
              }}
            >
              Clear
            </button>
            <button
              type='button'
              onClick={() => setOpen(undefined)}
              aria-label='Close filter'
            >
              <X />
            </button>
          </div>

          {options.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <CheckBox
                key={String(opt.value)}
                name={`filter-checkbox-${opt.label}`}
                label={opt.label}
                checked={checked}
                onChange={() => onToggleFilter?.(header, opt.value)}
                aria-checked={checked}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
