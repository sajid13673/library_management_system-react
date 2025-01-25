import React from "react";
import BookForm from "../../Components/Book/BookForm";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../Actions/bookActions";
import useApi from "../../Hooks/useApi";
function AddBook(props) {
  const {fetchData} = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSubmit(values) {
    const formData = new FormData();
    Object.keys(values).map((key) => formData.append(key, values[key]));
    await fetchData({
      method: "POST",
      url: "http://127.0.0.1:8000/api/book",
      data: formData,
    })
      .then((res) => {
        if (res.data.status) {
          dispatch(fetchBooks());
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
      <BookForm
        handleSubmit={(values) => handleSubmit(values)}
        validateOnlyNumbers={(str) => props.validateOnlyNumbers(str)}
        title="ADD BOOK"
      />
    </Box>
  );
}

export default AddBook;
