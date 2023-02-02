import React, { useState } from "react";
import pic from "./logo.jpg";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { courses } from "../data/Courses";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import "./Register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});


  const validate = (data) => {
    let errors = {};

    if (!data.names) {
      errors.names = "Name is required.";
    }

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
      const response = await axios.post("http://localhost:5000/register", {
        names: data.names,
        email: data.email,
        password: data.password,
        academic: data.course.name,
        birthday: data.birthday,
      });
  
      const { status, error, } = response.data;
  
      if (status === "ok") {
        console.log("ok")
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
        label="Go"
        className="p-button-text"
        autoFocus
        onClick={() => {
          setShowMessage(false);
          
          navigate('/Login');
        }}
  
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-3">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
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
            You will be headed to Login page

          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h1>Register</h1>
          <img src={pic} alt="logo"></img>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              names: "",
              email: "",
              password: "",
              birthday: null,
              course: null,
              // accept: false,
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="names"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="names"
                          {...input}
                          autoFocus
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="names"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Name*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
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
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          id="password"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
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
                <Field
                  name="birthday"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Calendar
                          id="birthday"
                          {...input}
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                        />
                        <label htmlFor="birthday">Birthday</label>
                      </span>
                    </div>
                  )}
                />
                <Field
                  name="course"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Dropdown
                          id="course"
                          {...input}
                          options={courses}
                          optionLabel="name"
                        />
                        <label htmlFor="course">Choose Courses</label>
                      </span>
                    </div>
                  )}
                />
        

                <Button type="submit" label="Sign Up" id="testbutton" />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
