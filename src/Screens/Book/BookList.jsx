import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../Components/Book/BookCard";
import axios from "axios";
import {
  Box,
  Pagination,
  Stack,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Loading from "../../Components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../Actions/bookActions";

export default function BookList(props) {
  const dispatch = useDispatch();
  const booksData = useSelector((state) => state.books.books);
  console.log(booksData);
  
  const [page, setPage] = useState(1);
  const totalPages = booksData && booksData.data ? booksData.data.last_page : 1;
  const data = Array.from(booksData && booksData.data ? booksData.data.data : []);
  const navigate = useNavigate();
  function handleBookEdit(id) {
    console.log(id);
    navigate("/edit-book", { state: { id: id } });
  }
  function handleBookDelete(id) {
    axios
      .delete("http://127.0.0.1:8000/api/book/" + id)
      .then((res) => {
        if (res.data.status) {
          console.log("book deleted");
          dispatch(fetchBooks(1,9));
        }
      })
      .catch((err) => console.log(err));
  }
  function handleAddBrowing(bookId) {
    navigate("/add-borrowing", { state: { bookId: bookId } });
  }
  function handleChange(e, value) {
    setPage(value);
  }
  React.useEffect(() => {
    console.log("get Book");
    dispatch(fetchBooks(page,9));
  }, [page]);
  return (
    <Box p={3} flex={1} display="flex" flexDirection="column" gap={2}>
      <Grid container spacing={2}>
        {data.length > 0 ? (
          data.map((row) => (
            <BookCard
              key={row.id}
              id={row.id}
              title={row.title}
              author={row.author}
              publisher={row.publisher}
              year={row.year}
              path={row.path}
              status={row.status}
              activeBorrowings={row.activeBorrowings}
              defaultImage={props.defaultImage}
              handleBookEdit={(id) => handleBookEdit(id)}
              handleBookDelete={(id) => handleBookDelete(id)}
              handleAddBrowing={(bookId) => handleAddBrowing(bookId)}
            />
          ))
        ) : (
          <Container className="keyMessage">
            {!props.loading ? (
              <Typography variant="h3">Nothing to show</Typography>
            ) : (
              <Loading />
            )}
          </Container>
        )}
      </Grid>
      <Stack spacing={2} sx={{ mt: "auto" }}>
        <Pagination
          count={totalPages}
          page={page}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
}
