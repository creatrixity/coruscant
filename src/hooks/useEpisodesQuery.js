import useQuery from "./useQuery";
const { REACT_APP_API_URL } = process.env;
// const REACT_APP_API_URL = "";

const useEpisodesQuery = (path) => {
  return useQuery(path ? REACT_APP_API_URL + path : null);
};

export default useEpisodesQuery;
