import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BlockIcon from "@mui/icons-material/Block";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import { useAuth } from "../../Utils/authProvider";

export default function BookCard(props) {
  const { token } = useAuth();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={[
          {
            minWidth: 200,
            boxShadow: 24,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.41)",
            borderRadius: 2,
            backgroundColor: "#daebff",
          },
          (theme) =>
            theme.applyStyles("dark", {
              backgroundColor: "#3d3c3d",
            }),
        ]}
      >
        <CardContent
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.95,
              flex: 1,
              borderRadius: 2,
              background:
                "linear-gradient(45deg, rgb(122, 189, 255) 43%, rgb(199, 227, 255) 84%)",
            },
            (theme) =>
              theme.applyStyles("dark", {
                background:
                  "linear-gradient(45deg, rgba(50,49,50,1) 43%, rgb(73, 70, 70) 84%)",
              }),
          ]}
        >
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
            {props.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {props.author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {props.publisher}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {props.year}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          {token.role === "admin" && (
            <>
              <Tooltip title="Edit" placement="top-start">
                <Button
                  onClick={() => props.handleBookEdit(props.id)}
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(0, 172, 14)",
                    color: "white",
                  }}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip
                title={
                  !props.activeBorrowings ? "Delete" : "Has active borrowings"
                }
                placement="top-start"
              >
                <Button
                  disabled={props.activeBorrowings}
                  size="small"
                  onClick={() => props.handleBookDelete(props.id)}
                  variant="contained"
                  color="secondary"
                  sx={{
                    backgroundColor: props.activeBorrowings
                      ? "#FFC0C0"
                      : "#E71919",
                  }}
                >
                  <DeleteForeverIcon />
                </Button>
              </Tooltip>
            </>
          )}
          {!props.activeBorrowings ? (
            token.role === "admin" ? (
              <Button
                onClick={() => props.handleAddBrowing(props.id)}
                size="small"
                variant="contained"
                color="primary"
              >
                Borrow
                <EventNoteIcon sx={{ ml: 1 }} />
              </Button>
            ) : (
              <Button size="small" variant="contained" color="primary">
                Available
              </Button>
            )
          ) : (
            <Button disabled size="small" variant="contained" color="primary">
              Not Available
              <BlockIcon sx={{ ml: 1 }} />
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
