import React from "react";
import { createCreditCard } from "../../api/creditCardResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import { USER_INFO } from "../../constants/APP_INFO";
import useCreate from "../../hooks/useCreate";
import useFormAssets from "./validation/useFormAssets";

const CreateCreditCardScreen = ({ handleClose }) => {
  const { isLoading, error, mutateAsync } = useCreate({
    fn: createCreditCard,
    invalidateKey: "credit-card-list",
    handleClose: handleClose,
  });

  const {
    validationSchema,
    formFields,
    initialValues,
    loading,
    error: formError,
    isApply,
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
          users: {
            id: isApply ? formData.users : USER_INFO?.userId,
          },
          isActive: true,
        });
      }}
    />
  );
};

export default CreateCreditCardScreen;
