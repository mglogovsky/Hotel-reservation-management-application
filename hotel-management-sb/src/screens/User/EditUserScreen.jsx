import React from "react";
import { getUser, updateUser } from "../../api/userAPIs";
import FormikForm from "../../components/formik/FormikForm";
import useGetAndUpdate from "../../hooks/useGetAndUpdate";
import useFormAssetsEdit from "./validation/useFormAssetsEdit";

const EditUserScreen = () => {
  const { id, data, isLoading, error, updateLoading, updateError, patcher } =
    useGetAndUpdate({
      key: "userData",
      invalidateKey: "user-list",
      fetchFn: getUser,
      updateFn: updateUser,
    });

  const { validationSchema, formFields, initialValues } = useFormAssetsEdit();

  return (
    <FormikForm
      title="Edit user"
      formLoading={isLoading || updateLoading}
      formError={error || updateError}
      validationSchema={validationSchema}
      formFields={formFields}
      initialValues={initialValues(data)}
      onSubmit={async (formData) => {
        await patcher({
          ...formData,
          id: Number(id),
          appRoles: [
            {
              name: formData.roles,
            },
          ],

          isActive: true,
        });
      }}
    />
  );
};

export default EditUserScreen;
