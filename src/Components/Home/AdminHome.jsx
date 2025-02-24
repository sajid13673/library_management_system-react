import React, { useState, useEffect, useDebugValue } from "react";
import useApi from "../../Hooks/useApi";
import { Box, CircularProgress, Grid, Typography, Alert, Button } from "@mui/material";
import BookStat from "./BookStat";

function AdminHome() {
  const { fetchData, data, error, loading } = useApi([]);
  const [bookStats, setBookStats] = useState({});

  const getBooksData = async () => {
    fetchData({ method: "GET", url: `/book/stats` });
  };

  useEffect(() => {
    getBooksData();
  }, []);
  useEffect(() => {
    if (data?.status) {
      setBookStats(data.data);
    }
    if (error) {
      console.error(error);
    }
  }, [data, error]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase",
          mb: 2,
          fontWeight: 600,
          color: `#1976d2`,
        }}
      >
        Book Stats
      </Typography>
      {!loading ? !error ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <BookStat label="Total Books" value={bookStats?.totalBooks} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <BookStat label="Issued Books" value={bookStats?.issuedBooks} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <BookStat
              label="Available Books"
              value={bookStats?.availableBooks}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <BookStat label="Overdue Books" value={bookStats?.overdueBooks} />
          </Grid>
        </Grid>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Alert severity="error" sx={{ mb: 2 }}>
            An error occurred while fetching book stats. Please try again later.
          </Alert>
          <Button variant="contained" color="primary" onClick={getBooksData} sx={{ mt: 2 }}>
            Retry
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default AdminHome;
