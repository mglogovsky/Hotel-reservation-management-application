import React from "react";
import { createRoom } from "../../api/roomResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import useCreate from "../../hooks/useCreate";
import useFormAssets from "./validation/useFormAssets";

const CreateRoomScreen = ({ handleClose }) => {
  const { isLoading, error, mutateAsync } = useCreate({
    fn: createRoom,
    invalidateKey: "room-list",
    handleClose: handleClose,
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
      formLoading={isLoading || loading}
      formError={error || formError}
      initialValues={initialValues()}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={async (formData) => {
        await mutateAsync({
          ...formData,
          roomStatus: {
            id: formData.roomStatus,
          },
          roomType: {
            id: formData.roomType,
          },
          isActive: true,
        });
      }}
    />
  );
};

export default CreateRoomScreen;
