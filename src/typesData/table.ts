import { FEATURE_SET, TABLE_LIST } from '@constants/table';
import type { SearchBarLength } from './customUI';

export type TableIdKey = string | number;

export type TableFeatures = (typeof FEATURE_SET)[keyof typeof FEATURE_SET];

export type SelectConfig = {
  columnLabel: string | undefined;
  buttonLabel: string | undefined;
  onAction: (selectedIds: TableIdKey[]) => void | Promise<void>;
};

export type SearchConfig<T> = {
  searchKeys: (keyof T)[];
  placeholder: string;
  delay?: number;
  width?: SearchBarLength;
};

export type SortDirection = 'asc' | 'desc' | 'none';

export type SortConfig<T> = {
  sortKeys: (keyof T)[];
  defaultSort?: { column?: keyof T; direction?: 'asc' | 'desc' };
  sortComparators?: Partial<{ [K in keyof T]: (a: T[K], b: T[K]) => number }>;
};

export type FilterOption = {
  label: string;
  value: unknown;
};

export type FilterConfig<T> = {
  options: Partial<Record<keyof T, FilterOption[]>>;
};

export type TableName = (typeof TABLE_LIST)[keyof typeof TABLE_LIST];
