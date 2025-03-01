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
import Settings from "../../Screens/Settings";
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from "../../Context/ThemeContext";
import Layout from "../Layout";
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
  const { darkMode } = useTheme();
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
      MuiCard: {
        defaultProps: {
          style: {
            background:
              darkMode &&
              "linear-gradient(45deg, rgb(35, 35, 35) 48%, rgba(46, 46, 46, 0.78) 95%)",
              boxShadow: "2px 5px 8px rgba(0, 0, 0, 0.41),  -0px -2px rgba(0, 0, 0, 0.07)",
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
            {/* common protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                    <Layout>
                      <Home user={user} />
                    </Layout>
                }
              />
              <Route
                path="/book-list"
                element={
                  <Layout>
                    <BookList defaultImage={defaultImage} />
                  </Layout>
                }
              />
              <Route
                path="/settings"
                element={
                  <Layout>
                  <Settings
                    user={user}
                  />
                  </Layout>
                }
                />
            </Route>
            {/* user protected routes */}
            <Route element={<ProtectedRoute roles={["user"]} />}>
              <Route
                path="my-borrowings"
                element={
                  <Layout>
                    <UserBorrowings borrowings={user?.member?.borrowing} />
                  </Layout>
                }
              />
            </Route>
            {/* admin protected routes */}
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route
                path="/add-book"
                exact
                element={
                  <Layout>
                    <AddBook
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/member-list"
                element={
                  <Layout>
                    <MemberList defaultImage={defaultImage} />
                  </Layout>
                }
              />
              <Route
                path="/edit-book"
                element={
                  <Layout>
                    <EditBook
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/edit-member"
                element={
                  <Layout>
                    <EditMember
                      validateEmail={(str) => validateEmail(str)}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/add-borrowing"
                element={
                  <Layout>
                    <AddBorrowing />
                  </Layout>
                }
              />
              <Route
                path="/member-borrowing-list"
                element={
                  <Layout>
                    <MemberBorrowingList />
                  </Layout>
                }
              />
              <Route
                path="/borrowing-list"
                element={
                  <Layout>
                    <BorrowingList />
                  </Layout>
                }
              />
              <Route
                path="/add-member"
                element={
                  <Layout>
                    <AddMember
                      validateEmail={(str) => validateEmail(str)}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/fine-list"
                element={
                  <Layout>
                    <FineList />
                  </Layout>
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
const AppWrapper = () => (
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);
export default AppWrapper;
