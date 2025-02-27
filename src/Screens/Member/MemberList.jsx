import React, { useEffect, useState } from "react";
import MembersCard from "../../Components/Member/MembersCard";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  Stack,
  Button,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loading from "../../Components/Loading";
import { useSelector, useDispatch } from "react-redux";
import {fetchMembers} from "../../Actions/memberActions"
import useApi from "../../Hooks/useApi";
export default function MemberList(props) {
  const { fetchData } = useApi();
  const dispatch = useDispatch();
  const perPage = 12;
  const membersData = useSelector((state) => state.members.members);
  const loading = useSelector((state) => state.members.loading);
  console.log(membersData);
  const [page, setPage] = useState(1)
  const totalPages = membersData && membersData.data ? membersData.data.last_page : [];
  const data = Array.from(membersData && membersData.data ? membersData.data.data : []);
  const navigate = useNavigate();
  function handleBorrowings(id) {
    navigate("/member-borrowing-list", { state: { memberId: id } });
  }
  function handleAddMember() {
    navigate("/add-member");
  }
  function handleEditMember(id) {
    navigate("/edit-member", { state: { id: id } });
  }
  async function handleDeleteMember(id) {
    await fetchData({method: "DELETE", url: `http://127.0.0.1:8000/api/member/${id}`})
      .then((res) => {
        if (res.data.status) {
          console.log("member deleted");
          dispatch(fetchMembers(page, perPage));
        }
      })
      .catch((err) => console.log(err));
  }
  function handleChange(e, value) {
    setPage(value);
  }
  useEffect(()=> {
    dispatch(fetchMembers(page, perPage))
  },[page])
  return (
    <Box flex={1} display="flex" flexDirection="column" p={2} gap={2}>
      <Button
        variant="contained"
        sx={{ maxWidth: "15rem" }}
        color="primary"
        onClick={handleAddMember}
      >
        ADD MEMBER
        <AddCircleIcon style={{ marginLeft: "5px" }} />
      </Button>
      <Grid container spacing={2}>
        {data.length > 0 ? (
          data.map((row) => (
            <MembersCard
              key={row.id}
              id={row.id}
              name={row.name}
              email={row.user.email}
              phone_number={row.phone_number}
              address={row.address}
              path={row.path}
              defaultImage={props.defaultImage}
              handleEditMember={(id) => handleEditMember(id)}
              handleDeleteMember={(id) => handleDeleteMember(id)}
              handleBorrowings={(id) => handleBorrowings(id)}
              activeBorrowings={row.activeBorrowingStatus}
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
      {data.length > 0 && !loading && (
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
  );
}
