import React from "react";
import {
  getReservation,
  updateReservation,
} from "../../api/reservationsResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import FormikSingleSelect from "../../components/formik/FormikSingleSelect";
import FormikText from "../../components/formik/FormikText";
import YUP from "../../constants/yup";
import { isRequireField } from "../../helper/functions";
import useGetAndUpdate from "../../hooks/useGetAndUpdate";

const EditReservationsScreen = () => {
  const { id, data, isLoading, error, updateLoading, updateError, patcher } =
    useGetAndUpdate({
      key: "reservationsData",
      invalidateKey: "reservations-list",
      fetchFn: getReservation,
      updateFn: updateReservation,
    });
  const validationSchema = YUP.object({
    numberOfGuests: YUP.number()
      .typeError("Enter a number")
      .positive("Enter a positive integer")
      .integer("Enter a positive integer")
      .required(isRequireField()),
    reservationStatus: YUP.string().required(isRequireField()),
  });
  return (
    <FormikForm
      title="Edit Reservation"
      formLoading={isLoading || updateLoading}
      formError={error || updateError}
      initialValues={{
        numberOfGuests: data?.numberOfGuests ?? "",
        reservationStatus: data?.reservationStatus ?? "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (formData) => {
        await patcher({
          ...formData,
          roomType: {
            id: formData.roomType,
          },
          isActive: true,
          id: Number(id),
        });
      }}
    >
      <FormikText name={"numberOfGuests"} label="Number Of Guests" />
      <FormikSingleSelect
        options={["RESERVED", "CANCELLED"].map((item) => ({
          label: item,
          value: item,
        }))}
        name={"reservationStatus"}
        label={"Reservation Status"}
      />
    </FormikForm>
  );
};

export default EditReservationsScreen;
