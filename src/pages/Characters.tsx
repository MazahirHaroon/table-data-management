import { useCallback } from 'react';

import type {
  CharacterList,
  CharacterApiResponse,
} from '@typesData/characters';
import type { TableIdKey } from '@typesData/table';

import {
  TableCaption,
  characterTableHeader,
  SelectColumnText,
  SelectionActionButtonLabel,
  CharacterSearchKeys,
  SearchPlaceholderText,
  CharacterSortKeys,
} from '@constants/characters';
import { FEATURE_SET } from '@constants/table';
import { JSON_SERVER } from '@constants/api';

import { useFetch } from '@hooks/API';

import { SecondaryHeading, Loading, Error } from '@custom-ui';

import { Table } from '@components/Table';

const Characters = () => {
  const {
    data: characters,
    loading,
    error,
  } = useFetch<CharacterApiResponse>({
    url: `${JSON_SERVER}/characters`,
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
      <SecondaryHeading text={`Characters' Data`} />

      <Table<CharacterList>
        caption={TableCaption}
        hideCaption={true}
        headers={characterTableHeader}
        rows={characters}
        features={[SELECT_AND_ACTION, SEARCH, SORT, FILTER]}
        selectConfig={{
          columnLabel: SelectColumnText,
          buttonLabel: SelectionActionButtonLabel,
          onAction: handleSelectedAction,
        }}
        searchConfig={{
          searchKeys: CharacterSearchKeys,
          placeholder: SearchPlaceholderText,
          delay: 200,
        }}
        sortConfig={{
          sortKeys: CharacterSortKeys,
        }}
        filterConfig={{
          options: {
            health: [
              { label: 'Healthy', value: 'Healthy' },
              { label: 'Injured', value: 'Injured' },
              { label: 'Critical', value: 'Critical' },
            ],
          },
        }}
      />
    </div>
  );
};

export default Characters;
