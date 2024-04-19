import { useCallback, useEffect, useMemo, useState } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const _data = useMemo(() => data, [data]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      if (response.status === "error") {
        return Alert.alert("Error", response.message);
      }

      setData(response.data);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [fn]);

  const refetch = () => fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return { data: _data, isLoading, refetch };
};

export default useAppwrite;
