import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { currentUser, updateUser } from "../../../api/userAPIs";
import FormikForm from "../../../components/formik/FormikForm";
import { USER_INFO, USER_ROLE } from "../../../constants/APP_INFO";
import useFormAssets from "./validation/useFormAssets";

const UpdateProfileScreen = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(["current-user"], currentUser);
  const id = USER_INFO?.userId;
  const history = useHistory();
  const {
    isLoading: updateLoading,
    error: updateError,
    mutateAsync: patcher,
  } = useMutation((data) => updateUser({ data, id }), {
    onSuccess: () => {
      queryClient.invalidateQueries(["current-user"]);
      history.push("/");
    },
  });

  const { validationSchema, formFields, initialValues } = useFormAssets();

  return (
    <FormikForm
      title="Update Profile"
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
              name: USER_ROLE,
            },
          ],

          isActive: true,
        });
      }}
    />
  );
};

export default UpdateProfileScreen;
