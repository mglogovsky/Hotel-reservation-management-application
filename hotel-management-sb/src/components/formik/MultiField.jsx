import { ErrorMessage, Field, FieldArray, useField } from "formik";

const MultiField = ({ name }) => {
  const [{ value }] = useField({ name });
  function makeObjectFromArray(arr) {
    const obj = {};

    arr.forEach((prop) => {
      obj[prop] = "";
    });

    return obj;
  }

  return (
    <FieldArray name={name}>
      {({ insert, remove, push }) =>
        value.map((experience, index, array) => {
          const keys = Object.keys(experience);
          return (
            <div key={index}>
              {keys.map((key) => {
                const fieldName = `${name}.${index}.${key}`;
                return (
                  <div className="form-group" key={key}>
                    <label className="text-capitalize" htmlFor={fieldName}>
                      {key}
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id={fieldName}
                      name={fieldName}
                      placeholder={`Enter ${key}`}
                    />
                    <span className="text-danger">
                      <ErrorMessage name={fieldName} />
                    </span>
                  </div>
                );
              })}

              {
                <div className="d-flex justify-content-between align-items-center my-3">
                  <button
                    type="button"
                    className="btn btn-danger"
                    disabled={array.length === 1}
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => push(makeObjectFromArray(keys))}
                  >
                    Add More Experience
                  </button>
                </div>
              }

              <hr />
            </div>
          );
        })
      }
    </FieldArray>
  );
};

export default MultiField;
