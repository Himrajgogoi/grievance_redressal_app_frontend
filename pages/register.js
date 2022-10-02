import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Departments from "../components/departments";
import { Select, InputLabel, OutlinedInput, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [department, setDepartment] = useState(null);
  const [admin, setAdmin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("Token") && Cookies.get("Department") === "0") {
      setAdmin(true);
    } else {
      router.push("/");
    }
  });

  const signUp = () => {
    var tId = toast.loading("Signing Up...", {
      position: toast.POSITION.TOP_CENTER,
    });
    if (email && password && department) {
      const creds = {
        email: email,
        password: password,
        department: department,
      };
      axios
        .put("/api/auth", creds)
        .then((res) => {
          toast.update(tId, {
            render: "Signed Up successfully!",
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
    <>
      {admin && (
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
              Department Admin Sign Up
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
              <FormControl sx={{ m: 1, width: 230 }} required>
                {/* required
            id="outlined-number"
            label="Department"
            type="number"
            InputLabelProps={{
                shrink: true,
            }} */}
                <InputLabel id="dept">Jurisdiction Department</InputLabel>
                <Select
                  onChange={(e) => setDepartment(e.target.value)}
                  labelId="dept"
                  input={<OutlinedInput label="Jurisdiction Department" />}
                >
                  {Departments.map((name, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={signUp}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      )}
      <div></div>
    </>
  );
}

export default Register;
