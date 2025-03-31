import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../Components/Book/BookCard";
import {
  Box,
  Pagination,
  Stack,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  InputBase,
  IconButton,
} from "@mui/material";
import Loading from "../../Components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../Actions/bookActions";
import useApi from "../../Hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";
export default function BookList(props) {
  const { fetchData } = useApi();
  const dispatch = useDispatch();
  const booksData = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("created_at-desc");
  const perPage = 12;
  const totalPages = booksData && booksData.data ? booksData.data.last_page : 1;
  const [searchTerm, setSearchTerm] = useState("");
  const data = Array.from(
    booksData && booksData.data ? booksData.data.data : []
  );
  const navigate = useNavigate();
  const getBooks = () => {
    dispatch(fetchBooks({ page, perPage, orderBy, searchTerm }));
  };
  function handleBookEdit(id) {
    console.log(id);
    navigate("/edit-book", { state: { id: id } });
  }
  function handleBookDelete(id) {
    fetchData({ method: "DELETE", url: `http://127.0.0.1:8000/api/book/${id}` })
      .then((res) => {
        if (res.data.status) {
          console.log("book deleted");
          dispatch(fetchBooks({ page, perPage, orderBy, searchTerm }));
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
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getBooks();
  };
  React.useEffect(() => {
    console.log("get Book");
    getBooks();
  }, [page, orderBy]);
  return (
    // <Box p={3} flex={1} display="flex" flexDirection="column" gap={2}>
    //   <Box
    //       component="form"
    //       onSubmit={handleSearch}
    //       noValidate
    //       sx={{
    //         display: "flex",
    //         flexDirection: "row",
    //         width: "10rem",
    //         ml: "auto",
    //         mr: 3,
    //       }}
    //     >
    //       <InputBase
    //         sx={{ ml: 1, flex: 1 }}
    //         placeholder="Search"
    //         inputProps={{ "aria-label": "search google maps" }}
    //         onChange={handleSearchChange}
    //         value={searchTerm}
    //       />
    //       <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
    //         <SearchIcon />
    //       </IconButton>
    //     </Box>
    //   <FormControl sx={{ ml: "auto", mr: 3 }}>
    //     <InputLabel variant="standard" htmlFor="uncontrolled-native">
    //       Sort by
    //     </InputLabel>
    //     <NativeSelect
    //       inputProps={{
    //         name: "filter",
    //         id: "uncontrolled-native",
    //       }}
    //       onChange={handleOrderByChange}
    //     >
    //       <option value={"created_at-desc"}>New to old</option>
    //       <option value={"created_at-asc"}>Old to new</option>
    //       <option value={"title-asc"}>Title ascending</option>
    //       <option value={"title-desc"}>Title descending</option>
    //       <option value={"year-desc"}>Year descending</option>
    //       <option value={"year-asc"}>Year ascending</option>
    //     </NativeSelect>
    //   </FormControl>
    //   <Grid container spacing={2}>
    //     {data.length > 0 ? (
    //       data.map((row) => (
    //         <BookCard
    //           key={row.id}
    //           id={row.id}
    //           title={row.title}
    //           author={row.author}
    //           publisher={row.publisher}
    //           year={row.year}
    //           path={row.path}
    //           status={row.status}
    //           activeBorrowings={row.activeBorrowings}
    //           defaultImage={props.defaultImage}
    //           handleBookEdit={(id) => handleBookEdit(id)}
    //           handleBookDelete={(id) => handleBookDelete(id)}
    //           handleAddBrowing={(bookId) => handleAddBrowing(bookId)}
    //         />
    //       ))
    //     ) : (
    //       <Container className="keyMessage">
    //         {!loading ? (
    //           <Typography variant="h3">Nothing to show</Typography>
    //         ) : (
    //           <Loading />
    //         )}
    //       </Container>
    //     )}
    //   </Grid>
    //   <Stack spacing={2} sx={{ mt: "auto" }}>
    //     <Pagination
    //       count={totalPages}
    //       page={page}
    //       color="primary"
    //       onChange={handleChange}
    //     />
    //   </Stack>
    // </Box>

    <Box p={3} flex={1} display="flex" flexDirection="column" gap={1}>
      {!loading && <Box
        component="form"
        onSubmit={handleSearch}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "10rem",
          ml: "auto",
          mr: 3,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>}
      {!loading ? (
        <>
        {data.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={2}>
          <FormControl sx={{ ml: "auto", mr: 3 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Sort by
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "filter",
                id: "uncontrolled-native",
              }}
              onChange={handleOrderByChange}
            >
              <option value={"created_at-desc"}>New to old</option>
              <option value={"created_at-asc"}>Old to new</option>
              <option value={"title-asc"}>Title ascending</option>
              <option value={"title-desc"}>Title descending</option>
              <option value={"year-desc"}>Year descending</option>
              <option value={"year-asc"}>Year ascending</option>
            </NativeSelect>
          </FormControl>
          <Grid container spacing={2}>
            {data.map((row) => (
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
            ))}
          </Grid>
          <Stack spacing={2} sx={{ mt: "auto" }}>
            <Pagination
              count={totalPages}
              page={page}
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </Box>) : 
        (
          <Container className="keyMessage">
            <Typography variant="h3">Nothing to show</Typography>
          </Container>
         )}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
}
