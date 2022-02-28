import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../images/logo.png";
import { forgot } from "../api/api";

const Forgot = () => {
  const navigate = useNavigate();
  const errorStyles = {
    sx: { width: 180 },
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await forgot(values);
        navigate("/verify", {
          state: { from: "/forgot", email: values.email },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <img src={logo} alt="logo" />
      </Grid>
      <Grid item>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                FormHelperTextProps={errorStyles}
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit" size="small">
                Send reset code
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Forgot;