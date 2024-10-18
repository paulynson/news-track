import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "@/app/redux/store";
import { storeArticles } from "@/app/redux/features/articles";
import { ArticlesProps } from "@/types";

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: any | null;
}

const useAxios = <T = any>(url: string): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<T>(url);
        setData(response.data);

        if (Array.isArray(response?.data)) {
          dispatch(storeArticles(response.data as ArticlesProps[]));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, dispatch]);

  return { data, loading, error };
};

export default useAxios;
