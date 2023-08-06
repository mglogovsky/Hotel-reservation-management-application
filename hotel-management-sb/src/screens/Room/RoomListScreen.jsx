import React from "react";
import { deleteRoom, fetchAllRooms } from "../../api/roomResourceAPi";
import Modal from "../../components/common/Modal";
import TableAction from "../../components/common/TableAction";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import Td from "../../components/common/Td";
import { USER_ROLE } from "../../constants/APP_INFO";
import ROLES from "../../constants/Roles";
import { base64ToImage } from "../../helper/functions";
import useListAndDelete from "../../hooks/useListAndDelete";
import useModalToggle from "../../hooks/useModalToggle";
import CreateRoomScreen from "./CreateRoomScreen";

const RoomListScreen = () => {
  const {
    data,
    isLoading,
    error,
    deleteLoading,
    deleteError,
    removeFn,
    handlePagination,
    handleSearch,
  } = useListAndDelete({
    fetchFn: ({ queryKey }) => fetchAllRooms(queryKey[1]),
    deleteFn: deleteRoom,
    key: "room-list",
    isPaginated: true,
  });
  const { show, handleClose, handleShow } = useModalToggle();

  return (
    <>
      <TableList
        loading={isLoading}
        errors={[error, deleteError]}
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
          USER_ROLE === ROLES.ADMIN && "Action",
        ]}
        title="Room List"
        handlePageChanges={handlePagination}
        isPaginated={!!data?.content}
        handleSearch={handleSearch}
        searchText="Search by name"
        btnTitle={[ROLES.ADMIN].includes(USER_ROLE) && "Add new room"}
        click={handleShow}
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
              {USER_ROLE === ROLES.ADMIN && (
                <TableAction
                  removeFn={removeFn}
                  deleteLoading={deleteLoading}
                  id={item?.id}
                  roles={ROLES.ADMIN}
                />
              )}
            </TableDescription>
          );
        })}
      </TableList>
      {show && (
        <Modal title="Add Room" show={show} handleClose={handleClose}>
          <CreateRoomScreen handleClose={handleClose} />
        </Modal>
      )}
    </>
  );
};

export default RoomListScreen;
