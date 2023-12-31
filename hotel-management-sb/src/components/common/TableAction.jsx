import React from "react";
import { Link, useLocation } from "react-router-dom";
import { USER_ROLE } from "../../constants/APP_INFO";
import { isConfirm } from "../../helper/functions";

const TableAction = ({ roles = [], deleteLoading, removeFn, id }) => {
  const { pathname } = useLocation();

  return (
    <td style={{ width: "70px" }}>
      <div
        className="d-flex justify-content-between align-items-center h-100"
        style={{ width: "70px" }}
      >
        <Link
          className="btn btn-primary btn-sm"
          to={`/edit-${pathname
            .split("/")
            .join("")
            .replace("-list", "/")}${id}`}
        >
          <i className="bi bi-pen" />{" "}
        </Link>
        {roles.includes(USER_ROLE) && (
          <button
            className="btn btn-danger btn-sm"
            disabled={deleteLoading}
            onClick={() => isConfirm({ callback: () => removeFn(id) })}
          >
            <i className="bi bi-trash-fill" />
          </button>
        )}
      </div>
    </td>
  );
};

export default TableAction;
