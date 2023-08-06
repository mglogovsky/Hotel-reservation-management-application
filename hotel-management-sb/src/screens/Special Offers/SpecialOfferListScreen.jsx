import React from "react";
import {
  deleteOffer,
  fetchAllOffers,
} from "../../api/specialOffersResourceAPi";
import Modal from "../../components/common/Modal";
import TableAction from "../../components/common/TableAction";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import { USER_ROLE } from "../../constants/APP_INFO";
import ROLES from "../../constants/Roles";
import { formatDateArrayToString } from "../../helper/formatedDate";
import useListAndDelete from "../../hooks/useListAndDelete";
import useModalToggle from "../../hooks/useModalToggle";
import CreateSpecialOfferScreen from "./CreateSpecialOfferScreen";

const SpecialOfferListScreen = () => {
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
    fetchFn: ({ queryKey }) => fetchAllOffers({ ...queryKey[1] }),
    deleteFn: deleteOffer,
    key: "special-offer-list",
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
          "Code",
          "Discount",
          "Room Type",
          "Start Date",
          "End Date",
          [ROLES.ADMIN, ROLES.STAFF].includes(USER_ROLE) && "Action",
        ]}
        title="Special Offer List"
        handlePageChanges={handlePagination}
        isPaginated={!!data?.content}
        // handleSearch={handleSearch}
        // searchText="Search by email"
        btnTitle={
          [ROLES.ADMIN, ROLES.STAFF].includes(USER_ROLE) && "Add new offer"
        }
        click={handleShow}
      >
        {(data?.content ? data?.content : data)?.map((item, index) => {
          const {
            offerName,
            offerCode,
            discountPercent,
            roomType,
            startDate,
            endDate,
          } = item;
          return (
            <TableDescription
              key={index}
              index={index}
              trData={[
                offerName,
                offerCode,
                discountPercent ? `${discountPercent}%` : "",
                roomType?.name,
                formatDateArrayToString(startDate),
                formatDateArrayToString(endDate),
              ]}
            >
              {[ROLES.ADMIN, ROLES.STAFF].includes(USER_ROLE) && (
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
        <Modal title="Add New Offer" show={show} handleClose={handleClose}>
          <CreateSpecialOfferScreen handleClose={handleClose} />
        </Modal>
      )}
    </>
  );
};

export default SpecialOfferListScreen;
