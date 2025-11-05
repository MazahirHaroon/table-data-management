import { FEATURE_SET } from '@constants/table';

export type TableIdKey = string | number;

export type TableFeatures = (typeof FEATURE_SET)[keyof typeof FEATURE_SET];

export type SelectConfig = {
  columnLabel: string | undefined;
  buttonLabel: string | undefined;
  onAction: (selectedIds: TableIdKey[]) => void | Promise<void>;
};
