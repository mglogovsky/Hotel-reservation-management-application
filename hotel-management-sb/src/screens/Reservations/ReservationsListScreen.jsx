import React from "react";
import { fetchAllReservations } from "../../api/reservationsResourceAPi";
import { deleteOffer } from "../../api/specialOffersResourceAPi";
import TableAction from "../../components/common/TableAction";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import Td from "../../components/common/Td";
import ROLES from "../../constants/Roles";
import calculateTotalDays from "../../helper/calculateTotalDays";
import { formatDateArrayToString } from "../../helper/formatedDate";
import useListAndDelete from "../../hooks/useListAndDelete";
import CheckInOurScreen from "./CheckInOurScreen";

const ReservationsListScreen = () => {
  const { data, isLoading, error, deleteError, handlePagination } =
    useListAndDelete({
      fetchFn: ({ queryKey }) => fetchAllReservations({ ...queryKey[1] }),
      deleteFn: deleteOffer,
      key: "reservations-list",
      isPaginated: true,
    });

  return (
    <>
      <TableList
        loading={isLoading}
        errors={[error, deleteError]}
        data={data}
        head={[
          "#",
          "Room Name",
          "Room Number",
          "Room Type",
          "Total Days",
          "Start Date",
          "End Date",
          "Price",
          "Status",
          "User Email",
          "User Phone",
          "Action",
          "Action",
        ]}
        title="Reservation List"
        handlePageChanges={handlePagination}
        isPaginated={!!data?.content}
        // handleSearch={handleSearch}
        // searchText="Search by email"
      >
        {(data?.content ? data?.content : data)?.map((item, index) => {
          const {
            room,
            startDate,
            endDate,
            checkInOut,
            reservationStatus,
            users,
          } = item;
          const totalDays = calculateTotalDays(
            formatDateArrayToString(startDate),
            formatDateArrayToString(endDate)
          );
          return (
            <TableDescription
              key={index}
              index={index}
              trData={[
                room.title,
                room.roomNumber,
                room.roomType?.name,
                `${totalDays} days`,
                formatDateArrayToString(startDate),
                formatDateArrayToString(endDate),
                "$" + Number(totalDays * room.pricePerNight)?.toLocaleString(),
                reservationStatus,
                users?.email,
                users?.phoneNumber,
              ]}
            >
              <Td>
                <CheckInOurScreen checkInOut={checkInOut} />
              </Td>
              <TableAction
                id={item?.id}
                roles={[ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST]}
              />
            </TableDescription>
          );
        })}
      </TableList>
    </>
  );
};

export default ReservationsListScreen;
