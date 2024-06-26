import { AppBar,  Box, Button, Container, IconButton, Menu, MenuItem, Toolbar,  Typography } from '@material-ui/core';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authProvider';
import axios from 'axios';
const pages = ['home','member list', 'add book', 'borrowing list'];

function NavBar() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if(page){
    navigateToPage(page);}
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const navigateToPage = (page) => {
    if(page === "home"){
        navigate('/');
    }
    else{
    navigate('/'+page.split(' ').join('-'));
    }
  }
  async function handleLogout(){
    await axios.get("http://127.0.0.1:8000/api/logout").then((res)=>{
      if(res.data.status){
        setToken();
      }
    }).catch((err)=>{
      console.log(err.response.data.message);
    })
  }
  return (
    <AppBar position="static" style={{ background: "rgb(12, 33, 82)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          
          <AutoStoriesRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{ color: 'white', fontSize: '20px', marginLeft: "30px" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} style={{ marginLeft: "auto" }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              getContentAnchorEl={null}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={()=>handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography className='typography' onClick={()=>navigateToPage(page)}>{page}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem >
                  <Typography className='typography' onClick={()=>handleLogout()}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
