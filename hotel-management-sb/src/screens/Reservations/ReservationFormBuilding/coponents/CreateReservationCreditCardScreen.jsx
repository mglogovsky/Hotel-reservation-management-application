import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createCreditCard } from "../../../../api/creditCardResourceAPi";
import FormikForm from "../../../../components/formik/FormikForm";
import useFormAssets from "../../../CreditCard/validation/useFormAssets";

const CreateReservationCreditCardScreen = ({
  handleClose,
  userId,
  handleCards,
}) => {
  const queryClient = useQueryClient();

  const { isLoading, error, mutateAsync } = useMutation(
    (data) => createCreditCard(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["credit-card-list"]);
        handleCards(userId);
        handleClose();
      },
    }
  );

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
          users: {
            id: userId,
          },
          isActive: true,
        });
      }}
    />
  );
};

export default CreateReservationCreditCardScreen;
