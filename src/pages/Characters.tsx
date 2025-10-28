import { useEffect, useState } from 'react';

import { characterTableHeader } from '@constants/characters';
import type { CharacterList } from '@typesData/characters';
import { getCharacters } from '@utils/api';

import { Table } from '@components/Table';
import PrimaryButton from 'src/components/Button/Primary';
import Input from 'src/components/Input';

const Characters = () => {
  const [characters, setCharacters] = useState<CharacterList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      setLoading(true);
      setError(null);
      const data = await getCharacters();
      if (data) {
        setCharacters(data);
      } else if (data === null) {
        if (!signal.aborted) setError('Failed to load characters.');
      }
      if (!signal.aborted) setLoading(false);
    };
    getData();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center'>
        <p className='text-minor text-text-alerts font-family-body'>
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center'>
        <p className='text-secondary-heading text-text-error font-family-body'>
          Error...
        </p>
      </div>
    );

  return (
    <div className='flex flex-col '>
      <h2 className='text-center text-secondary-heading text-text-color-subheading font-family-heading font-bold  mb-4'>
        Characters' Data
      </h2>
      <div className='flex justify-between items-center w-full p-2 border-2 border-table-border'>
        <Input
          type='text'
          name='search-characters'
          label='Search Characters'
          hideLabel={true}
          placeholder='Search Characters'
        />
        <div className='m-2'>
          <PrimaryButton content={'Submit'} />
        </div>
      </div>
      <Table
        caption="Character's Database"
        hideCaption={true}
        headers={characterTableHeader}
        rows={characters}
      />
    </div>
  );
};

export default Characters;
