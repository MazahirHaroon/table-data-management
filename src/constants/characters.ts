import type { CharacterList } from '@typesData/characters';

export const characterTableHeader: (keyof CharacterList)[] = [
  'name',
  'location',
  'health',
  'power',
];

export const CharacterSearchKeys: (keyof CharacterList)[] = [
  'name',
  'location',
];
export const SearchPlaceholderText = 'Search in name and location';
