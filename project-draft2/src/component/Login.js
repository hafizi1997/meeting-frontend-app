import React, { useState } from "react";
import pic from "./logo.jpg";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import "./Register.css";
import axios from "axios";

const Login = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [toggleMask, setToggleMask] = useState("");

  const validate = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };
  const onSubmit = async (data, form) => {
    try {
      const response = await axios.post("http://localhost:5000/login-user", {
        email: data.email,
        password: data.password,
      });

      const { status, error, data: token } = response.data;

      if (status === "ok") {
        console.log("ok");
        setFormData(data);
        setShowMessage(true);
        form.restart();
      } else {
        alert(error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            here is ur link{" "}
            <a href="https://meet.google.com/hfe-ivuq-ovj">zoom meeting</a>
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h1>Login</h1>
          <img src={pic} alt="logo"></img>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              email: "",
              password: "",
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="password"
                  type={toggleMask ? "text" : "password"}
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i
                          className={
                            toggleMask ? "pi pi-eye" : "pi pi-eye-slash"
                          }
                          onClick={() => setToggleMask(!toggleMask)}
                        />
                        <InputText
                          id="password"
                          {...input}
                          type={toggleMask ? "text" : "password"}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Password*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Button type="submit" label="Login" id="testbutton" />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
