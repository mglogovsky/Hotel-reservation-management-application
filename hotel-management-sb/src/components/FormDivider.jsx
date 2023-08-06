import React from "react";
import classNames from "../helper/classNames";

const FormDivider = ({ children, top, vertical = false }) => (
  <div
    className={classNames(
      "d-flex  flex-column justify-content-between mb-4",
      !vertical && "flex-md-row"
    )}
  >
    <div
      style={{ textTransform: "capitalize", minWidth: "200px" }}
      className={classNames("mb-md-0", vertical ? "mb-3" : "mb-2")}
    >
      {top && top}
    </div>
    <div className="w-100">{children}</div>
  </div>
);

export default FormDivider;
