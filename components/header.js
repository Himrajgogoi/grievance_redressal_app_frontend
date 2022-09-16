import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { AppBar, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu"
import Link from '@mui/material/Link';
import axios from 'axios';
import Cookies from 'js-cookie';

function Header(props) {
  const [anchorElNav, setAnchorElNav] =React.useState(false);
  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const [loggedIn, setLoggedIn] = React.useState(null);
  
  React.useEffect(()=>{
    if(Cookies.get("Token")){
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }
  },[])

  const signOut = ()=>{
    axios.get("/api/auth").then(res=>{
      Cookies.remove("Token")
      alert(res.data.status)}).catch(error=>alert(error.error));
  }
  return (
    <AppBar sx ={{height: '60px', mb:3}} position='fixed'>
      
      <Toolbar>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
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
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <Link underline='none' color='inherit' href='/'>HOME</Link>
              </MenuItem>
              <MenuItem>
                  <Link underline='none' color='inherit' href='/accepted' >Accepted</Link>
              </MenuItem>
              <MenuItem>
                <Link underline='none' color='inherit' href='/done' >Addressed</Link>
              </MenuItem>
              <MenuItem>
                <Button variant="outlined" href="/form" size="small">Post issue</Button>
              </MenuItem>
              {!loggedIn ? <MenuItem>
                <Button href='/signIn' variant='outlined' size="small">
                  Sign in
                </Button>
              </MenuItem>:<div></div>}
             
              {loggedIn ?   <MenuItem><Button
              variant="outlined"
              onClick={signOut}
               size="small"
            >
              Sign Out
            </Button></MenuItem>:<div></div>}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link underline='none' color='inherit' href='/'>HOME</Link>
            <Link underline='none' color='inherit' href='/accepted' sx={{ml: 3}}>Accepted</Link>
            <Link underline='none' color='inherit' href='/done' sx={{ml: 3}}>Addressed</Link>
            <Button variant="contained" href="/form" color='secondary' sx={{ml: 3}} size="small">Post issue</Button>
            {loggedIn ? <Button
              variant="contained"
              onClick={signOut}
              sx={{ml: 3}} size="small"
            >
              Sign Out
            </Button>:<div></div>}
             {!loggedIn ? <Link href='/signIn' underline='none' color='inherit' sx={{ml: 3}}>
              Sign in
            </Link>:<div></div>}
          </Box>
          
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
      </Toolbar>
    </AppBar>
  );
}


export default Header;