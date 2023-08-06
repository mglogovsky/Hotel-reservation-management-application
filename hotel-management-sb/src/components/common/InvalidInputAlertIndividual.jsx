import { ErrorMessage } from "formik";

const InvalidInputAlertIndividual = ({ name }) => (
  <div className="text-danger text-left" role="alert">
    <i className="fa fa-info-circle" />{" "}
    <small>
      <ErrorMessage name={name} />
    </small>
  </div>
);

export default InvalidInputAlertIndividual;
