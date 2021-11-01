import { Select } from ".";

const EpisodesSelect = ({ episodes, defaultEpisode, onSelectEpisode }) => {
  return (
    <Select
      bg="black"
      placeholder="Choose a movie to display"
      size="lg"
      color="white"
      defaultValue={defaultEpisode}
      onChange={onSelectEpisode}
    >
      {episodes.map(({ title, url, episode_id }) => (
        <option value={episode_id} key={url}>
          {title}
        </option>
      ))}
    </Select>
  );
};

EpisodesSelect.propTypes = {};

export default EpisodesSelect;
