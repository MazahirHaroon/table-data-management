import type { TableIdKey } from './table';
export interface CitiesList {
  id: number;
  name: TableIdKey;
  country: string;
  subCountry: string;
}

export type CitiesApiResponse = CitiesList[];
