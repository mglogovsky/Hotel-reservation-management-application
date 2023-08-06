import React from "react";
import Card from "./Card";
import Error from "./Error";
import SearchList from "./SearchList";
import Table from "./Table";
import Title from "./Title";
import Loader from "./reusable/Loader";
import PaginationInformation from "./reusable/PaginationInformation";

const TableList = ({
  errors = [],
  title = "",
  loading,
  data = [],
  head = [],
  children,
  isPaginated = false,
  handlePageChanges,
  handleSearch,
  searchText,
  extraSection,
  btnTitle = "",
  click,
}) => (
  <Card className="p-4">
    {errors.filter(Boolean).map((item) => (
      <Error key={item} error={item} />
    ))}
    <div className="d-flex align-items-center justify-content-between">
      <Title title={title} />
      {btnTitle && click && (
        <button
          onClick={click}
          className="btn btn-primary text-capitalize btn-sm"
        >
          {btnTitle}
        </button>
      )}
    </div>
    {handleSearch && (
      <div className="mb-3 d-flex justify-content-end">
        <SearchList handleSearch={handleSearch} searchText={searchText} />
      </div>
    )}
    <> {extraSection && extraSection}</>
    {loading ? (
      <Loader />
    ) : (
      <>
        <Table
          loading={loading}
          data={isPaginated ? data?.content : data}
          head={head.filter(Boolean)}
        >
          {children}
        </Table>

        {isPaginated && (
          <PaginationInformation
            paginationAccess={data}
            handlePageChanges={handlePageChanges}
          />
        )}
      </>
    )}
  </Card>
);

export default TableList;
