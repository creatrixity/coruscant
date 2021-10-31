import { Select } from ".";

const CharactersGenderSelect = ({
  options,
  onSelectOption,
  defaultSelected,
}) => {
  return (
    <Select
      bg="black"
      placeholder="Select a Gender"
      color="white"
      defaultValue={defaultSelected}
      onChange={onSelectOption}
    >
      {Object.keys(options).map((option) => (
        <option value={option} key={option}>
          {options[option]}
        </option>
      ))}
    </Select>
  );
};

CharactersGenderSelect.propTypes = {};

export default CharactersGenderSelect;
