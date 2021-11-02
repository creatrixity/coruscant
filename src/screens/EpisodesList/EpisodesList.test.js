import { render, screen } from "@testing-library/react";
import { EpisodesListProvider } from "./hooks/useEpisodesList";
const EpisodesList = require("./EpisodesList").default;

const renderEpisodesList = () =>
  render(
    <EpisodesListProvider>
      <EpisodesList />
    </EpisodesListProvider>
  );

test("renders the star wars logo", () => {
  renderEpisodesList();
  const svgLogo = screen.getByText("star-wars-logo.svg");
  expect(svgLogo).toBeInTheDocument();
});

test("renders a movie dropdown", async () => {
  renderEpisodesList();

  const movieDropdown = await screen.findByLabelText("Episodes select");
  expect(movieDropdown).toBeInTheDocument();
});
