import React from "react";
import { getOffer, updateOffer } from "../../api/specialOffersResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import useGetAndUpdate from "../../hooks/useGetAndUpdate";
import useFormAssets from "./validation/useFormAssets";

const EditSpecialOfferScreen = () => {
  const { id, data, isLoading, error, updateLoading, updateError, patcher } =
    useGetAndUpdate({
      key: "specialOfferData",
      invalidateKey: "special-offer-list",
      fetchFn: getOffer,
      updateFn: updateOffer,
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
      title="Edit Offer"
      formLoading={isLoading || loading || updateLoading}
      formError={error || formError || updateError}
      initialValues={initialValues(data)}
      validationSchema={validationSchema}
      formFields={formFields}
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
    />
  );
};

export default EditSpecialOfferScreen;
