import { useCallback, useState } from 'react';
import type { TableIdKey } from '@typesData/table';

interface UseSelectionProps {
  onAction?: (ids: TableIdKey[]) => void;
  initial?: TableIdKey[];
}

export const useSelection = ({ onAction, initial = [] }: UseSelectionProps) => {
  const [selectedIds, setSelectedIds] = useState<Set<TableIdKey>>(
    () => new Set(initial)
  );

  const toggle = useCallback((id: TableIdKey) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  }, []);

  const hasId = (id: TableIdKey) => selectedIds.has(id);

  const handleSelect = () => {
    if (onAction) onAction(Array.from(selectedIds));
  };

  return {
    hasId,
    toggle,
    handleSelect,
  };
};
