import React, { useEffect, useState } from "react";
import BorrowingCard from "../../Components/Borrowing/BorrowingCard";
import { Pagination, Stack, Grid, Typography, Box } from "@mui/material";
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../Actions/bookActions";
import { fetchMembers } from "../../Actions/memberActions";
import { deleteBorrowing, confirmReturn } from "../../Actions/borrowingActions";
import useApi from "../../Hooks/useApi";
function BorrowingList(props) {
  const { fetchData } = useApi();
  const dispatch = useDispatch();
  const deleteSuccess = useSelector((state) => state.borrowing.deleteSuccess);
  const deleteError = useSelector((state) => state.borrowing.deleteError);
  const returnSuccess = useSelector((state) => state.borrowing.returnSuccess);
  const returnError = useSelector((state) => state.borrowing.returnError);
  const [borrowings, setBorrowings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [borrowingPage, setBorrowingPage] = useState(1);
  const [borrowingsPerPage, setBorrowingsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const borrowingsArray = borrowings.data ? Array.from(borrowings.data) : [];
  async function getBorrowings() {
    setLoading(true);
    await fetchData({
      method: "GET",
      url: `http://127.0.0.1:8000/api/borrowing?per_page=${borrowingsPerPage}&page=${borrowingPage}`,
    })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.data);
          setBorrowings(res.data.data);
          setTotalPages(res.data.data.last_page);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }
  async function handleConfirmReturn(id, formData, book) {
    dispatch(confirmReturn(id, formData, book));
  }
  function handleChange(e, value) {
    setBorrowingPage(value);
  }
  async function handleDelete(id) {
    dispatch(deleteBorrowing(id));
  }
  const [currentId, setCurrentId] = useState();
  useEffect(() => {
    getBorrowings();
  }, [borrowingPage]);
  useEffect(() => {
    if (deleteSuccess) {
      getBorrowings();
    }
    if (deleteError) {
      console.log(deleteError);
    }
  }, [deleteSuccess, deleteError]);
  useEffect(() => {
    console.log("return success : " + returnSuccess);

    if (returnSuccess) {
      dispatch(fetchBooks());
      dispatch(fetchMembers());
      getBorrowings();
    }
    if (returnError) {
      console.log(returnError);
    }
  }, [returnSuccess, returnError]);

  return (
    <Box display="flex" flexDirection="column" p={3} flex={1} gap={2}>
      <Grid container xs={12} spacing={2}>
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
              handleConfirmReturn={(id, formData, book) =>
                handleConfirmReturn(id, formData, book)
              }
              currentId={currentId}
              setCurrentId={(id) => setCurrentId(id)}
              handleDelete={(id) => handleDelete(id)}
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
        )}
      </Grid>
      {!loading && borrowingsArray.length > 0 && (
        <Stack spacing={2} sx={{ mt: "auto" }}>
          <Pagination
            count={totalPages}
            page={borrowingPage}
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      )}
    </Box>
  );
}

export default BorrowingList;
