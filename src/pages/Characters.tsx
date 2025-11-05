import { useState, useEffect, useCallback } from 'react';

import { characterTableHeader } from '@constants/characters';
import { FEATURE_SET } from '@constants/table';

import type { CharacterList } from '@typesData/characters';
import type { TableIdKey } from '@typesData/table';

import { getCharacters } from '@utils/api';

import { Table } from '@components/Table';

const Characters = () => {
  const [characters, setCharacters] = useState<CharacterList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacters();
        if (!signal.aborted) {
          if (data) setCharacters(data);
          else setError('Failed to load characters.');
        }
      } catch (err) {
        if (!signal.aborted) setError('Failed to load characters.');
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  const handleSelectedAction = useCallback((selectedIds: TableIdKey[]) => {
    console.log('Action for selected IDs:', selectedIds);
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center py-8'>
        <p className='text-minor text-text-alerts font-family-body'>
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center py-8'>
        <p className='text-secondary-heading text-text-error font-family-body'>
          {error}
        </p>
      </div>
    );

  return (
    <div className='flex flex-col'>
      <h2 className='text-center text-secondary-heading text-text-color-subheading font-family-heading font-bold mb-4'>
        Characters' Data
      </h2>

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
