import { Form, Formik } from "formik";
import React from "react";
import { searchRoom } from "../../api/roomResourceAPi";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import Td from "../../components/common/Td";
import FormikSelect from "../../components/formik/FormikSelect";
import FormikText from "../../components/formik/FormikText";
import { base64ToImage } from "../../helper/functions";
import { getFormattedDate } from "../../helper/getFormattedDate";
import { serializeFormikSelect } from "../../helper/serializeSelect";
import useRoomStatus from "../../hooks/controllers/useRoomStatus";
import useListAndDelete from "../../hooks/useListAndDelete";

const SearchRoomListScreen = () => {
  const {
    data,
    isLoading,
    error,

    handlePagination,
    handleSearch,
  } = useListAndDelete({
    fetchFn: ({ queryKey }) => searchRoom({ ...queryKey[1] }),
    key: "search-room-list",
    isPaginated: true,
  });

  const {
    data: roomStatusData,
    isLoading: roomStatusLoading,
    error: roomStatusError,
  } = useRoomStatus();

  return (
    <TableList
      loading={isLoading}
      errors={[error, roomStatusError]}
      data={data}
      head={[
        "#",
        "Name",
        "Floor",
        "Room Number",
        "Type",
        "Price/night",
        "Status",
        "Max Guest",
        "Description",
        "Image",
      ]}
      title="search Rooms"
      handlePageChanges={handlePagination}
      isPaginated={!!data?.content}
      // handleSearch={handleSearch}
      // searchText="Search by email"

      extraSection={
        <div className="py-3">
          <Formik
            initialValues={{
              roomStatusId: "",
              startPrice: "",
              endPrice: "",
              date: getFormattedDate(),
            }}
            onSubmit={async (apiData) => {
              console.log(apiData);
              handleSearch(apiData);
            }}
          >
            <fieldset disabled={roomStatusLoading}>
              <Form>
                <div className="row">
                  <div className="col-md-3">
                    <FormikSelect
                      label={"Room Status"}
                      options={serializeFormikSelect(roomStatusData)}
                      name={"roomStatusId"}
                      vertical
                    />
                  </div>
                  <div className="col-md-3">
                    <FormikText
                      label={"Date"}
                      name={"date"}
                      vertical
                      type="date"
                      min={getFormattedDate()}
                    />
                  </div>
                  <div className="col-md-3">
                    <FormikText
                      label={"Start Price"}
                      name={"startPrice"}
                      vertical
                    />
                  </div>
                  <div className="col-md-3">
                    <FormikText
                      label={"End Price"}
                      name={"endPrice"}
                      vertical
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                </div>
              </Form>
            </fieldset>
          </Formik>
          <hr />
        </div>
      }
    >
      {(data?.content ? data?.content : data)?.map((item, index) => {
        const {
          title,
          description,
          floor,
          maxGuests,
          pricePerNight,
          roomNumber,
          roomStatus,
          roomType,
          image,
        } = item;
        return (
          <TableDescription
            key={index}
            index={index}
            trData={[
              title,
              floor,
              roomNumber,
              roomType?.name,
              pricePerNight,
              roomStatus?.name,
              maxGuests,
              description,
            ]}
          >
            <Td>
              {image ? (
                <img
                  src={base64ToImage({ src: image })}
                  height={80}
                  alt={title}
                />
              ) : (
                <></>
              )}
            </Td>
          </TableDescription>
        );
      })}
    </TableList>
  );
};

export default SearchRoomListScreen;
