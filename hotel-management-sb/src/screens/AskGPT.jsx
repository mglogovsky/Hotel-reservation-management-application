import { Field, Form, Formik } from "formik";
import React from "react";
import LoadingOverlay from "react-loading-overlay";
import "../App.css";
import ChatGPT from "../components/ChatGPT";
import Title from "../components/common/Title";
import useGPT from "../hooks/useGPT";

const AskGPT = () => {
  const { result, handleSubmit } = useGPT();
  return (
    <div>
      <div className="bg-white px-3">
        <Title title="Ask GPT" />
      </div>
      <div className="row">
        <div className="col-md-12 mx-auto">
          <LoadingOverlay
            active={result.loading}
            spinner
            text="Loading your content..."
          >
            <div className="chatbox  bg-white p-3 border">
              {result?.data?.map((item, index, array) => (
                <ChatGPT
                  text={item.text}
                  isGpt={item.isGtp}
                  key={index}
                  isLast={index === array.length - 1}
                />
              ))}
            </div>
          </LoadingOverlay>

          <Formik
            initialValues={{
              message: "",
            }}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form className="mt-3">
              <fieldset disabled={result.loading}>
                <div className="input-group">
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    name="message"
                    required
                  />
                  <button className="btn btn-primary" type="submit">
                    {result.loading ? "Please wait..." : "Send"}
                  </button>
                </div>
              </fieldset>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AskGPT;
