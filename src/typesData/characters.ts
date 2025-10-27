export interface CharacterList {
  id: string;
  name: string;
  location: string;
  health: string;
  power: number;
}

export type ApiResponse = CharacterList[];

export type TableIdKey = string | number;
