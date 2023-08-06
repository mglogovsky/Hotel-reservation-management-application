import React from "react";
import { createOffer } from "../../api/specialOffersResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import useCreate from "../../hooks/useCreate";
import useFormAssets from "./validation/useFormAssets";

const CreateSpecialOfferScreen = ({ handleClose }) => {
  const { isLoading, error, mutateAsync } = useCreate({
    fn: createOffer,
    invalidateKey: "special-offer-list",
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
          roomType: {
            id: formData.roomType,
          },
          isActive: true,
        });
      }}
    />
  );
};

export default CreateSpecialOfferScreen;
