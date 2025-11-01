import type { TableIdKey } from './table';
export interface CharacterList {
  id: TableIdKey;
  name: string;
  location: string;
  health: string;
  power: number;
}

export type CharacterApiResponse = CharacterList[];
