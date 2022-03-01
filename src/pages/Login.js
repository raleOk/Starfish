import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, TextField, Link } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../images/logo.png";
import { login } from "../api/api";
import { authContext } from "../auth/useAuth";

const Login = () => {
  const { authLogin } = useContext(authContext);
  const navigate = useNavigate();
  const errorStyles = {
    sx: { width: 180 },
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter you email")
      .email("Enter a valid email.")
      .required("Email is required!"),
    password: yup
      .string("Enter your password.")
      .min(8, "Password should be at least 8 characters long!")
      .matches(
        /[a-z]/,
        "Password should have at least one lowercase character!"
      )
      .matches(
        /[A-Z]/,
        "Password should have at least one uppercase character!"
      )
      .matches(/[0-9]/, "Password should have at least number!")
      .required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const response = await login(values);
        const data = await response.data;
        const token = data.token;

        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userEmail", JSON.stringify(values.email));
        authLogin();
        navigate("/");
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/verify");
        }
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
            spacing={2}
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
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                FormHelperTextProps={errorStyles}
              />
            </Grid>
            <Grid item>
              <Link underline="always" variant="body2" href="/forgot">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit" size="small">
                Login
              </Button>
            </Grid>
            <Grid item>
              <Link underline="always" variant="body2" href="/register">
                Don't have an account? Register here.
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
