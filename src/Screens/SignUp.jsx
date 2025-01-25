import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useApi from "../Hooks/useApi";
function SignUp() {
  const { fetchData } = useApi();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      address: "",
      phone_number: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      await fetchData({
        method: "POST", 
        url: `http://127.0.0.1:8000/api/register`, 
        data: values})
        .then((res) => {
          res.status && navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "max-content",
            minWidth: "20rem",
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 3,
            borderRadius: 4,
            boxShadow: 4,
          }}
        >
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              error={formik.errors.email}
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input
              error={formik.errors.password}
              name="password"
              type="text"
              aria-describedby="my-helper-text"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {/* {formik.errors.password ? (
                    <ErrorMessage>{formik.errors.password}</ErrorMessage>
                  ) : null} */}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Confirm Password</InputLabel>
            <Input
              error={formik.errors.password_confirmation}
              name="password_confirmation"
              type="text"
              aria-describedby="my-helper-text"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
            />
            {/* {formik.errors.password ? (
                    <ErrorMessage>{formik.errors.password}</ErrorMessage>
                  ) : null} */}
          </FormControl>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              error={formik.errors.name}
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Address</InputLabel>
            <Input
              error={formik.errors.address}
              name="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Phone Number</InputLabel>
            <Input
              error={formik.errors.phone_number}
              name="phone_number"
              type="text"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
            />
          </FormControl>
          <Button
            sx={{ width: { sm: "80%" }, mx: "auto" }}
            type="submit"
            variant="contained"
          >
            Register
          </Button>
          <Button onClick={()=>navigate('/login')} variant="text" size="small" sx={{ fontSize: 10, textTransform: "inherit", width: { sm: "80%" }, mx: "auto" }}>
            Back to Login
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default SignUp;
