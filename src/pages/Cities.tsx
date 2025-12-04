import { useCallback } from 'react';

import type { CitiesList, CitiesApiResponse } from '@typesData/cities';
import type { TableIdKey } from '@typesData/table';

import {
  TableCaption,
  citiesTableHeader,
  SelectColumnText,
  SelectionActionButtonLabel,
  CitiesSearchKeys,
  SearchPlaceholderText,
  CitiesSortKeys,
} from '@constants/cities';
import { FEATURE_SET } from '@constants/table';
import { JSON_SERVER } from '@constants/api';

import { useFetch } from '@hooks/API';

import { SecondaryHeading, Loading, Error } from '@custom-ui';

import { Table } from '@components/Table';

const Cities = () => {
  const {
    data: characters,
    loading,
    error,
  } = useFetch<CitiesApiResponse>({
    url: `${JSON_SERVER}/cities`,
    retries: 3,
  });

  const handleSelectedAction = useCallback((selectedIds: TableIdKey[]) => {
    console.log('Action for selected IDs:', selectedIds);
  }, []);

  if (loading) return <Loading />;

  if (error) return <Error />;

  const { SELECT_AND_ACTION, SEARCH, SORT, FILTER } = FEATURE_SET;

  return (
    <div className='flex flex-col'>
      <SecondaryHeading text={`Cities' Data`} />

      <Table<CitiesList>
        caption={TableCaption}
        hideCaption={true}
        headers={citiesTableHeader}
        rows={characters}
        features={[SELECT_AND_ACTION, SEARCH, SORT, FILTER]}
        selectConfig={{
          columnLabel: SelectColumnText,
          buttonLabel: SelectionActionButtonLabel,
          onAction: handleSelectedAction,
        }}
        searchConfig={{
          searchKeys: CitiesSearchKeys,
          placeholder: SearchPlaceholderText,
          delay: 200,
          width: 'lg',
        }}
        sortConfig={{
          sortKeys: CitiesSortKeys,
        }}
        filterConfig={{
          options: {
            country: [
              { label: 'India', value: 'India' },
              { label: 'United States', value: 'United States' },
              { label: 'United Kingdom', value: 'United Kingdom' },
            ],
          },
        }}
      />
    </div>
  );
};

export default Cities;
