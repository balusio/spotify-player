import { useState, useEffect } from 'react';

interface FetchProps {
  url: string;
  options: Record<string, any>;
}
const useFetch = (fetchProps: FetchProps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { url, options } = fetchProps;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resp = await fetch(url, {
          ...options,
          mode: 'no-cors',
        });
        const response = await resp.json();

        setData(response);
      } catch (e) {
        setData(null);
        setError(e as Error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return { data, error, isLoading };
};

export default useFetch;
