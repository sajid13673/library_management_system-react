import { Button, Card, CardActions, CardContent, Grid, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BlockIcon from '@mui/icons-material/Block';

export default function BookCard(props){
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card sx={{ minWidth: 200 }} style={{ width: "200" }}>
        <CardContent>
          <img
            className="memberImage"
            src={props.path !== null ? props.path : props.defaultImage}
            alt="productImage"
          />
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
            {props.author}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="textSecondary">
            {props.publisher}
          </Typography>
          <Typography variant="body2">{props.year}</Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Tooltip title="Edit" placement="top-start">
            <div>
              <Button
                onClick={() => props.handleBookEdit(props.id)}
                size="small"
                variant="contained"
                style={{ backgroundColor: "rgb(0, 172, 14)", color: "white" }}
              >
                <EditIcon />
              </Button>
            </div>
          </Tooltip>
          <Tooltip
            title={!props.activeBorrowings ? "Delete" : "Has active borrowings"}
            placement="top-start"
          >
            <div>
              <Button
                disabled={props.activeBorrowings}
                size="small"
                onClick={() => props.handleBookDelete(props.id)}
                variant="contained"
                color="secondary"
                style={{
                  background: props.activeBorrowings ? "#FFC0C0" : "#E71919",
                }}
              >
                <DeleteForeverIcon />
              </Button>
            </div>
          </Tooltip>
          {!props.activeBorrowings ? (
            <Button onClick={() => props.handleAddBrowing(props.id)} size="small" variant="contained" color="primary" >
              Add Borrowing
              <AddCircleIcon style={{ marginLeft: "5px" }} />
            </Button>
          ) : (
            <Button disabled size="small" variant="contained" color="primary">
              Not Available
              <BlockIcon style={{ marginLeft: "5px" }}/>
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}