import { Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import BorrowingCard from './borrowingCard';
import { useLocation } from 'react-router-dom'
import { Pagination, Stack } from '@mui/material';
import Loading from '../loading';
function BorrowingList(props) {
    const location = useLocation()
    const [borrowings, setBorrowings] = React.useState([])
    const [totalPages, setTotalPages] = React.useState(1)
    const [borrowingPage, setBorrowingPage] = React.useState(1)
    const [borrowingsPerPage, setBorrowingsPerPage] = React.useState(10)
    const [loading, setLoading] = React.useState(false)
    const borrowingsArray = borrowings.data ? Array.from(borrowings.data) : []
    async function getBorrowings(){
      setLoading(true)
        await axios.get(`http://127.0.0.1:8000/api/borrowing?per_page=${borrowingsPerPage}&page=${borrowingPage}`).then(res => {
            if(res.data.status){
              console.log(res.data.data);
            setBorrowings(res.data.data)
            setTotalPages(res.data.data.last_page)
            setLoading(false)
         }
        }).catch(err=>console.log(err));
    }
    async function handleConfirmReturn(id, formData, book) {
      await props.handleConfirmReturn(id, formData, book).then((res) => {
        if (res) {
          props.getBooks();
          props.getMembers();
          getBorrowings();
        }
      });
    }
    function handleChange(e, value){
      setBorrowingPage(value)
    }
    async function handleDelete(id){
     await props.handleDeleteBorrowing(id).then((res) => {
    if(res){
      getBorrowings()
    }
    })
    }
  
    const [currentId,setCurrentId] = React.useState()
    React.useEffect(() => {
        getBorrowings()
    }, [borrowingPage])
  return (
    <Grid className="grid">
      <Container>
        <Grid container xs={12} spacing={2} style={{ minHeight: "38rem" }}>
          {borrowingsArray.length > 0 ? (
            borrowingsArray.map((row) => (
              <BorrowingCard
                key={row.id}
                id={row.id}
                book={row.book}
                due_date={row.due_date}
                status={row.status}
                return_date={row.return_date}
                borrowed_date={row.created_at}
                member={row.member.id + ". " + row.member.name}
                handleConfirmReturn={(id, formData, book) => handleConfirmReturn(id, formData, book)}
                currentId={currentId}
                setCurrentId={(id) => setCurrentId(id)}
                handleDelete={(id) => handleDelete(id)}
              />
            ))
          ) : 
          
          <Container className='keyMessage'>
            {!loading ? (
            <Typography variant="h3" >
              Nothing to show
            </Typography>
          ) : (
            <Loading />
          )}
          </Container>
          }
        </Grid>
        {!loading && borrowingsArray.length > 0 && (<Stack spacing={2} sx={{ marginTop: "20px" }}>
          <Pagination
            count={totalPages}
            page={borrowingPage}
            color="primary"
            onChange={handleChange}
          />
        </Stack>)}
      </Container>
    </Grid>
  );
}

export default BorrowingList