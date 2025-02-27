import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useApi from "../Hooks/useApi";

export default function Settings({ user, userLoading, userError }) {
  const { fetchData, loading, data, error } = useApi();
  const [passwordAlert, setPasswordAlert] = useState({
    status: false,
    message: "",
    type: "success",
  });
  const initialValuesAccount = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validateAccountForm = (values) => {
    const errors = {};
    if (!values.current_password) {
      errors.current_password = "Required";
    }
    if (!values.new_password) {
      errors.new_password = "Required";
    }
    if (values.new_password === values.current_password) {
        errors.new_password = "New password cannot be the same as current password";
      }
    if (!values.confirm_password) {
      errors.confirm_password = "Required";
    } else if (values.new_password !== values.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }
    return errors;
  };
  const CustomErrorMessage = ({ children }) => (
    <Typography variant="body2" color="error">
      {children}
    </Typography>
  );
  useEffect(() => {
    if (data.status) {
      setPasswordAlert(true);
      setPasswordAlert({
        status: true,
        message: "Password changed successfully!",
        type: "success",
      });
      console.log("password changed");
      console.log(data);
    }
    if (error) {
      setPasswordAlert({
        status: true,
        message:
          error.response.data.errors && error.response.data.errors.length > 0
            ? error.response.data.errors[0].msg
            : error.response.data.message,
        type: "error",
      });

      console.log(error);
      console.log(error.message);
    }
  }, [data, error]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Divider />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Profile Settings
        </Typography>
        {!userLoading && !userError ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                label="Name"
                fullWidth
                variant="outlined"
                defaultValue={user?.member?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                label="Email"
                fullWidth
                variant="outlined"
                defaultValue={user.email}
              />
            </Grid>
          </Grid>
        ) : (
          <Box display={"flex"}>
            {" "}
            {userLoading ? (
              <CircularProgress sx={{ my: 1, mx: "auto" }} />
            ) : (
              <Typography textTransform="uppercase" color="error" mx="auto">
                something went wrong
              </Typography>
            )}{" "}
          </Box>
        )}
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ mt: 4 }}>
        <Formik
          initialValues={initialValuesAccount}
          validate={validateAccountForm}
          onSubmit={async (values, { resetForm }) => {
            const response = await fetchData({
              method: "POST",
              url: "/change_password",
              data: values,
            });
            if (response && response.status === 200) {
              resetForm();
            }
          }}
        >
          {({ errors, touched }) => (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              {passwordAlert.status && (
                <Alert severity={passwordAlert.type}>
                  {passwordAlert.message}
                </Alert>
              )}
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="Current Password"
                      name="current_password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="current_password"
                      component={CustomErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="New Password"
                      name="new_password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="new_password"
                      component={CustomErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="Confirm Password"
                      name="confirm_password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="confirm_password"
                      component={CustomErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      disabled={loading}
                      startIcon={loading && <CircularProgress size={20} />}
                      variant="contained"
                      color="primary"
                    >
                      {loading ? "updating" : "Update Password"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
      <Divider sx={{ my: 4 }} />
    </Container>
  );
}