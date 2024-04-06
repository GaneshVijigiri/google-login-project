import React, { useState } from "react";
import loginStyle from "./Login.module.css";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import GoogleLogin from "./Glogin";
import Profile from "./Profile";

interface User {
  email: string;
  password: string;
}

const initialValues: User = {
  email: "",
  password: "",
};
const validate = Yup.object({
  email: Yup.string().required("email is required"),
  password: Yup.string()
    .min(3, "password minimum has 3 characters length")
    .required("password is required"),
});

const Login = () => {
  const [userObject, setUserObject] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserLogin = (userObject: any) => {
    setIsLoggedIn(true);
  };

  const handleUserLogout = () => {
    setIsLoggedIn(false);
  };

  const onSubmit = (values: User, { resetForm }: FormikHelpers<User>) => {
    alert(values);
    resetForm();
  };

  return (
    <>
      <Paper sx={{ padding: "30px" }}>
        <Box width={400} component={Stack} rowGap={2}>
          <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Typography
                  variant="h4"
                  textAlign="center"
                  fontWeight="bold"
                  gutterBottom
                >
                  Welcome back
                </Typography>
                <Grid container rowSpacing={3}>
                  <Grid item width={"100%"} xs={12}>
                    <TextField
                      label="Email address"
                      fullWidth
                      {...formik.getFieldProps("email")}
                      error={!!formik.errors.email && formik.touched.email}
                    />
                    {formik.errors.email && (
                      <span className={loginStyle.error}>
                        <ErrorMessage name="email" />
                      </span>
                    )}
                  </Grid>
                  <Grid item width={"100%"} xs={12}>
                    <TextField
                      label="Password"
                      fullWidth
                      {...formik.getFieldProps("password")}
                      error={
                        !!formik.errors.password && formik.touched.password
                      }
                    />
                    {formik.errors.password && (
                      <span className={loginStyle.error}>
                        <ErrorMessage name="password" />
                      </span>
                    )}
                  </Grid>
                  <Grid item width={"100%"} xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Divider>OR</Divider>
          <GoogleLogin onUserLogin={handleUserLogin} onUserLogout={handleUserLogout} />
        </Box>
      </Paper>
      {userObject && <Profile user={userObject} />}
    </>
  );
};

export default Login;
