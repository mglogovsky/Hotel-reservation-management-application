import React from "react";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";
import Error from "./common/Error";

const DashboardContainer = ({
  children,
  title,
  loading = false,
  height = "350px",
  error,
}) => {
  const { t } = useTranslation();

  return (
    <LoadingOverlay active={loading} spinner text="Loading your content...">
      {loading ? (
        <div style={{ height: height }} />
      ) : (
        <div
          className="pt-4 px-4 shadow-sm"
          style={{ background: "#fff", borderRadius: "5px" }}
        >
          {error && <Error error={error} />}
          <h3 style={{ fontWeight: 800, color: "#4CAEEA" }}>{t(title)}</h3>
          <hr />
          <div className="pt-3">{children}</div>
        </div>
      )}
    </LoadingOverlay>
  );
};

export default DashboardContainer;
