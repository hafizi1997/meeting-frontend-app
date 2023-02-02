import React, { useState } from "react";
import pic from "./logo.jpg";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import "./Event.css";
import { useSession } from "@supabase/auth-helpers-react";

const validate = (data) => {
  let errors = {};

  if (!data.startDateTime) {
    errors.startDateTime = "Start date is required.";
  }
  if (!data.endDateTime) {
    errors.endDateTime = "End date is required.";
  }

  return errors;
};

const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
const getFormErrorMessage = (meta) => {
  return (
    isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
  );
};

const Event = () => {
  const [showMessage, setShowMessage] = useState(false);
  const session = useSession(); // tokens, when session exists we have a user

  const onSubmit = (data, form) => {
    setShowMessage(true);
    form.restart();
    console.log(data.title);
    console.log(data.attendee);
    const Sent = {
      summary: data.title,
      description: data.description,
      attendees: [
        {
          email: data.attendee,
        },
      ],
      start: {
        dateTime: data.startDateTime.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
      end: {
        dateTime: data.endDateTime.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
    };
    fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.provider_token, // Access token for google
      },
      body: JSON.stringify(Sent),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
      });
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
          <h5>Add event was Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}></p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h1>Add Event</h1>
          <img src={pic} alt="logo"></img>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              title: "",
              description: "",
              attendee: "",
              endDateTime: null,
              startDateTime: null,
              location: "",
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="title"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText id="title" {...input} autoFocus />
                        <label htmlFor="title">title</label>
                      </span>
                    </div>
                  )}
                />
                <Field
                  name="description"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText id="description" {...input} autoFocus />
                        <label htmlFor="description">description</label>
                      </span>
                    </div>
                  )}
                />
                <Field
                  name="attendee"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText id="attendee" {...input} autoFocus />
                        <label htmlFor="attendee">attendee</label>
                      </span>
                    </div>
                  )}
                />

                <Field
                  name="startDateTime"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Calendar
                          id="startDateTime"
                          {...input}
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                          showTime
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label htmlFor="startDateTime">Start Date Time</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="endDateTime"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Calendar
                          id="endDateTime"
                          {...input}
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                          showTime
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label htmlFor="endDateTime">End Date Time</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="location"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText id="location" {...input} autoFocus />
                        <label htmlFor="name">location</label>
                      </span>
                    </div>
                  )}
                />
                <Button type="submit" label="Create" id="testbutton" />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Event;
