import { useSearchParam } from "react-use";

import {
  Box,
  Button,
  Container,
  EpisodesSelect,
  Skeleton,
} from "../components";
import { ReactComponent as StarWarsLogo } from "../assets/star-wars-logo.svg";
import useEpisodesQuery from "../hooks/useEpisodesQuery";
import { useEffect } from "react";

const EpisodesList = ({ ...props }) => {
  const episode = useSearchParam("episode");
  const {
    isLoading: isLoadingEpisodes,
    isSuccess: episodesLoaded,
    isError: episodesErrored,
    refetch,
    data,
  } = useEpisodesQuery();

  useEffect(() => {
    // alert("On episode: " + episode);
  }, [episode]);

  const handleEpisodeSelect = (e) => {
    const url = new URL(window.location);
    url.searchParams.set("episode", e.target.value);

    window.history.pushState({}, "", url);
  };

  const episodes = episodesLoaded
    ? data.results.map(({ title, url, episode_id }) => ({
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
      <Container
        bg="black"
        maxW="container.lg"
        centerContent
        h={"70vh"}
        px={6}
        borderRadius="lg"
        justifyContent="center"
      >
        <StarWarsLogo />
      </Container>
    </Box>
  );
};

EpisodesList.propTypes = {};

export default EpisodesList;
