import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const BookStat = ({ label, value }) => {
  return (
    <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="body1" sx={{ alignSelf: 'flex-start', color: `rgb(25, 118, 210)` }}>{label}</Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: '600', 
            background: 'linear-gradient(45deg,rgb(25, 118, 210),rgb(139, 223, 242))', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent'
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookStat;
