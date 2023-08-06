import React from "react";
import { createNewUser } from "../../api/userAPIs";
import FormikForm from "../../components/formik/FormikForm";
import useCreate from "../../hooks/useCreate";
import useFormAssets from "./validation/useFormAssets";

const CreateUserScreen = ({ noTitle = false }) => {
  const { isLoading, error, mutateAsync } = useCreate({
    fn: createNewUser,
    invalidateKey: ["user-list", "allUsersNoPaginated-key"],
  });

  const { validationSchema, formFields, initialValues } = useFormAssets();

  return (
    <FormikForm
      title={!noTitle && "Add User"}
      formLoading={isLoading}
      formError={error}
      initialValues={initialValues()}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={async (formData) => {
        await mutateAsync({
          ...formData,
          roles: [
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

export default CreateUserScreen;
