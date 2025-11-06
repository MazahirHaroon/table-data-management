import { useState, useEffect, useCallback } from 'react';

export interface UseCustomFetchProps {
  url: string;
  retries?: number;
  retryDelay?: number;
}

export const useFetch = <T>({
  url,
  retries = 0,
  retryDelay = 500,
}: UseCustomFetchProps) => {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const runFetch = useCallback(
    async (endpoint: string, signal?: AbortSignal) => {
      let attempts = 0;

      const attemptFetch = async (): Promise<void> => {
        try {
          if (signal?.aborted) return;
          setLoading(true);
          setError(null);

          const response = await fetch(endpoint, { signal });
          if (!response.ok) {
            throw new Error(
              `API error | ${response.status} | ${response.statusText}`
            );
          }

          const apiResponseData = await response.json();
          setData(apiResponseData);
        } catch (err: any) {
          if (err.name === 'AbortError') return; // fetch cancelled — stop retrying

          attempts += 1;
          console.error(`Fetch attempt ${attempts} failed:`, err);

          if (attempts < retries) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            return attemptFetch();
          }

          setError(`Error after ${attempts} attempts: ${err}`);
          setData([]);
        } finally {
          setLoading(false);
        }
      };

      await attemptFetch();
    },
    [retries, retryDelay]
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
