import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../Actions/bookActions";
import { fetchMembers } from "../../Actions/memberActions";
import useApi from "../../Hooks/useApi";
function AddBorrowing() {
  const {fetchData} = useApi();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state.bookId;
  const [formData, setFormData] = React.useState({
    member_id: "",
    book_id: bookId,
    due_date: "",
    status: true,
    return_date: "",
  });
  const handleChange = (value) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, member_id: value === null ? "" : value.id };
    });
    setValue(value);
    setError(value === null ? true : false);
  };

  const [members, setMembers] = React.useState({});
  const [book, setBook] = React.useState({});
  const [value, setValue] = React.useState(null);
  const [error, setError] = React.useState(false);
  const defaultProps = {
    options: Array.from(members.data ? members.data : []),
    getOptionLabel: (option) => option.id + ". " + option.name,
  };
  const [loading, setLoading] = React.useState(false);
  async function getMembers() {
    setLoading(true);
    await fetchData({method: "GET", url: "http://127.0.0.1:8000/api/member"})
      .then((res) => {
        if (res.data.status) {
          setMembers(res.data.data);
          setLoading(false);
          console.log(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }
  async function getBookById() {
    await fetchData({method: "GET", url: `http://127.0.0.1:8000/api/book/${bookId}`})
      .then((res) => {
        if (res.data.status) {
          setBook(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }
  async function handleSubmit() {
    if (formData.member_id) {
      const form = new FormData();
      Object.keys(book).map((key) => form.append(key, book[key]));
      form.append("_method", "put");
      form.set("status", 0);
      await fetchData({
        method: "POST",
        url: "http://127.0.0.1:8000/api/borrowing",
        data: formData,
      })
        .then((res) => {
          if (res.data.status) {
            dispatch(fetchBooks({}));
            dispatch(fetchMembers);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
  }
  useEffect(() => {
    getMembers();
    getBookById();
    console.log(members);
    const date = moment().format("YYYY-MM-DDTHH:mm:ss");
    const dueDate = moment(date).add(5, "days").format("YYYY-MM-DD HH:mm:ss");
    setFormData((prevFormData) => {
      return { ...prevFormData, due_date: dueDate };
    });
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1} p={1.5}>
      {loading ? (
        <Loading />
      ) : (
        <Card
          maxWidth="sm"
          sx={{ boxShadow: 2, borderRadius: 2, p: 2, maxWidth: "60rem" }}
        >
          <CardContent>
            <Typography variant="h3">ADD BORROWING</Typography>
            <Divider flexItem />
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" mt={1}>
                <FormControl
                  sx={{ mx: "auto", width: { xs: "100%", sm: "80%" } }}
                >
                  <Autocomplete
                    {...defaultProps}
                    id="controlled-demo"
                    value={value}
                    onChange={(event, newValue) => handleChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Member"
                        variant="standard"
                      />
                    )}
                  />
                  {error && <div className="error">Please select a member</div>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  DUE DATE: {moment(formData.due_date).format("DD MMMM YYYY")}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
              >
                <Typography variant="h6" gridColumn="span 12">
                  Book Details
                </Typography>
                <Typography
                  gridColumn="span 4"
                  variant="body1"
                  color="textSecondary"
                >
                  Title:
                </Typography>
                <Typography
                  gridColumn="span 8"
                  variant="body1"
                  color="textSecondary"
                >
                  {book.title}
                </Typography>
                <Typography
                  gridColumn="span 4"
                  variant="body1"
                  color="textSecondary"
                >
                  Author:
                </Typography>
                <Typography
                  gridColumn="span 8"
                  variant="body1"
                  color="textSecondary"
                >
                  {book.author}
                </Typography>
                <Typography
                  gridColumn="span 4"
                  variant="body1"
                  color="textSecondary"
                >
                  Publisher:
                </Typography>
                <Typography
                  variant="body1"
                  gridColumn="span 8"
                  color="textSecondary"
                >
                  {book.publisher}
                </Typography>
                <Typography
                  gridColumn="span 4"
                  variant="body1"
                  color="textSecondary"
                >
                  Year:
                </Typography>
                <Typography
                  gridColumn="span 8"
                  variant="body1"
                  color="textSecondary"
                >
                  {book.year}
                </Typography>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: "auto", mt: 2, display: { xs: "none", sm: "block" } }}
              />
              <Grid item xs={12} sm={5}>
                <Typography variant="h6">Member Details</Typography>
                {value !== null ? (
                  <Grid display="grid" gridTemplateColumns="repeat(12, 1fr)">
                    <Typography
                      gridColumn="span 4"
                      variant="body1"
                      color="textSecondary"
                    >
                      Name:
                    </Typography>
                    <Typography
                      gridColumn="span 8"
                      variant="body1"
                      color="textSecondary"
                    >
                      {value.name}
                    </Typography>
                    <Typography
                      gridColumn="span 4"
                      variant="body1"
                      color="textSecondary"
                    >
                      Number:
                    </Typography>
                    <Typography
                      gridColumn="span 8"
                      variant="body1"
                      color="textSecondary"
                    >
                      {value.phone_number}
                    </Typography>
                    <Typography
                      gridColumn="span 4"
                      variant="body1"
                      color="textSecondary"
                    >
                      Email:
                    </Typography>
                    <Typography
                      gridColumn="span 8"
                      variant="body1"
                      color="textSecondary"
                    >
                      {value.user.email}
                    </Typography>
                    <Typography
                      gridColumn="span 4"
                      variant="body1"
                      color="textSecondary"
                    >
                      Status:
                    </Typography>
                    <Typography
                      gridColumn="span 8"
                      variant="body1"
                      color="textSecondary"
                    >
                      {value.status ? "Active" : "Inactive"}
                    </Typography>
                  </Grid>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    Not Selected
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ mx: "auto" }}
            >
              Add Borrowing
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
}

export default AddBorrowing;
