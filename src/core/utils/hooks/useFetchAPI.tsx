import { useState, useEffect } from 'react';

interface FetchProps {
  url: string;
  options: Record<string, any>;
}
const useFetch = (fetchProps: FetchProps) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { url, options } = fetchProps;
  const { headers, method } = options;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const myHeaders = new Headers({ ...headers });

      try {
        const resp = await fetch(url, {
          method: method,
          headers: myHeaders,
          mode: 'cors',
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
