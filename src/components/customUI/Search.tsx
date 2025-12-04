import React from 'react';

import type { SearchBarLength } from '@typesData/customUI';
import { SEARCH_BAR_LENGTH } from '@constants/customUI';

import { Input } from '@custom-ui';

type Props = {
  id: string;
  query: string;
  setQuery: (q: string) => void;
  placeholder?: string;
  name?: string;
  width?: SearchBarLength;
};

export const Search = ({
  query,
  setQuery,
  placeholder = 'Search',
  width = 'md',
  id,
  name = 'search',
}: Props) => {
  return (
    <div className={`${SEARCH_BAR_LENGTH[width]}`}>
      <Input
        id={id}
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
