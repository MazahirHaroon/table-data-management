import { createContext } from 'react';

import type { TableIdKey } from '@typesData/table';

export type TableFeatureContext = {
  selectedIds?: Set<TableIdKey>;
  hasSelected?: (id: TableIdKey) => boolean;
  toggleSelection?: (id: TableIdKey) => void;
  selectLabel?: string;
};

export const TableFeatureContext = createContext<TableFeatureContext>({});
