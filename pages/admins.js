import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { Container } from "@mui/system";
import { Card, CardContent, Box, Typography, Chip, Grid, Button } from "@mui/material";
import Departments from "../components/departments";
import { Colors } from "../components/departments";
import TitleComponent from "../components/title";
import Loader from "../components/Loader";
import EmptyScreen from "../components/empty_screen";

function Admins() {
  const [admin, setAdmin] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  
  // for fetching all the admins
  useEffect(() => {
    if (Cookies.get("Token") && Cookies.get("Department") === "0") {
      setAdmin(true);
      const options = {
        headers: {
          Authorization: Cookies.get("Token"),
        },
      };

      axios
        .get("/api/admins", options)
        .then((res) => {
          setAdmins(res.data);
          setLoader(false);
        })
        .catch((error) => {
          setError(error);
          setLoader(false);
        });
    } else {
      router.push("/");
    }
  });
  
  // for admin deletion by root admin
  const deleteDepartmentAdmin = (id) =>{
    var tId = toast.loading("Deleting...", {
        position: toast.POSITION.TOP_CENTER,
      });
  
  
      const body = {
        id: id
      }

      const options = {
        headers: {
          Authorization: Cookies.get("Token"),
        },
      };
  
      axios
        .post("/api/admins", body, options)
        .then((res) =>
          toast.update(tId, {
            render: "Deleted successfully!",
            type: "success",
            autoClose: 2000,
            isLoading: false,
          })
        )
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
  }

  return (
    <>
      {admin && (
        <Box sx={{ m: 4, minHeight: "80vh" }}>
          <TitleComponent title="Department Admins under the supervision " />
          {error && <Container>{error}</Container>}
          {loader && <Loader />}
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
          >
            {admins.length !== 0 &&
              admins.map((user) => (
                <Grid item wrap key={user._id}>
                  <Card sx={{ width: 275, height: 210, pb: 1 }}>
                    <CardContent>
                      <Typography
                      noWrap
                        sx={{
                          fontSize: 16,
                        }}
                        component="div"
                      >
                        Email: {user.email}
                      </Typography>
                      <br />
                      <br />
                      <Typography
                        sx={{
                          fontSize: 16,
                        }}
                        component="div"
                      >
                        Department:
                        {user.department !== 0 && (
                          <Chip
                            label={Departments[Number(user.department) - 1]}
                            sx={{
                              color: "white",
                              backgroundColor:
                                Colors[Number(user.department) - 1],
                            }}
                          />
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Box sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                     
                      deleteDepartmentAdmin(user._id);
                    }}
                    color="error"
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    Delete
                  </Button>
                </Box>
                </Grid>
              ))}
          </Grid>
          {admins.length == 0 && loader === false && <EmptyScreen />}
        </Box>
      )}
    </>
  );
}

export default Admins;
