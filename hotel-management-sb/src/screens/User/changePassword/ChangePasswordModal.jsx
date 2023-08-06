import { useMutation } from "@tanstack/react-query";
import React from "react";
import { updatePassword } from "../../../api/userAPIs";
import Modal from "../../../components/common/Modal";
import FormikFrom from "../../../components/formik/FormikForm";
import { USER_INFO } from "../../../constants/APP_INFO";
import useFormAssets from "./validation/useFormAssets";

const ChangePasswordModal = ({ handleClose, show, user = {} }) => {
  const { validationSchema, formFields, initialValues } = useFormAssets();

  const { isLoading, error, mutateAsync } = useMutation(
    (data) => updatePassword(data),
    {
      onSuccess: () => {
        handleClose();
      },
    }
  );

  return (
    <Modal handleClose={handleClose} show={show} width={600}>
      <FormikFrom
        title={user.email ? `Email : ${user.email}` : "Change Password"}
        onSubmit={async (formData) =>
          await mutateAsync({
            password: formData.password,
            userId: user.id ? user.id : USER_INFO.userId,
          })
        }
        formLoading={isLoading}
        formError={error}
        validationSchema={validationSchema}
        formFields={formFields}
        initialValues={initialValues()}
      />
    </Modal>
  );
};

export default ChangePasswordModal;
