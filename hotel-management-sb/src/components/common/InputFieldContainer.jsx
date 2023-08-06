import React from "react";
import FormDivider from "../FormDivider";
import CopyTranslate from "./CopyTranslate";
import InvalidInputAlert from "./InvalidInputAlert";

const InputFieldContainer = ({
  children,
  label,
  isRequired,
  error,
  vertical,
}) => (
  <FormDivider
    top={
      <label style={{ fontWeight: "500", color: "#000000" }}>
        <CopyTranslate>{label}</CopyTranslate>
        <font color="red" className="ms-1">
          {isRequired && "*"}
        </font>
      </label>
    }
    vertical={!!vertical}
  >
    {children}
    <InvalidInputAlert error={error} />
  </FormDivider>
);

export default InputFieldContainer;
