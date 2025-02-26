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
  const initialValuesAccount = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validateAccountForm = (values) => {
    const errors = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Required";
    }
    if (!values.newPassword) {
      errors.newPassword = "Required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };
  const CustomErrorMessage = ({ children }) => (
    <Typography variant="body2" color="error">
      {children}
    </Typography>
  );

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
                defaultValue={user?.email}
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
          onSubmit={(values) => {
            console.log(values);
            
          }}
        >
          {({ errors, touched }) => (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="currentPassword"
                      component={CustomErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="New Password"
                      name="newPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="newPassword"
                      component={CustomErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="confirmPassword"
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