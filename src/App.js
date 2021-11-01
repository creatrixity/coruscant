import { ChakraProvider } from "@chakra-ui/react";
import { EpisodesListProvider } from "screens/EpisodesList/hooks/useEpisodesList";
import EpisodesList from "screens/EpisodesList";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <EpisodesListProvider>
          <EpisodesList />
        </EpisodesListProvider>
      </div>
    </ChakraProvider>
  );
}

export default App;
