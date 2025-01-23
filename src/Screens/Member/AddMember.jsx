import React from "react";
import MemberForm from "../../Components/Member/MemberForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchMembers } from "../../Actions/memberActions";
function AddMember(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (formData, formik) => {
    axios
      .post("http://127.0.0.1:8000/api/member", formData)
      .then((res) => {
        if (res.data.status) {
          dispatch(fetchMembers());
          navigate("/member-list");
        }
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        let errors = err.response.data.errors;
        if (errors.email) {
          formik.setFieldError("email", errors.email);
        }
        if (errors.phone_number) {
          formik.setFieldError("phone_number", errors.phone_number);
        }
      });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      p={2}
    >
      <MemberForm
        validateEmail={(str) => props.validateEmail(str)}
        validateOnlyNumbers={(str) => props.validateOnlyNumbers(str)}
        handleSubmit={(formData, formik) => handleSubmit(formData, formik)}
        type={"add"}
      />
    </Box>
  );
}

export default AddMember;
