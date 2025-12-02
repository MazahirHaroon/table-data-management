import type { CharacterList } from '@typesData/characters';

export const TableCaption = `Characters' Database`;
export const characterTableHeader: (keyof CharacterList)[] = [
  'name',
  'location',
  'health',
  'power',
];

export const SelectColumnText = 'Select';
export const SelectionActionButtonLabel = 'Submit';

export const CharacterSearchKeys: (keyof CharacterList)[] = [
  'name',
  'location',
];
export const SearchPlaceholderText = 'Search in name and location';

export const CharacterSortKeys: (keyof CharacterList)[] = ['power', 'health'];
