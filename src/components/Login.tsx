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

  const onSubmit = (values: User, { resetForm }: FormikHelpers<User>) => {
    alert(values);
    resetForm();
  };

  const handleUserLogin = (user: any) => {
    setUserObject(user);
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
          <GoogleLogin onUserLogin={handleUserLogin} />
        </Box>
      </Paper>
      {userObject && (
        <div>
          <h2>User Details</h2>
          <p>Name: {userObject.name}</p>
          <p>Mail: {userObject.email}</p>
          <img src={userObject.picture} />
        </div>
      )}
    </>
  );
};

export default Login;
