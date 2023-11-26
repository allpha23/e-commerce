import { useEffect, useState } from 'react';
import { AxiosInstance, AxiosError } from 'axios';

interface ItemsParams {
  limit: number,
  offset?: number,
}

interface Params {
  params?: ItemsParams
}

export type RequestConfig = {
  axiosInstance: AxiosInstance,
  url: string,
  othersConfig?: Params,
};

export default function useAxios(requests: RequestConfig) {
  const [data, setData] = useState<any | null >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { axiosInstance, url, othersConfig } = requests;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(url, { ...othersConfig });
        setData(res.data);
      } catch (err) {
        const typeError = err as AxiosError;
        setError(typeError?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [othersConfig?.params?.offset, url]);

  return [data, loading, error];
}
