import { Field, useField } from "formik";
import React from "react";
import { isRequireField } from "../../helper/functions";
import toStandardFormat from "../../helper/toStandardFormat";
import InputFieldContainer from "../common/InputFieldContainer";

const FormikSelect = ({
  name,
  options,
  className = "form-control form-select",
  placeholder = "",
  label,
  errors,
  handleChange,
  disabled = false,
  selectData,
  vertical,
  ...props
}) => {
  // eslint-disable-next-line no-unused-vars
  const [, meta, helpers] = useField(name);

  const handleChangeValue = (selectedOptions) => {
    helpers.setValue(selectedOptions.target.value);
    if (typeof handleChange === "function") {
      handleChange(selectedOptions);
    }
  };
  const labelSelect = toStandardFormat(
    placeholder ? placeholder : "Select an option"
  );

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
      <Field
        as="select"
        id={name}
        name={name}
        {...props}
        className={className}
        onChange={handleChangeValue}
        disabled={disabled}
      >
        <option value="" disabled>
          {disabled ? selectData : labelSelect}{" "}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    </InputFieldContainer>
  );
};

export default FormikSelect;
