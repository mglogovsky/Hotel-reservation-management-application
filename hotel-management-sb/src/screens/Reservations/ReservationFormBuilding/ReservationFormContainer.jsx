import React, { useState } from "react";
import { createReservation } from "../../../api/reservationsResourceAPi";
import Modal from "../../../components/common/Modal";
import FormikForm from "../../../components/formik/FormikForm";
import FormikText from "../../../components/formik/FormikText";
import { USER_INFO } from "../../../constants/APP_INFO";
import { formatDateStandardToNormal } from "../../../helper/formatedDate";
import useCreate from "../../../hooks/useCreate";
import useModalToggle from "../../../hooks/useModalToggle";
import CreateUserScreen from "../../User/CreateUserScreen";
import useFormAssets from "../validation/useFormAssets";
import ReservationDetails from "./coponents/ReservationDetails";
import ReservationUserAndCardHandle from "./coponents/ReservationUserAndCardHandle";
import RoomFieldComponent from "./coponents/RoomFieldComponent";

const ReservationFormContainer = ({ startDate }) => {
  const { isLoading, error, mutateAsync } = useCreate({
    fn: createReservation,
    invalidateKey: "reservations-list",
  });
  const [grandPrice, setGrandPrice] = useState(0);
  const {
    validationSchema,
    formFields,
    initialValues,
    loading,
    error: formError,
    isApply,
  } = useFormAssets();
  const { show, handleClose, handleShow } = useModalToggle();

  const {
    startDate: { component: StartDateComponent, ...startDateField },
    endDate: { component: EndDateComponent, ...endDate },
    numberOfGuests: { component: NumberOfGuestsComponent, ...numberOfGuests },
    allUserList: { component: AllUserListComponent, ...allUserList },
  } = formFields;
  return (
    <FormikForm
      formLoading={isLoading || loading}
      formError={error || formError}
      initialValues={initialValues({
        startDate: formatDateStandardToNormal(startDate),
      })}
      validationSchema={validationSchema}
      title="Place Reservation"
      onSubmit={async (formData) => {
        const [roomId] = formData.roomId.split("__");
        const apiData = {
          ...formData,
          roomId,
          price: grandPrice,
          userId: isApply ? formData.userId : USER_INFO.userId,
          isActive: true,
        };
        await mutateAsync(apiData);
      }}
    >
      <StartDateComponent {...startDateField} />
      <EndDateComponent {...endDate} />
      <RoomFieldComponent />
      {isApply && (
        <div className="row">
          <div className="col-md-8">
            <AllUserListComponent {...allUserList} />
          </div>
          <div className="col-md-4">
            <button
              onClick={handleShow}
              type="button"
              className="btn btn-primary btn-sm mb-3 mb-md-0"
            >
              Add new user
            </button>
          </div>
        </div>
      )}
      <ReservationUserAndCardHandle isApply={isApply} />
      <NumberOfGuestsComponent {...numberOfGuests} />
      <FormikText label="Promo Code" name={"code"} />
      <ReservationDetails setGrandPrice={setGrandPrice} />

      {show && (
        <Modal show={show} title="Add User" handleClose={handleClose}>
          <CreateUserScreen noTitle />
        </Modal>
      )}
    </FormikForm>
  );
};

export default ReservationFormContainer;
