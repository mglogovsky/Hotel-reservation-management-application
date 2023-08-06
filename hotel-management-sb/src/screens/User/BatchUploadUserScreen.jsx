import { Form, Formik } from "formik";
import React from "react";
import { batchUploadUser } from "../../api/userAPIs";
import Card from "../../components/common/Card";
import Error from "../../components/common/Error";
import InputFieldContainer from "../../components/common/InputFieldContainer";
import SubmitBtn from "../../components/common/SubmitBtn";
import Title from "../../components/common/Title";
import YUP from "../../constants/yup";
import useCreate from "../../hooks/useCreate";

const validationSchema = YUP.object().shape({
  file: YUP.mixed().required("You must upload an Excel file"),
});

const BatchUploadUserScreen = () => {
  const { isLoading, error, mutateAsync } = useCreate({
    fn: batchUploadUser,
    invalidateKey: "user-list",
  });

  return (
    <Card className="p-4">
      <Title title="Batch Upload User" />
      <Error error={error} />
      <Formik
        initialValues={{ file: null }}
        validationSchema={validationSchema}
        enctype="multipart/form-data"
        onSubmit={async (data) => {
          const formData = new FormData();
          formData.append("file", data.file);
          await mutateAsync(formData);
        }}
      >
        {({ setFieldValue, errors }) => (
          <Form>
            <fieldset disabled={isLoading}>
              <div className="mb-4">
                <InputFieldContainer label={"Select Excel"} error={errors.file}>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(event) => {
                      setFieldValue("file", event.target.files[0]);
                    }}
                    className="form-control"
                    required
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                </InputFieldContainer>
              </div>
              <SubmitBtn label={"Submit"} loading={isLoading} />
            </fieldset>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default BatchUploadUserScreen;
