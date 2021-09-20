import { Formik, Form, Field } from "formik";
import React from "react";
import "./Login.css";
import * as Yup from "yup";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useHistory } from "react-router-dom";
const Login = () => {
  let history = useHistory();
  // Notification
  let notyf = new Notyf({
    duration: 1000,
    dismissable: true,
    position: {
      x: "right",
      y: "top",
    },
  });
  return (
    <div className="dv">
      <div>
        <h1>Sign Up</h1>
      </div>
      <Formik
        initialValues={{
          uname: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          uname: Yup.string().required("Please enter Uname"),
          password: Yup.string().required("Please Enter Password"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values.uname.toLocaleLowerCase());
          if (
            values.uname.toLocaleLowerCase() === "admin" &&
            values.password.toLocaleLowerCase() === "admin"
          ) {
            notyf.success("Welcome to the Admin Panel");
            history.push("/Dashboard");
          } else
            notyf.error("Sorry, Please Enter the correct Username or Password");
          setSubmitting(false);
          resetForm({});
        }}
      >
        <Form>
          <label>
            <b>Username</b>
          </label>
          <Field
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          />
          <label>
            <b>Password</b>
          </label>
          <Field
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
          <button type="submit" className="buttn">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default Login;
