import { useField } from "formik";
import React from "react";
import ReactSelect from "react-select";
import { isRequireField } from "../../helper/functions";
import InputFieldContainer from "../common/InputFieldContainer";

const FormikSingleSelect = ({
  name,
  options,
  className = "form-control form-select shadow-sm",
  placeholder = "",
  vertical = false,
  label,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOptions) => {
    helpers.setValue(selectedOptions.value);
  };

  const getValue = () => {
    if (options) {
      return options.find((option) => field.value === option.value);
    } else {
      return "";
    }
  };

  return (
    <InputFieldContainer
      label={label}
      error={
        meta.touched &&
        meta.error &&
        (meta.error === "REQUIRED." ? isRequireField(label) : meta.error)
      }
      isRequired={!!meta.error}
      vertical={!!vertical}
    >
      <ReactSelect
        {...rest}
        name={name}
        options={options}
        classNamePrefix="select"
        value={getValue()}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
      />
    </InputFieldContainer>
  );
};
export default FormikSingleSelect;
