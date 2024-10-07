import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../Screens/Login";
import AddMember from "../../Screens/Member/AddMember";
import AddBook from "../../Screens/Book/AddBook";
import NavBar from "../Navbar";
import MemberList from "../../Screens/Member/MemberList";
import BookList from "../../Screens/Book/BookList";
import axios from "axios";
import EditBook from "../Book/EditBook";
import EditMember from "../../Screens/Member/EditMember";
import AddBorrowing from "../../Screens/Borrowing/AddBorrowing";
import MemberBorrowingList from "../../Screens/Member/MemberBorrowingList";
import BorrowingList from "../../Screens/Borrowing/BorrowingList";
import AuthProvider from "../../Utils/authProvider";
import { ProtectedRoute } from "../../Utils/protectedRoute";
import SignUp from "../../Screens/SignUp";
import { createTheme, Paper, ThemeProvider } from "@mui/material";

function App() {
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/laravel-product-list-frontend.appspot.com/o/images%2Fno%20image.jpg?alt=media&token=cfaed1bd-c1f4-4566-8dca-25b05e101829";
  const [members, setMembers] = React.useState({});
  const [books, setBooks] = React.useState({});
  const [login, setLogin] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  function validateEmail(str) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str);
  }
  function validateOnlyNumbers(str) {
    return /^[0-9]*$/.test(str);
  }
  const [bookPage, setBookPage] = React.useState(1);
  const [booksPerPage, setBooksPerPage] = React.useState(9);
  const [memberPage, setMemberPage] = React.useState(1);
  const [membersPerPage, setMembersPerPage] = React.useState(9);
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      h4: {
        color: "#7393B3",
      },
    },
    components: {
      MuiCardContent: {
        defaultProps: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        },
      },
    },
  });
  const getMembers = async () => {
    setLoading(true);
    await axios
      .get(
        `http://127.0.0.1:8000/api/member?page=${memberPage}&per_page=${membersPerPage}`
      )
      .then((res) => {
        console.log(res.data.data);
        setMembers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const getBooks = async () => {
    setLoading(true);
    await axios
      .get(
        `http://127.0.0.1:8000/api/book?page=${bookPage}&per_page=${booksPerPage}`
      )
      .then((res) => {
        console.log(res.data.data);
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  function handleDeleteBorrowing(id) {
    return new Promise(function (resolve, reject) {
      axios
        .delete("http://127.0.0.1:8000/api/borrowing/" + id)
        .then((res) => {
          if (res.data.status) {
            console.log("borrowing deleted");
            resolve(true);
          }
        })
        .catch((err) => reject(err));
    });
  }
  async function handleConfirmReturn(id, formData, book) {
    const form = new FormData();
    Object.keys(book).map((key) => form.append(key, book[key]));
    form.append("_method", "put");
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:8000/api/borrowing/" + id, formData)
        .then((res) => {
          if (res.data.status) {
            resolve(true);
          }
        })
        .catch((err) => reject(err));
    });
  }
  React.useEffect(() => {
    getMembers("", 9);
    getBooks();
  }, [login]);
  React.useEffect(() => {
    getBooks();
  }, [bookPage]);
  React.useEffect(() => {
    getMembers();
  }, [memberPage]);
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ minHeight: "100vh", minWidth: "18rem" }}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <BookList
                        books={books.data ? books.data : []}
                        totalPages={books.last_page ? books.last_page : 1}
                        bookPage={bookPage}
                        setBookPage={(page) => setBookPage(page)}
                        defaultImage={defaultImage}
                        getBooks={() => getBooks()}
                        loading={loading}
                      />
                    </>
                  }
                />
                <Route
                  path="/add-member"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <AddMember
                        getMembers={() => getMembers()}
                        validateEmail={(str) => validateEmail(str)}
                        validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                      />
                    </>
                  }
                />
                <Route
                  path="/edit-member"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <EditMember
                        getMembers={() => getMembers()}
                        validateEmail={(str) => validateEmail(str)}
                        validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                      />
                    </>
                  }
                />
                <Route
                  path="/add-book"
                  exact
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <AddBook
                        getBooks={() => getBooks()}
                        validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                      />
                    </>
                  }
                />
                <Route
                  path="/member-list"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <MemberList
                        members={members.data ? members.data : []}
                        defaultImage={defaultImage}
                        getMembers={() => getMembers()}
                        totalPages={members.last_page ? members.last_page : 1}
                        memberPage={memberPage}
                        setMemberPage={(page) => setMemberPage(page)}
                        loading={loading}
                      />
                    </>
                  }
                />
                <Route
                  path="/edit-book"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <EditBook
                        getBooks={() => getBooks()}
                        validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                      />
                    </>
                  }
                />
                <Route
                  path="/add-borrowing"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <AddBorrowing
                        getBooks={() => getBooks()}
                        getMembers={() => getMembers()}
                      />
                    </>
                  }
                />
                <Route
                  path="/member-borrowing-list"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <MemberBorrowingList
                        handleConfirmReturn={(id, formData, book) =>
                          handleConfirmReturn(id, formData, book)
                        }
                        getBooks={() => getBooks()}
                        getMembers={() => getMembers()}
                        handleDeleteBorrowing={(id) =>
                          handleDeleteBorrowing(id)
                        }
                      />
                    </>
                  }
                />
              </Route>
              <Route
                path="/login"
                element={
                  <Login
                    validateEmail={(str) => validateEmail(str)}
                    setLogin={() => setLogin()}
                  />
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/borrowing-list"
                element={
                  <>
                    <NavBar
                      darkMode={darkMode}
                      setDarkMode={(bool) => setDarkMode(bool)}
                    />
                    <BorrowingList
                      getBooks={() => getBooks()}
                      getMembers={() => getMembers()}
                      handleDeleteBorrowing={(id) => handleDeleteBorrowing(id)}
                      handleConfirmReturn={(id, formData, book) =>
                        handleConfirmReturn(id, formData, book)
                      }
                    />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
