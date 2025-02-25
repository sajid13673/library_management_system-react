import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../Screens/Login";
import AddMember from "../../Screens/Member/AddMember";
import AddBook from "../../Screens/Book/AddBook";
import NavBar from "../Navbar";
import MemberList from "../../Screens/Member/MemberList";
import BookList from "../../Screens/Book/BookList";
import EditBook from "../Book/EditBook";
import EditMember from "../../Screens/Member/EditMember";
import AddBorrowing from "../../Screens/Borrowing/AddBorrowing";
import MemberBorrowingList from "../../Screens/Member/MemberBorrowingList";
import BorrowingList from "../../Screens/Borrowing/BorrowingList";
import { ProtectedRoute } from "../../Utils/protectedRoute";
import SignUp from "../../Screens/SignUp";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import Home from "../../Screens/Home";
import { useAuth } from "../../Utils/authProvider";
import UserBorrowings from "../../Screens/Borrowing/UserBorrowings";
import useApi from "../../Hooks/useApi";
import FineList from "../../Screens/FineList";
function App() {
  const { fetchData: fetchUser, error: userError, data: userData } = useApi([]);
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/laravel-product-list-frontend.appspot.com/o/images%2Fno%20image.jpg?alt=media&token=cfaed1bd-c1f4-4566-8dca-25b05e101829";
  function validateEmail(str) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str);
  }
  function validateOnlyNumbers(str) {
    return /^[0-9]*$/.test(str);
  }
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = React.useState({});
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
      MuiCardHeader: {
        defaultProps: {
          style: {
            textAlign: "center",
            textTransform: "uppercase",
          },
        },
      },
    },
  });
  const { token } = useAuth();
  const getUser = async () => {
    await fetchUser({
      method: "GET",
      url: "http://127.0.0.1:8000/api/profile",
    });
  };
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  useEffect(() => {
    if (userData && userData.status) {
      setUser(userData.data);
    }
    if (userError) {
      console.log(userError);
    }
  }, [userData, userError]);
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          minHeight: "100vh",
          minWidth: "18rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
                    <Home user={user} />
                  </>
                }
              />
              <Route
                path="/book-list"
                element={
                  <>
                    <NavBar
                      darkMode={darkMode}
                      setDarkMode={(bool) => setDarkMode(bool)}
                    />
                    <BookList defaultImage={defaultImage} />
                  </>
                }
              />
            </Route>
            <Route element={<ProtectedRoute roles={["user"]} />}>
              <Route
                path="my-borrowings"
                element={
                  <>
                    <NavBar
                      darkMode={darkMode}
                      setDarkMode={(bool) => setDarkMode(bool)}
                    />
                    <UserBorrowings borrowings={user?.member?.borrowing} />
                  </>
                }
              />
            </Route>
            <Route element={<ProtectedRoute roles={["admin"]} />}>
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
                    <MemberList defaultImage={defaultImage} />
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
                      validateEmail={(str) => validateEmail(str)}
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
                    <AddBorrowing />
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
                    <MemberBorrowingList />
                  </>
                }
              />
              <Route
                path="/borrowing-list"
                element={
                  <>
                    <NavBar
                      darkMode={darkMode}
                      setDarkMode={(bool) => setDarkMode(bool)}
                    />
                    <BorrowingList />
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
                      validateEmail={(str) => validateEmail(str)}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </>
                }
              />
              <Route
                path="/fine-list"
                element={
                  <>
                    <NavBar
                      darkMode={darkMode}
                      setDarkMode={(bool) => setDarkMode(bool)}
                    />
                    <FineList />
                  </>
                }
              />
            </Route>
            <Route
              path="/login"
              element={<Login validateEmail={(str) => validateEmail(str)} />}
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
