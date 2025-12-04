import type { CitiesList } from 'src/typesData/cities';

export const TableCaption = `Cities' Database`;
export const citiesTableHeader: (keyof CitiesList)[] = [
  'id',
  'name',
  'country',
  'subCountry',
];

export const SelectColumnText = 'Select';
export const SelectionActionButtonLabel = 'Submit';

export const CitiesSearchKeys: (keyof CitiesList)[] = [
  'name',
  'country',
  'subCountry',
];
export const SearchPlaceholderText = 'Search in name, sub-country and country';

export const CitiesSortKeys: (keyof CitiesList)[] = [
  'name',
  'country',
  'subCountry',
];
