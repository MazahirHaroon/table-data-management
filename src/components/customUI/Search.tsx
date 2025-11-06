import React from 'react';

import { Input } from '@custom-ui';

type Props = {
  query: string;
  setQuery: (q: string) => void;
  placeholder?: string;
  name?: string;
};

export const Search = ({
  query,
  setQuery,
  placeholder = 'Search',
  name = 'search',
}: Props) => {
  return (
    <div className='min-w-64'>
      <Input
        type='text'
        name={name}
        label='Search'
        hideLabel={true}
        placeholder={placeholder}
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
    </div>
  );
};

export default Search;
