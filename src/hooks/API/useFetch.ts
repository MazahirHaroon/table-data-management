// src/hooks/useCustomFetch.ts
import { useState, useEffect, useCallback } from 'react';

export interface UseCustomFetchProps {
  url: string;
}

export const useFetch = <T>({ url }: UseCustomFetchProps) => {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const runFetch = useCallback(
    async (endpoint: string, signal?: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint, { signal });
        if (!response.ok) {
          throw new Error(
            `API error | ${response.status} | ${response.statusText}`
          );
        }
        const apiResponseData = await response.json();
        setData(apiResponseData);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log(`Fetch aborted ${err}`);
          return;
        } else {
          setError(`Error: ${err}`);
        }
        console.error(`Something went wrong`, err);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    runFetch(url, controller.signal);
    return () => controller.abort();
  }, [url, runFetch]);

  return {
    data,
    loading,
    error,
  };
};
