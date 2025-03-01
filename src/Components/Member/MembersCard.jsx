import * as React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/List";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  Grid,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

export default function MembersCard(props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: "100%",
          minWidth: 275,
          display: 'flex',
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ display: 'flex', justifyContent: 'center', flex:1 }}>
          <>
          <Box
            component="img"
            sx={{
              maxWidth: 100,
              borderRadius: 1.7,
              mb: 1,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.41)",
            }}
            src={props.path !== null ? props.path : props.defaultImage}
            alt="productImage"
          />
          <Typography variant="h6" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {props.phone_number}
          </Typography>
          <Typography sx={{ mb: 0.5 }} variant="body2" color="textSecondary">
            {props.email}
          </Typography>
          <Typography variant="body2">{props.address}</Typography>
          </></CardContent>
        <CardActions sx={{ mt: 'auto', justifyContent: 'center' }} >
          <Tooltip title="EDIT" placement="top-start">
            <Button
              onClick={() => props.handleEditMember(props.id)}
              size="small"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "rgb(0, 172, 14)", color: "white" }}
            >
              <EditIcon />
            </Button>
          </Tooltip>
          <Tooltip
            title={!props.activeBorrowings ? "Delete" : "Has active borrowings"}
            placement="top-start"
          >
            <>
              <Button
                onClick={() => props.handleDeleteMember(props.id)}
                size="small"
                disabled={props.activeBorrowings}
                variant="contained"
                color="secondary"
                style={{
                  background: props.activeBorrowings ? "#FFC0C0 " : "#E71919",
                }}
              >
                <DeleteForeverIcon />
              </Button>
            </>
          </Tooltip>
          <>
            <Button
              onClick={() => props.handleBorrowings(props.id)}
              size="small"
              variant="contained"
              color="primary"
            >
              Borrowings
              <ListIcon style={{ marginLeft: "5px" }} />
            </Button>
          </>
        </CardActions>
      </Card>
    </Grid>
  );
}
