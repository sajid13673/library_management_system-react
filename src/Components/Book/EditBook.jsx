import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../Actions/bookActions";
import useApi from "../../Hooks/useApi";
function EditBook(props) {
  const { fetchData } = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [book, setBook] = React.useState({});
  const getBookById = async (id) => {
    await fetchData({method: "GET", url: `http://127.0.0.1:8000/api/book/${id}`}).then((res) => {
      console.log(res.data);
      if (res.data.status) {
        setBook(res.data.data);
      }
    });
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).map((key) => formData.append(key, values[key]));
    formData.append("_method", "put");
    await fetchData({
      method: "POST",
      url: `http://127.0.0.1:8000/api/book/${id}`, 
      data: formData
    })
      .then((res) => {
        if (res.data.status) {
          navigate("/");
          dispatch(fetchBooks(1,9));
        }
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getBookById(id);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <BookForm
        handleSubmit={(values) => handleSubmit(values)}
        validateOnlyNumbers={(str) => props.validateOnlyNumbers(str)}
        book={book}
        title="update book"
      />
    </Box>
  );
}
export default EditBook;
