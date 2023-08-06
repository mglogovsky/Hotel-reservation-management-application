import React from "react";
import { getRoom, updateRoom } from "../../api/roomResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import useGetAndUpdate from "../../hooks/useGetAndUpdate";
import useFormAssets from "./validation/useFormAssets";

const EditRoomScreen = () => {
  const { id, data, isLoading, error, updateLoading, updateError, patcher } =
    useGetAndUpdate({
      key: "roomData",
      invalidateKey: "room-list",
      fetchFn: getRoom,
      updateFn: updateRoom,
    });

  const {
    validationSchema,
    formFields,
    initialValues,
    loading,
    error: formError,
  } = useFormAssets();

  return (
    <FormikForm
      title="Edit Room"
      formLoading={isLoading || loading || updateLoading}
      formError={error || formError || updateError}
      initialValues={initialValues(data)}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={async (formData) => {
        await patcher({
          ...formData,
          roomAvailabilityStatus: {
            id: formData.roomAvailabilityStatus,
          },
          roomStatus: {
            id: formData.roomStatus,
          },
          roomType: {
            id: formData.roomType,
          },
          isActive: true,
          id: Number(id),
        });
      }}
    />
  );
};

export default EditRoomScreen;
