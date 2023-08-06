import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = ({ height = 200 }) => {
  return (
    <div
      className="justify-content-center align-items-center d-flex"
      style={{ height: `${height}px` }}
    >
      <PropagateLoader color="#0B5ED7" size={15} />
    </div>
  );
};

export default Loader;
