import { Select } from ".";

const EpisodesSelect = ({ ...props }) => {
  return (
    <Select
      bg="black"
      placeholder="Choose a movie to display"
      size="lg"
      color="white"
    >
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
};

EpisodesSelect.propTypes = {};

export default EpisodesSelect;
