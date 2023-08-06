import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { signUp } from "../api/userAPIs";
import Error from "../components/common/Error";
import InvalidInputAlert from "../components/common/InvalidInputAlert";
import { SuccessMsg } from "../components/common/reusable/ToasterNotification";
import { PROJECT_NAME } from "../constants/WelcomePage";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Please enter first name."),
  lastName: yup.string().required("Please enter last name."),
  email: yup.string().required("Please enter email."),
  password: yup.string().required("Please enter password."),
  birthOfDate: yup.string().required("Please enter Date of birth."),
  address: yup.string().required("Please enter address."),
  country: yup.string().required("Please enter country."),
  city: yup.string().required("Please enter city."),
  zipCode: yup.string().required("Please enter zipCode."),
  phoneNumber: yup.string().required("Please enter phoneNumber."),
});

/* eslint-disable jsx-a11y/anchor-is-valid */
const RegisterScreen = () => {
  const history = useHistory();

  const { isLoading, error, mutateAsync } = useMutation(
    (data) => signUp(data),
    {
      onSuccess: () => {
        SuccessMsg("Successfully registered, please login!");
        history.push("/");
      },
    }
  );

  return (
    <div className="container overflow-hidden">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-9 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <Link to="/" className="logo d-flex align-items-center w-auto">
                  <span className="d-none d-lg-block">{PROJECT_NAME}</span>
                </Link>
              </div>
              {/* <!-- End Logo --> */}

              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Signup</h5>
                    <p className="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>
                  <Error error={error} />
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      birthOfDate: "",
                      address: "",
                      city: "",
                      country: "",
                      phoneNumber: "",
                      zipCode: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={async (apiData) =>
                      mutateAsync({
                        ...apiData,
                        appUserRoles: [
                          {
                            name: "USER",
                          },
                        ],
                      })
                    }
                  >
                    {({ errors, touched }) => (
                      <fieldset disabled={isLoading}>
                        <Form className="row justify-content-center g-3 needs-validation">
                          <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                              className="form-control"
                            />
                            {touched.firstName && (
                              <InvalidInputAlert error={errors.firstName} />
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                            <Field
                              type="text"
                              name="lastName"
                              id="lastName"
                              className="form-control"
                            />
                            {touched.lastName && (
                              <InvalidInputAlert error={errors.lastName} />
                            )}
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <div>
                              <div className="input-group has-validation">
                                <span className="input-group-text" id="email">
                                  @
                                </span>
                                <Field
                                  type="text"
                                  name="email"
                                  className="form-control"
                                />
                              </div>
                              {touched.email && (
                                <InvalidInputAlert error={errors.email} />
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              className="form-control"
                            />
                            {touched.password && (
                              <InvalidInputAlert error={errors.password} />
                            )}
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="birthOfDate" className="form-label">
                              Date of birth
                            </label>
                            <Field
                              name="birthOfDate"
                              id="birthOfDate"
                              type="date"
                              className="form-control"
                            />
                            {touched.birthOfDate && (
                              <InvalidInputAlert error={errors.birthOfDate} />
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="country" className="form-label">
                              Country
                            </label>
                            <Field
                              name="country"
                              id="country"
                              className="form-control"
                            />
                            {touched.country && (
                              <InvalidInputAlert error={errors.country} />
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="city" className="form-label">
                              City
                            </label>
                            <Field
                              name="city"
                              id="city"
                              className="form-control"
                            />
                            {touched.city && (
                              <InvalidInputAlert error={errors.city} />
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="zipCode" className="form-label">
                              Zip Code
                            </label>
                            <Field
                              name="zipCode"
                              id="zipCode"
                              className="form-control"
                            />
                            {touched.zipCode && (
                              <InvalidInputAlert error={errors.zipCode} />
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="address" className="form-label">
                              Address
                            </label>
                            <Field
                              name="address"
                              id="address"
                              className="form-control"
                            />
                            {touched.address && (
                              <InvalidInputAlert error={errors.address} />
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="phoneNumber" className="form-label">
                              Phone Number
                            </label>
                            <Field
                              name="phoneNumber"
                              id="phoneNumber"
                              className="form-control"
                            />
                            {touched.phoneNumber && (
                              <InvalidInputAlert error={errors.phoneNumber} />
                            )}
                          </div>

                          <div className="d-flex flex-column align-items-center justify-content-around col-12">
                            <div className="mb-3 mt-2">
                              <button
                                className="btn btn-primary w-100"
                                type="submit"
                                disabled={isLoading}
                              >
                                Create Account
                              </button>
                            </div>
                            <div>
                              <p className="small mb-0">
                                Already have an account?{" "}
                                <Link to="/">Log in</Link>
                              </p>
                            </div>
                          </div>
                        </Form>
                      </fieldset>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterScreen;
