import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const router = useRouter();


  useEffect(()=>{
    if(Cookies.get("Token")) router.replace("/")
  })
  
  // handle signIn admin
  const signIn = () => {
    var tId = toast.loading("Logging In...", {
      position: toast.POSITION.TOP_CENTER,
    });
    if (email && password) {
      const creds = {
        email: email,
        password: password,
      };
      axios
        .post("/api/auth", creds)
        .then((res) => {
          Cookies.set("Token", res.data.token, { expires: 1 });

          if (res.data.department) {
            Cookies.set("Department", res.data.department, { expires: 1 });
          } else if (res.data.admin) {
            Cookies.set("Department", 0, { expires: 1 });
            // Cookies.set("Admin", res.data.admin);
          }

          toast.update(tId, {
            render: "Logged In successfully!",
            type: "success",
            autoClose: 2000,
            isLoading: false,
          });
        })
        .catch((error) =>
          toast.update(tId, {
            render: "OOPS! An error occured.",
            type: "error",
            autoClose: 2000,
            isLoading: false,
          })
        );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.update(tId, {
        render: "OOPS! Some necessary fields are missing",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Department Admin Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={signIn}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
