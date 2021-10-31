import useQuery from "./useQuery";
const { REACT_APP_API_URL } = process.env;
// const REACT_APP_API_URL = "";

const useEpisodesQuery = () => {
  return useQuery(REACT_APP_API_URL + "/films");
};

export default useEpisodesQuery;
