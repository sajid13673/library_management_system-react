import React, { useEffect, useState } from "react";
import BorrowingCard from "../../Components/Borrowing/BorrowingCard";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../Actions/bookActions";
import { fetchMembers } from "../../Actions/memberActions";
import useApi from "../../Hooks/useApi";
import { confirmReturn, deleteBorrowing } from "../../Actions/borrowingActions";
function MemberBorrowingList() {
  const { fetchData } = useApi();
  const dispatch = useDispatch();
  const location = useLocation();
  const memberId = location.state.memberId;
  const deleteSuccess = useSelector((state) => state.borrowing.deleteSuccess);
  const deleteError = useSelector((state) => state.borrowing.deleteError);
  const returnSuccess = useSelector((state) => state.borrowing.returnSuccess);
  const returnError = useSelector((state) => state.borrowing.returnError);
  const [member, setMember] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [borrowingPage, setBorrowingPage] = useState(1);
  const [borrowingsPerPage, setBorrowingsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const borrwings = member.borrowing ? Array.from(member.borrowing.data) : [];
  async function getMemberWithBorrowings() {
    setLoading(true);
    await fetchData({
      method: "GET",
      url: `http://127.0.0.1:8000/api/member/${memberId}?borrowing=1&page=${borrowingPage}&per_page=${borrowingsPerPage}`,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false);
          setMember(res.data.data);
          setTotalPages(res.data.data.borrowing.last_page);
        }
      })
      .catch((err) => console.log(err));
  }
  async function handleConfirmReturn(id, formData) {
    dispatch(confirmReturn(id, formData));
  }
  function handleChange(e, value) {
    setBorrowingPage(value);
  }
  async function handleDelete(id) {
    dispatch(deleteBorrowing(id));
  }

  const [currentId, setCurrentId] = useState();
  useEffect(() => {
    getMemberWithBorrowings();
  }, [borrowingPage]);
  useEffect(() => {
    if (deleteSuccess) {
      getMemberWithBorrowings();
    }
    if (deleteError) {
      console.log(deleteError);
    }
  }, [deleteSuccess, deleteError]);
  useEffect(() => {
    if (returnSuccess) {
      dispatch(fetchBooks({}));
      dispatch(fetchMembers());
      getMemberWithBorrowings();
    }
    if (returnError) {
      console.log(returnError);
    }
  }, [returnSuccess, returnError]);
  return (
    <Box display="flex" flexDirection="column" flex={1} p={2} gap={2}>
      <Grid container xs={12} spacing={2}>
        {borrwings.length > 0 ? (
          borrwings.map((row) => (
            <BorrowingCard
              key={row.id}
              id={row.id}
              book={row.book}
              due_date={row.due_date}
              status={row.status}
              return_date={row.return_date}
              borrowed_date={row.created_at}
              member={member.id + ". " + member.name}
              handleConfirmReturn={(id, formData, book) =>
                handleConfirmReturn(id, formData, book)
              }
              currentId={currentId}
              setCurrentId={(id) => setCurrentId(id)}
              handleDelete={(id) => handleDelete(id)}
            />
          ))
        ) : (
          <Container className="keyMessage">
            {!loading ? (
              <Typography variant="h3">Nothing to show</Typography>
            ) : (
              <Loading />
            )}
          </Container>
        )}
      </Grid>
      {!loading && borrwings.length > 0 && (
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

export default MemberBorrowingList;
