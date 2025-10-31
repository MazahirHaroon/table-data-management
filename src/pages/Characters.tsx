import { useState, useMemo, useEffect } from 'react';

import { characterTableHeader } from '@constants/characters';
import type { CharacterList, TableIdKey } from '@typesData/characters';
import { getCharacters } from '@utils/api';

import { PrimaryButton, Input } from '@custom-ui';
import { Table } from '@components/Table';

const Characters = () => {
  const [characters, setCharacters] = useState<CharacterList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [searchVersion, setSearchVersion] = useState<number>(0);

  const [selectedIds, setSelectedIds] = useState<Set<TableIdKey>>(new Set());

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

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setSearchVersion((v) => v + 1);
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [query]);

  const filteredCharacters = useMemo(() => {
    if (!debouncedQuery) return characters;

    const queryValue = debouncedQuery.toLowerCase();

    return characters.filter((character) => {
      return (
        String(character?.name).toLowerCase().includes(queryValue) ||
        String(character?.location).toLowerCase().includes(queryValue)
      );
    });
  }, [characters, debouncedQuery]);

  const toggleSelection = (id: TableIdKey) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  const handleMarkViewed = () => {
    console.log('Selected entity IDs:', Array.from(selectedIds));
  };

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
    <div className='flex flex-col'>
      <h2 className='text-center text-secondary-heading text-text-color-subheading font-family-heading font-bold mb-4'>
        Characters' Data
      </h2>
      <div className='flex justify-between items-center w-full p-2 border-2 border-table-border'>
        <Input
          type='text'
          name='search-characters'
          label='Search Characters'
          hideLabel={true}
          placeholder='Search by name or location'
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <div className='m-2'>
          <PrimaryButton onClick={handleMarkViewed} children={'Submit'} />
        </div>
      </div>
      <Table
        caption="Character's Database"
        hideCaption={true}
        headers={characterTableHeader}
        rows={filteredCharacters}
        scrollToTopSignal={searchVersion}
        selectedIds={selectedIds}
        toggleSelection={toggleSelection}
      />
    </div>
  );
};

export default Characters;
