import React from "react";
import {
  getCreditCard,
  updateCreditCard,
} from "../../api/creditCardResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import { USER_INFO } from "../../constants/APP_INFO";
import useGetAndUpdate from "../../hooks/useGetAndUpdate";
import useFormAssets from "./validation/useFormAssets";

const EditCreditCardScreen = () => {
  const { id, data, isLoading, error, updateLoading, updateError, patcher } =
    useGetAndUpdate({
      key: "creditCardData",
      invalidateKey: "credit-card-list",
      fetchFn: getCreditCard,
      updateFn: updateCreditCard,
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
      title="Edit Card"
      formLoading={isLoading || loading || updateLoading}
      formError={error || formError || updateError}
      initialValues={initialValues(data)}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={async (formData) => {
        await patcher({
          ...formData,
          users: {
            id: isApply ? formData?.users : USER_INFO?.userId,
          },
          isActive: true,
          id: Number(id),
        });
      }}
    />
  );
};

export default EditCreditCardScreen;
