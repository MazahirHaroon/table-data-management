import { useCallback } from 'react';

import type {
  CharacterList,
  CharacterApiResponse,
} from '@typesData/characters';
import type { TableIdKey } from '@typesData/table';

import { characterTableHeader } from '@constants/characters';
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
  });

  const handleSelectedAction = useCallback((selectedIds: TableIdKey[]) => {
    console.log('Action for selected IDs:', selectedIds);
  }, []);

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <SecondaryHeading text={`Characters' Data`} />

      <Table<CharacterList>
        caption="Character's Database"
        hideCaption={true}
        headers={characterTableHeader}
        rows={characters}
        features={[FEATURE_SET.SELECT_AND_ACTION]}
        selectConfig={{
          columnLabel: 'Select',
          buttonLabel: 'Submit',
          onAction: handleSelectedAction,
        }}
      />
    </div>
  );
};

export default Characters;
