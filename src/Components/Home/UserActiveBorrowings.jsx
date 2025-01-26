import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
function UserActiveBorrowings({ user }) {
  console.log(user?.member?.borrowing);

  return (
    <Card sx={{ margin: 3 }}>
      <CardHeader 
        title="Active Borrowings" 
        sx={[
          (theme) => ({
            backgroundColor: theme.palette.primary.main,
            color: "#fff"
          }),
          (theme) =>
            theme.applyStyles('dark', {
              backgroundColor:'rgb(64, 131, 199)',
            }),
        ]}
      />
      <CardContent>
        <Grid 
          container 
          spacing={2}
          justifyContent="center"
        >
          {user?.member?.activeBorrowings.map((borrowing) => (
            <Grid item xs={12} sm={6} key={borrowing.id}>
              <Card 
              sx={[
                {
                  backgroundColor: '#C7E3FF',
                  height: '100%'
                },
                (theme) =>
                  theme.applyStyles('dark', {
                    backgroundColor:'rgb(23, 70, 117)',
                  }),
              ]}>
                <CardContent>
                  <Typography variant="h5" gutterBottom 
                  sx={[
                    (theme) => ({
                      color: theme.palette.primary.main
                    }),
                    (theme) =>
                      theme.applyStyles('dark', {
                        color:'#fff',
                      }),
                  ]}>
                    {borrowing.book.title} by {borrowing.book.author}
                  </Typography>
                  <Divider />
                  <Box
                    display="flex"
                    flexDirection="column"
                    mt={2}
                  >
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Borrowed Date:</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {moment(borrowing.created_at).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Due Date:</Typography>
                      <Typography variant="body2" color="error">
                        {moment(borrowing.due_date).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserActiveBorrowings;
