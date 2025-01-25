import React from "react";
import MemberForm from "../../Components/Member/MemberForm";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchMembers } from "../../Actions/memberActions";
import useApi from "../../Hooks/useApi";
function AddMember(props) {
  const { fetchData } = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (formData, formik) => {
    await fetchData({
      method: "POST",
      url: "http://127.0.0.1:8000/api/member",
      data: formData,
    })
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
