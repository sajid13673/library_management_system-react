import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import React, { useEffect } from "react";
import moment from "moment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../../Utils/authProvider";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      border: 0,
      fontSize: 11,
    },
  },
});
function BorrowingCard(props) {
  const classes = useStyles();
  const {token} = useAuth();
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [formData, setFormData] = React.useState({
    status: false,
    return_date: null,
    _method: "put",
  });

  function handleChange(value) {
    const return_date =
      value === null
        ? null
        : moment(value.toDate()).format("YYYY-MM-DD HH:mm:ss");
    console.log("date :" + return_date);
    setError(false);
    setFormData((prevFormData) => {
      return { ...prevFormData, return_date: return_date };
    });
  }
  function handleSetReturnDate(id) {
    props.setCurrentId(id);
    setFormData((prevFormData) => {
      return { ...prevFormData, return_date: null };
    });
  }
  function handleSubmit(id, formData, book) {
    if (formData.return_date === null) {
      setError(true);
      setErrorMsg("Required");
    } else if (formData.return_date === "Invalid date") {
      setError(true);
      setErrorMsg("Enter Valid Date");
    } else if (
      !moment(props.borrowed_date).isBefore(moment(formData.return_date))
    ) {
      setError(true);
      setErrorMsg("Entered date is before the borrowed date");
    } else {
      props.handleConfirmReturn(id, formData, book);
    }
  }
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ height: "100%", maxHeight: "25rem", boxShadow: 5 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.member}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={7} sx={{ pr: "30px", alignContent: "center" }}>
              <Grid container spacing={1} style={{ marginBottom: "10px" }}>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" component="p">
                    Borrowed Date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    align="left"
                    variant="body1"
                    component="p"
                    color="textSecondary"
                  >
                    {moment(props.borrowed_date).format("DD MMMM YYYY")}
                    <br />
                    {moment(props.borrowed_date).format("hh:mm:ss A")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" component="p">
                    Due date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    align="left"
                    variant="body1"
                    color="error"
                    component="p"
                  >
                    {moment(props.due_date).format("DD MMMM YYYY")}
                    <br />
                    {moment(props.due_date).format("hh:mm:ss A")}
                  </Typography>
                </Grid>
              </Grid>
              {!props.status ? (
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="p" align="left">
                      Return Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      {moment(props.return_date).format("DD MMMM YYYY")}
                      <br />
                      {moment(props.return_date).format("hh:mm:ss A")}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  xs={12}
                  spacing={1}
                  style={{ alignItems: "center" }}
                >
                  <Grid item xs={props.currentId === props.id ? 4 : 6}>
                    <Typography
                      variant="body1"
                      align="left"
                      component="p"
                    >
                      Return Date:
                    </Typography>
                  </Grid>
                  {props.currentId === props.id ? (
                    <Grid item xs={8}>
                      <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            className={classes.root}
                            onChange={(newValue) => handleChange(newValue)}
                            slotProps={{
                              textField: { size: "small", fontSize: "sm" },
                            }}
                          />
                        </LocalizationProvider>
                        {error && <div className="error">{errorMsg}</div>}
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={6}>
                     {token.role === "admin" ? 
                     (<Button
                        onClick={() => handleSetReturnDate(props.id)}
                        size="small"
                        variant="contained"
                        color="primary"
                      >
                        set return date
                      </Button>): (
                        <Typography fontWeight={600} textTransform='uppercase' variant="body2" color='error'>not returned</Typography>
                      )}
                    </Grid>
                  )}
                  {props.currentId === props.id && (
                    <Grid item xs={2}>
                      <Tooltip
                        title="CONFIRM RETURNED"
                        placement="top-start"
                        TransitionComponent={Zoom}
                      >
                        <ButtonGroup>
                        <Button
                          onClick={() =>
                            handleSubmit(props.id, formData, props.book)
                          }
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <DoneOutlineIcon />
                        </Button>
                        <Button sx={{ ml:4 }} color="error" variant='contained' onClick={()=>props.setCurrentId(null)}><CloseIcon/></Button>
                        </ButtonGroup></Tooltip>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} sm={5} >
              {props.book !== null && (
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                  <Typography
                    variant="h6"
                    component="p"
                    align="left"
                    gridColumn="span 12"
                  >
                    Book Details
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gridColumn="span 4"
                    component="p"
                    align="left"
                  >
                    Title:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gridColumn="span 8"
                    align="left"
                  >
                    {props.book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gridColumn="span 4"
                    align="left"
                  >
                    Author:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gridColumn="span 8"
                    align="left"
                  >
                    {props.book.author}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gridColumn="span 4"
                    align="left"
                  >
                    Publisher:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gridColumn="span 8"
                    align="left"
                  >
                    {props.book.publisher}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gridColumn="span 4"
                    align="left"
                  >
                    Year:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gridColumn="span 8"
                    align="left"
                  >
                    {props.book.year}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
        {token.role === "admin" &&	(
          <CardActions style={{ justifyContent: "right" }}>
          {!props.status && (
            <Button
              onClick={() => props.handleDelete(props.id)}
              size="small"
              variant="contained"
              color="secondary"
              style={{ background: "#E71919" }}
            >
              Delete
              <DeleteForeverIcon style={{ marginLeft: "5px" }} />
            </Button>
          )}
        </CardActions>
        )}
        
      </Card>
    </Grid>
  );
}
export default BorrowingCard;
