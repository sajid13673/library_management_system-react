import React, { useEffect, useState } from 'react'
import useApi from '../Hooks/useApi'
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import Loading from '../Components/Loading'
import FineCard from '../Components/FineCard'
function FineList() {
    const { fetchData, error, data, loading } = useApi()
    const [fines, setFines] = React.useState([])
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const getFines = async () => {
        await fetchData({ method: 'GET', url: '/fine'})
    }
    function handleChange(e, value) {
        setPage(value);
      }
    useEffect(() => {
        getFines();
    },[])
    useEffect(() => {
        if(data	){
            console.log(data);
            setFines(data.data)
        }
        if(error){
            console.error(error)
        }
    },[error, data])
  return (
    <Box display="flex" flexDirection="column" p={3} flex={1} gap={2}>
      <Grid container spacing={2}>
        {
            fines?.length > 0 ? (
                fines.map((fine) => (
                    <FineCard
                        amount={fine.amount}
                        days={fine.days}
                        memberName = {fine.member.name}
                        isPaid = {fine.is_paid}
                    />
                ))
            ) : (
                <Box>
                  {!loading ? (
                    <Typography variant="h3">Nothing to show</Typography>
                  ) : (
                    <Loading />
                  )}
                </Box>
              )
              }
      </Grid>
      {!loading && fines?.length > 0 && (
        <Stack spacing={2} sx={{ mt: "auto" }}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      )}
    </Box>
  )
}

export default FineList