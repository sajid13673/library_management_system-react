import React, { useState, useEffect } from 'react';
import useApi from '../../Hooks/useApi';
import { Box, Grid, Typography } from '@mui/material';
import BookStat from './BookStat'; 

function AdminHome() {
  const { fetchData } = useApi([]);
  const [bookStats, setBookStats] = useState({});

  const getBooksData = async () => {
    fetchData({ method: 'GET', url: `/books/stats` })
    .then((res) => {
      if (res.status) {
        setBookStats(res.data);
      }
    }).catch(err => console.error(err));
  };

  useEffect(() => {
    getBooksData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" sx={{ textTransform: 'uppercase', mb: 2, fontWeight: 600, color: `#1976d2` }}>
        Book Stats
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <BookStat label="Total Books" value={bookStats.totalBooks} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <BookStat label="Issued Books" value={bookStats.issuedBooks} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <BookStat label="Available Books" value={bookStats.availableBooks} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <BookStat label="Overdue Books" value={bookStats.overdueBooks} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminHome;
