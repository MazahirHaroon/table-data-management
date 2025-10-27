import { useEffect, useState } from 'react';

import { characterTableHeader } from '@constants/characters';
import type { CharacterList } from '@typesData/characters';
import { getCharacters } from '@utils/api';
import { Table } from '@components/Table';

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
        <p className='text-2xl text-gray-500'>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center'>
        <p className='text-2xl text-red-600'>Error...</p>
      </div>
    );

  return (
    <Table
      caption="Character's Database"
      headers={characterTableHeader}
      rows={characters}
    />
  );
};

export default Characters;
