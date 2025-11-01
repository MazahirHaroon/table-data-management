import { JSON_SERVER } from '@constants/api';
import type { CharacterApiResponse } from '@typesData/characters';

const getCharacters = async (
  signal?: AbortSignal
): Promise<CharacterApiResponse | null> => {
  try {
    const response = await fetch(`${JSON_SERVER}/characters`, { signal });
    if (!response.ok) {
      throw new Error(
        `API error | ${response.status} | ${response.statusText}`
      );
    }
    const data = (await response.json()) as CharacterApiResponse;
    return data;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
      return null;
    }
    console.error(`Something went wrong | ${err}`);
    return null;
  }
};

export { getCharacters };
