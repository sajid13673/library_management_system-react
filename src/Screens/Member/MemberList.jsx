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
  FormControl,
  InputLabel,
  NativeSelect,
  InputBase,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loading from "../../Components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { fetchMembers } from "../../Actions/memberActions";
import useApi from "../../Hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";
export default function MemberList(props) {
  const { fetchData } = useApi();
  const dispatch = useDispatch();
  const perPage = 12;
  const membersData = useSelector((state) => state.members.members);
  const loading = useSelector((state) => state.members.loading);
  const [orderBy, setOrderBy] = useState("created_at-desc");
  console.log(membersData);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages =
    membersData && membersData.data ? membersData.data.last_page : [];
  const data = Array.from(
    membersData && membersData.data ? membersData.data.data : []
  );
  const navigate = useNavigate();
  const getMembers = () => {
    dispatch(fetchMembers({page, perPage, orderBy, searchTerm}));
  };
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
    await fetchData({
      method: "DELETE",
      url: `http://127.0.0.1:8000/api/member/${id}`,
    })
      .then((res) => {
        if (res.data.status) {
          console.log("member deleted");
          dispatch(fetchMembers({page, perPage}));
        }
      })
      .catch((err) => console.log(err));
  }
  function handleChange(e, value) {
    setPage(value);
  }
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getMembers();
  };
  useEffect(() => {
    getMembers();
  }, [page, orderBy]);
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
      <Box
        component="form"
        onSubmit={handleSearch}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "10rem",
          ml: "auto",
          mr: 3,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
      <FormControl sx={{ ml: "auto", mr: 5 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Sort By
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: "filter",
            id: "uncontrolled-native",
          }}
          onChange={handleOrderByChange}
        >
          <option value={"created_at-desc"}>New to old</option>
          <option value={"created_at-asc"}>Old to new</option>
          <option value={"name-asc"}>Name ascending</option>
          <option value={"name-desc"}>Name descending</option>
        </NativeSelect>
      </FormControl>
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
