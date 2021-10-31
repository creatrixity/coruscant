import { useSearchParam } from "react-use";
import {
  Box,
  Button,
  Container,
  EpisodesSelect,
  Skeleton,
} from "../components";
import SingleEpisodeCrawl from "./SingleEpisodeCrawl";
import useQuery from "../hooks/useQuery";
import "./EpisodesList.css";

const sortByReleaseDate = (a, b) =>
  new Date(a.release_date) - new Date(b.release_date);

const EpisodesList = () => {
  const episode = useSearchParam("episode");
  const {
    isLoading: isLoadingEpisodes,
    isSuccess: episodesLoaded,
    isError: episodesErrored,
    refetch,
    data,
  } = useQuery(`/films`);
  const {
    isLoading: isLoadingSingleEpisode,
    isSuccess: singleEpisodeLoaded,
    isError: singleEpisodeErrored,
    data: singleEpisode,
    refetch: refetchSingleEpisode,
  } = useQuery(episode ? `/films/${episode}` : null);

  const handleEpisodeSelect = (e) => {
    const { value } = e.target;
    const url = new URL(window.location);

    if (value) {
      url.searchParams.set("episode", value);
    } else {
      url.searchParams.delete("episode");
    }

    window.history.pushState({}, "", url);
  };

  const episodes = episodesLoaded
    ? data.results
        .sort(sortByReleaseDate)
        .map(({ title, url, episode_id }) => ({
          title,
          url,
          episode_id,
        }))
    : [];

  return (
    <Box bg="yellow" h="100vh">
      <Container maxW="container.lg" py={12} px={0}>
        {isLoadingEpisodes ? (
          <Box>
            <Skeleton height="40px" mb={2} />
          </Box>
        ) : null}
        {episodesLoaded ? (
          <EpisodesSelect
            episodes={episodes}
            onSelectEpisode={handleEpisodeSelect}
          />
        ) : null}
        {episodesErrored ? (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="black"
            py={3}
            px={5}
            borderRadius={"lg"}
          >
            <Box color="gray.300">Unable to load episodes</Box>
            <Button variant="outline" colorScheme="yellow" onClick={refetch}>
              Click to try again
            </Button>
          </Box>
        ) : null}
      </Container>
      <SingleEpisodeCrawl
        isLoading={isLoadingSingleEpisode}
        isSuccess={singleEpisodeLoaded}
        isError={singleEpisodeErrored}
        episode={singleEpisode}
        episode_id={episode}
        onRefetch={refetchSingleEpisode}
      />
    </Box>
  );
};

EpisodesList.propTypes = {};

export default EpisodesList;
