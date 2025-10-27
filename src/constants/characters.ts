import type { CharacterList } from '@typesData/characters';

const characterTableHeader: (keyof CharacterList)[] = [
  'name',
  'location',
  'health',
  'power',
];

export { characterTableHeader };
