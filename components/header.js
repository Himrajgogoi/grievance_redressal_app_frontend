import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { AppBar, Menu, MenuItem, Box, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
//import Link from '@mui/material/Link';
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Departments from "./departments";

function Header(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const [loggedIn, setLoggedIn] = React.useState(null);
  const [department, setDepartment] = React.useState(null);

  React.useEffect(() => {
    if (Cookies.get("Token")) {
      setLoggedIn(true);
      setDepartment(Cookies.get("Department"));
    } else {
      setLoggedIn(false);
    }
  }, []);

  const signOut = () => {

    var tId =  toast.loading("Logging Out...",{
      position: toast.POSITION.TOP_CENTER
    })
    axios
      .get("/api/auth")
      .then((res) => {
        Cookies.remove("Token");
        Cookies.remove("Department");
        toast.update(tId, { render: "Logged Out successfully!", type: "success", autoClose: 2000, isLoading: false })})
      .catch((error) => toast.update(tId, { render: "OOPS! An error occured.", type: "error",autoClose: 2000, isLoading: false }));

      setTimeout(()=>{
        window.location.reload();
      }, 3000)
  };
  return (
    <AppBar
      elevation={0}
      sx={{ height: "60px", mb: 3, backgroundColor: "rgb(90,103,227)" }}
      position="fixed"
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
          <IconButton
            size="large"
            edge="start"
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
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", lg: "none" },
            }}
          >
            <MenuItem>
              <Link underline="none" color="inherit" href="/">
                HOME
              </Link>
            </MenuItem>
            <MenuItem>
              <Link underline="none" color="inherit" href="/accepted">
                Accepted
              </Link>
            </MenuItem>
            <MenuItem>
              <Link underline="none" color="inherit" href="/done">
                Addressed
              </Link>
            </MenuItem>
            {department === "0" &&   <MenuItem>
              <Link underline="none" color="inherit" href="/register">
                Register
              </Link>
            </MenuItem>}
            {department === "0" &&   <MenuItem>
              <Link underline="none" color="inherit" href="/admins">
                All Admins
              </Link>
            </MenuItem>}
            <MenuItem>
              <Link href="/form">
                <Button variant="outlined" size="small" color="success">
                  Post issue
                </Button>
              </Link>
            </MenuItem>
            {!loggedIn ? (
              <MenuItem>
                <Link href="/signIn">
                  <Button variant="outlined" size="small">
                    Sign in
                  </Button>
                </Link>
              </MenuItem>
            ) : (
              <div></div>
            )}

            {loggedIn ? (
              <MenuItem>
                <Button variant="outlined" onClick={signOut} size="small">
                  Sign Out
                </Button>
              </MenuItem>
            ) : (
              <div></div>
            )}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt:1 }}>
            Grievance Redressal App
          </Typography>

        </Box>
        
        <Grid
          container
          sx={{
            display: {
              xs: "none",
              lg: "flex",
              justifyContent: "space-between",
            },
          }}
        >
          <Grid item lg={8}>
            <Grid container sx={{ml:1}}>
              <Grid item lg={1}>
                <Link underline="none" color="inherit" href="/">
                  Home
                </Link>
              </Grid>
              <Grid item lg={1}>
                <Link underline="none" color="inherit" href="/accepted">
                  Accepted
                </Link>
              </Grid>
              <Grid item lg={1} sx={{ml:3}}>
                <Link underline="none" color="inherit" href="/done">
                  Addressed
                </Link>
              </Grid>
              {department === "0" && <Grid item lg={1} sx={{ml:3}}>
                <Link underline="none" color="inherit" href="/register">
                  Register
                </Link>
              </Grid>}
              {department === "0" && <Grid item lg={1} sx={{ml:3}}>
                <Link underline="none" color="inherit" href="/admins">
                  All Admins
                </Link>
              </Grid>}
            </Grid>
          </Grid>
          {
            department && <Grid item lg={2}>
              {department === "0"?"Root": Departments[Number(department)-1]} Department Admin
            </Grid>
          }
          <Grid item lg={2}>
            <Grid container spacing={1}>
              <Grid item lg={7}>
                <Link href="/form">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ModeEditIcon />}
                    sx={{
                      color: "green",
                      backgroundColor: "white",
                      borderRadius: 4,
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      fontSize:{
                        xs: 8,
                        lg: 12
                      }
                    }}
                  >
                    Post issue
                  </Button>
                </Link>
              </Grid>
              <Grid item lg={5}>
                {loggedIn ? (
                  <Button
                    variant="contained"
                    onClick={signOut}
                    sx={{ ml: 1,
                      color: "red",
                      backgroundColor: "white",
                      borderRadius: 4,
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      fontSize:{
                        xs: 8,
                        lg: 12
                      } }}
                    size="small"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <div></div>
                )}
                {!loggedIn ? (
                  <Link
                    href="/signIn"
                    underline="none"
                    color="inherit"
                    sx={{ ml: 3 }}
                  >
                    Sign in
                  </Link>
                ) : (
                  <div></div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      ></Toolbar>
    </AppBar>
  );
}

export default Header;
