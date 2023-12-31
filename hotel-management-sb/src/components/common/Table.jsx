import React from "react";
import LoadingFailedMessage from "./LoadingFailedMessage";
import Thead from "./Thead";

const Table = ({ children, head = [], loading, data = [] }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover text-center table-striped table-bordered align-middle rounded">
        <Thead head={head} />

        <tbody>{children}</tbody>
      </table>
      <LoadingFailedMessage data={data || []} loading={loading} />
    </div>
  );
};

export default Table;
