import { useState, useEffect, useCallback } from "react";

const api = {
  GET: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
};

export default function useQuery(url) {
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState();

  const handleStartFetch = async () => {
    try {
      setStatus("loading");
      let data = await api.GET(url);

      setError();
      setStatus("success");
      setData(data);
    } catch (error) {
      setError(error);
      setStatus("error");
    }
  };

  const startFetch = useCallback(handleStartFetch, [url]);

  useEffect(() => {
    startFetch();
  }, [startFetch]);

  return {
    data,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    refetch: startFetch,
  };
}
