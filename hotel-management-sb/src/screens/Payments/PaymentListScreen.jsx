import React from "react";
import { fetchAllPayments } from "../../api/paymentResourceAPi";
import { deleteOffer } from "../../api/specialOffersResourceAPi";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import { USER_ROLE } from "../../constants/APP_INFO";
import ROLES from "../../constants/Roles";
import { formatDateArrayToString } from "../../helper/formatedDate";
import useListAndDelete from "../../hooks/useListAndDelete";

const PaymentListScreen = () => {
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
    fetchFn: ({ queryKey }) => fetchAllPayments({ ...queryKey[1] }),
    deleteFn: deleteOffer,
    key: "payment-list",
    isPaginated: true,
  });
  const isAble = [ROLES.ADMIN, ROLES.STAFF].includes(USER_ROLE);

  return (
    <>
      <TableList
        loading={isLoading}
        errors={[error, deleteError]}
        data={data}
        head={[
          "#",
          "Name",
          "Email",
          "Amount",
          "Payment Time",
          "Start Date",
          "End Date",
          "Number Of Guest",
          "Reservation Status",
          "Card Number",
          "Card Name",
          [(ROLES.ADMIN, ROLES.STAFF)].includes(USER_ROLE) && "Action",
        ]}
        title="Payment List"
        handlePageChanges={handlePagination}
        isPaginated={!!data?.content}
        handleSearch={isAble ? handleSearch : null}
        searchText={isAble && "Search by email"}
      >
        {(data?.content ? data?.content : data)?.map((item, index) => {
          const {
            users,
            amount,
            paymentDateTime,
            reservation: {
              reservationStatus,
              numberOfGuests,
              startDate,
              endDate,
            },
            creditCard: { cardNumber, cardHolderName },
          } = item;
          return (
            <TableDescription
              key={index}
              index={index}
              trData={[
                users?.firstName && `${users?.firstName} ${users?.lastName}`,
                users?.email,
                amount ? `$${amount}` : "",
                formatDateArrayToString(paymentDateTime),
                formatDateArrayToString(startDate),
                formatDateArrayToString(endDate),
                numberOfGuests,
                reservationStatus,
                cardNumber,
                cardHolderName,
              ]}
            />
          );
        })}
      </TableList>
    </>
  );
};

export default PaymentListScreen;
