import { useEffect } from "react";
import { useSearchParam } from "react-use";
import {
  Box,
  Button,
  Container,
  EpisodesSelect,
  Skeleton,
} from "../components";
import { ReactComponent as StarWarsLogo } from "../assets/star-wars-logo.svg";
import useQuery from "../hooks/useQuery";
import "./EpisodesList.css";

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
  } = useQuery(episode ? `/films/${episode}` : null);

  console.log({
    isLoadingSingleEpisode,
    singleEpisodeLoaded,
    singleEpisodeErrored,
  });

  useEffect(() => {
    // alert("On episode: " + episode);
  }, [episode]);

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

  const sortByReleaseDate = (a, b) =>
    new Date(a.release_date) - new Date(b.release_date);

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
      <Container
        bg="black"
        maxW="container.lg"
        centerContent
        h={"50vh"}
        px={6}
        borderRadius="lg"
        justifyContent="center"
      >
        {isLoadingSingleEpisode ? <Skeleton height="40px" mb={2} /> : null}
        <Box color="gray.200">
          {!singleEpisodeLoaded || !episode ? (
            <StarWarsLogo />
          ) : (
            <section className="star-wars">
              <div className="crawl">
                <div className="title">{singleEpisode.title}</div>
                <p>{singleEpisode.opening_crawl}</p>
              </div>
            </section>
          )}
        </Box>
      </Container>
    </Box>
  );
};

EpisodesList.propTypes = {};

export default EpisodesList;
