import React from "react";
import { allUsers, deleteUser } from "../../api/userAPIs";
import TableAction from "../../components/common/TableAction";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import { USER_ROLE } from "../../constants/APP_INFO";
import ROLES from "../../constants/Roles";
import { formatDateArrayToString } from "../../helper/formatedDate";
import useListAndDelete from "../../hooks/useListAndDelete";
import useModalToggle from "../../hooks/useModalToggle";

const UserListScreen = () => {
  const { show, handleClose, handleShow } = useModalToggle();
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
    fetchFn: ({ queryKey }) => allUsers({ ...queryKey[1] }),
    deleteFn: deleteUser,
    key: "user-list",
    isPaginated: true,
  });

  return (
    <TableList
      loading={isLoading}
      errors={[error, deleteError]}
      data={data}
      head={[
        "#",
        "Name",
        "Email",
        "Role",
        "DOB",
        "Address",
        "Country",
        "PhoneNUmber",
        "Zip Code",
        "City",
        USER_ROLE === ROLES.ADMIN && "Actions",
      ]}
      title="User List"
      handlePageChanges={handlePagination}
      isPaginated
      handleSearch={handleSearch}
      searchText="Search by email"
    >
      {data?.content?.map((item, index) => {
        const {
          firstName,
          lastName,
          email,
          roles,
          birthOfDate,
          address,
          country,
          phoneNumber,
          zipCode,
          city,
        } = item;
        return (
          <TableDescription
            key={index}
            index={index}
            trData={[
              `${firstName} ${lastName}`,
              email,
              roles?.[0]?.name,
              formatDateArrayToString(birthOfDate),
              address,
              country,
              phoneNumber,
              zipCode,
              city,
            ]}
          >
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
  );
};

export default UserListScreen;
