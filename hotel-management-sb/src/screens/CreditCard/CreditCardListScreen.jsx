import React from "react";
import {
  deleteCreditCard,
  fetchAllCreditCards,
} from "../../api/creditCardResourceAPi";
import Modal from "../../components/common/Modal";
import TableAction from "../../components/common/TableAction";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import ROLES from "../../constants/Roles";
import { decorateCreditCardNumber } from "../../helper/decorateCreditCardNumber";
import { formatDateArrayToString } from "../../helper/formatedDate";
import useListAndDelete from "../../hooks/useListAndDelete";
import useModalToggle from "../../hooks/useModalToggle";
import CreateCreditCardScreen from "./CreateCreditCardScreen";

const CreditCardListScreen = () => {
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
    fetchFn: ({ queryKey }) => {
      const { name, ...rest } = queryKey[1];
      return fetchAllCreditCards({ ...name, ...rest });
    },
    deleteFn: deleteCreditCard,
    key: "credit-card-list",
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
          "Number",
          "CVV",
          "Expiration Date",
          "Customer ID",
          "Action",
        ]}
        title="Credit List"
        handlePageChanges={handlePagination}
        isPaginated={!!data?.content}
        // handleSearch={handleSearch}
        // searchText="Search by email"
        btnTitle="Add new card"
        click={handleShow}
      >
        {(data?.content ? data?.content : data)?.map((item, index) => {
          const {
            cardHolderName,
            cardNumber,
            cvv,
            expirationDate,
            customerId,
          } = item;
          return (
            <TableDescription
              key={index}
              index={index}
              trData={[
                cardHolderName,
                decorateCreditCardNumber(cardNumber),
                cvv,
                formatDateArrayToString(expirationDate),
                customerId,
              ]}
            >
              <TableAction
                removeFn={removeFn}
                deleteLoading={deleteLoading}
                id={item?.id}
                roles={[ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST]}
              />
            </TableDescription>
          );
        })}
      </TableList>
      {show && (
        <Modal title="Add New Card" show={show} handleClose={handleClose}>
          <CreateCreditCardScreen handleClose={handleClose} />
        </Modal>
      )}
    </>
  );
};

export default CreditCardListScreen;
