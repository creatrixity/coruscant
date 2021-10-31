import { ChakraProvider } from "@chakra-ui/react";
import EpisodesList from "./screens/EpisodesList";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <EpisodesList />
      </div>
    </ChakraProvider>
  );
}

export default App;
