import { useSearchParam } from "react-use";
import { Heading } from "@chakra-ui/layout";
import {
  Box,
  Button,
  CharactersGenderSelect,
  Container,
  EpisodesSelect,
  Skeleton,
  Table,
} from "components";
import SingleEpisodeCrawl from "./components/SingleEpisodeCrawl";
import useQuery from "hooks/useQuery";
import "./EpisodesList.css";
import tableSchema from "./tableSchema";
import { useEffect, useState } from "react";
import { useEpisodesList } from "./hooks/useEpisodesList";

const sortByReleaseDate = (a, b) =>
  new Date(a.release_date) - new Date(b.release_date);

const EpisodesList = () => {
  const [state, setState] = useEpisodesList();
  const { characters, episode, sortByColumn, gender, sortOrder } = state;

  // Obtain state parameters from the URL bar to use as a default
  const episodeUrlParam = useSearchParam("episode");
  const sortByColumnUrlParam = useSearchParam("sortByColumn");
  const genderUrlParam = useSearchParam("gender");
  const sortOrderUrlParam = useSearchParam("sortOrder");

  useEffect(() => {
    setState({
      episode: episodeUrlParam,
      sortByColumn: sortByColumnUrlParam,
      gender: genderUrlParam,
      sortOrder: sortOrderUrlParam,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (singleEpisodeLoaded) {
      async function fetchRequests() {
        let requests = singleEpisode.characters.map(async (c) => {
          const resp = await fetch(c);
          return resp.json();
        });

        const characters = await Promise.all(requests);
        setState({ characters });
      }

      fetchRequests();
    }
  }, [singleEpisodeLoaded, singleEpisode?.characters, setState]);

  const handleEpisodeSelect = (e) => setState({ episode: e.target.value });
  const handleGenderOptionSelect = (e) => setState({ gender: e.target.value });

  const episodes = episodesLoaded
    ? data.results
        .sort(sortByReleaseDate)
        .map(({ title, url, episode_id }) => ({
          title,
          url,
          episode_id,
        }))
    : [];

  const filterByGender = (character) => {
    if (!gender) return true;
    return character.gender === gender;
  };

  return (
    <Box bg="yellow" minHeight="100vh">
      <Container maxW="container.lg" py={12} px={0}>
        {isLoadingEpisodes ? (
          <Box>
            <Skeleton height="40px" mb={2} />
          </Box>
        ) : null}
        <Box>
          {episodesLoaded ? (
            <EpisodesSelect
              episodes={episodes}
              defaultEpisode={episode}
              onSelectEpisode={handleEpisodeSelect}
            />
          ) : null}
        </Box>
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
      {singleEpisodeLoaded && characters.length ? (
        <Container
          maxW="container.lg"
          mt={12}
          py={12}
          px={5}
          bg="black"
          color="white"
          borderRadius={"lg"}
        >
          <Box display="flex" justifyContent="space-between">
            <Heading mb={4}>Characters</Heading>
            <Box width={["50%"]}>
              <CharactersGenderSelect
                defaultSelected={gender}
                options={{
                  male: "Male",
                  female: "Female",
                  "n/a": "Not available",
                  none: "Genderless",
                  hermaphrodite: "Hermaphrodite",
                }}
                onSelectOption={handleGenderOptionSelect}
              />
            </Box>
          </Box>
          <Table
            schema={tableSchema}
            data={characters.filter(filterByGender)}
            defaultFilters={{
              sortOrder,
              sortByColumn,
            }}
          />
        </Container>
      ) : null}
    </Box>
  );
};

EpisodesList.propTypes = {};

export default EpisodesList;
