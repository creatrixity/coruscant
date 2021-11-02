import { useState, useEffect, useCallback } from "react";

const api = {
  GET: async (url) => {
    const response = await fetch(url);
    console.log(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Encountered an error making GET request to " + url);
    }
  },
};

export default function useQuery(path) {
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState();

  const handleStartFetch = async () => {
    try {
      setStatus("loading");
      let data = await api.GET(process.env.REACT_APP_API_URL + path);

      setError();
      setData(data);
      setStatus("success");
    } catch (error) {
      setError(error);
      setStatus("error");
    }
  };

  const startFetch = useCallback(handleStartFetch, [path]);

  useEffect(() => {
    if (path) {
      startFetch();
    }
  }, [startFetch, path]);

  return {
    data,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    refetch: startFetch,
  };
}
