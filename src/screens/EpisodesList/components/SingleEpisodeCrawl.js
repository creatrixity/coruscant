import { ReactComponent as StarWarsLogo } from "assets/star-wars-logo.svg";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Button, Container } from "components";

const SingleEpisodeCrawl = ({
  isLoading,
  isSuccess,
  isError,
  episode,
  episode_id,
  onRefetch,
}) => {
  return (
    <Container
      bg="black"
      maxW="container.lg"
      centerContent
      h={"50vh"}
      px={6}
      borderRadius="lg"
      justifyContent="center"
    >
      {isLoading ? (
        <Spinner color="red.500" size="xl" />
      ) : !isLoading && !isError ? (
        <StarWarsLogo />
      ) : null}
      <Box color="gray.200">
        {isError ? (
          <Box display="flex" flexDirection="column">
            <Box fontSize={"3xl"} mb={3}>
              Failed to fetch episode
            </Box>
            <Button
              onClick={onRefetch}
              colorScheme={"yellow"}
              variant="outline"
            >
              Retry fetching episode {episode_id}
            </Button>
          </Box>
        ) : null}
        {episode_id && isSuccess ? (
          <section className="star-wars">
            <div className="crawl">
              <div className="title">{episode.title}</div>
              <p>{episode.opening_crawl}</p>
            </div>
          </section>
        ) : null}
      </Box>
    </Container>
  );
};

export default SingleEpisodeCrawl;
