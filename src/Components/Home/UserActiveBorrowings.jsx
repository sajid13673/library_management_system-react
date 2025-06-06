import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import moment from "moment";
import BookIcon from "@mui/icons-material/Book";

function UserActiveBorrowings({ user }) {
  console.log(user?.member?.borrowings);

  return (
    <Card
      sx={[
        { height: "100%" },
        (theme) =>
          theme.applyStyles("dark", {
            boxShadow: "0px 2px 5px rgba(61, 166, 236, 0.5)",
          }),
      ]}
    >
      <CardHeader
        title="Active Borrowings"
        sx={[
          {
            height: "1rem",
            background:
              "linear-gradient(45deg, rgba(25,118,220,1) 0%, rgba(23,210,252,1) 100%)",
            color: "#fff",
          },
          (theme) =>
            theme.applyStyles("dark", {
              background:
                "linear-gradient(45deg, rgba(8,75,148,1) 0%, rgba(17,153,184,1) 100%)",
            }),
        ]}
      />
      <CardContent>
        <Grid
          container
          spacing={1}
          sx={{
            maxHeight: "25rem",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
          justifyContent="center"
        >
          {user?.member?.activeBorrowings?.length > 0 ? (
            user?.member?.activeBorrowings.map((borrowing) => (
              <Grid item xs={12} key={borrowing.id}>
                <Card
                  sx={[
                    {
                      height: "100%",
                    },
                    {
                      backgroundColor: "#C7E3FF",
                    },
                    (theme) =>
                      theme.applyStyles("dark", {
                        backgroundColor: "rgb(23, 70, 117)",
                      }),
                  ]}
                  variant="filled"
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BookIcon
                        sx={(theme) => ({
                          mr: 1,
                          color: theme.palette.primary.main,
                        })}
                      />
                      <Typography
                        variant="h6"
                        sx={(theme) => ({
                          color: theme.palette.primary.main,
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        })}
                      >
                        {borrowing.book.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        by{" "}
                        <Typography component="span" textTransform="capitalize">
                          {borrowing.book.author}
                        </Typography>
                      </Typography>
                    </Box>

                    <Divider />
                    <Box display="flex" flexDirection="column" mt={2}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        gap={0.5}
                        mb={1}
                      >
                        <Typography variant="body2">
                          Borrowed Date :{" "}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {moment(borrowing.created_at).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        gap={0.5}
                        mb={1}
                      >
                        <Typography variant="body2">Due Date :</Typography>
                        <Typography variant="body2" color="error">
                          {moment(borrowing.due_date).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Box
                sx={[
                  (theme) => ({
                    backgroundColor: "#f0f0f0",
                    padding: 3,
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100px",
                    color: theme.palette.text.secondary,
                  }),
                  (theme) =>
                    theme.applyStyles("dark", {
                      backgroundColor: "rgb(23, 70, 117)",
                      color: "#fff",
                    }),
                ]}
              >
                <Typography
                  variant="h6"
                  sx={[
                    (theme) => ({
                      color: theme.palette.text.secondary,
                    }),
                    (theme) =>
                      theme.applyStyles("dark", {
                        color: "#fff",
                      }),
                  ]}
                >
                  No active borrowings
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserActiveBorrowings;
