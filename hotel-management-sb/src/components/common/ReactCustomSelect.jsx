import ReactSelect from "react-select";
import InputFieldContainer from "./InputFieldContainer";

const ReactCustomSelect = ({
  options,
  className = "form-control form-select shadow-sm",
  label,
  handleChange,
  isMulti = false,
  placeholder = "Select...",
  isRequired = false,
}) => (
  <InputFieldContainer isRequired={isRequired} label={label}>
    <ReactSelect
      isMulti={isMulti}
      options={options}
      classNamePrefix="select"
      onChange={handleChange}
      placeholder={placeholder}
    />
  </InputFieldContainer>
);

export default ReactCustomSelect;
