import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import Link from "@mui/material/Link";
import Form from "./form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import BasicCard from "../components/card";
import TitleComponent from "../components/title";
import Loader from "../components/Loader";
import SearchBar from "../components/searchbar";
import EmptyScreen from "../components/empty_screen";

export default function Done() {
  const [issues, setIssues] = useState([]);
  const [searched, setSearch] = useState([]);
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  // for fetching completed issues
  useEffect(() => {
    if (Cookies.get("Token")) {
      const options = {
        headers: {
          Authorization: Cookies.get("Token"),
        },
      };
      axios
        .get("/api/done", options)
        .then((res) => {
          setIssues(res.data);
          setLoader(false);
        })
        .catch((error) => {
          setError(error);
          setLoader(false);
        });
    } else {
      axios
        .get("/api/done")
        .then((res) => {
          setIssues(res.data);
          setLoader(false);
        })
        .catch((error) => {
          setError(error);
          setLoader(false);
        });
      // axios
      //   .post("/api/main", data)
      //   .then(res=>console.log(res.data))
      //   .catch(error=>console.log(error));
    }
  }, []);
 
  // for verifying whether there is a logged in user or not
  useEffect(() => {
    if (Cookies.get("Token")) {
      setLoggedIn(true);

      if (Cookies.get("Department") === "0") {
        setAdmin(true);
      }
    }
  }, []);
  
  //for root admin deletion of completed issues
  const handleAdminDelete = (issue) => {
    var tId = toast.loading("Deleting...", {
      position: toast.POSITION.TOP_CENTER,
    });


    issue.id = issue._id;
    const options = {
      headers: {
        Authorization: Cookies.get("Token"),
      },
    };

    axios
      .put("/api/done", issue, options)
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
  };
  return (
    <Box sx={{ m: 4, minHeight: "80vh" }}>
       <SearchBar setSearch={setSearch} issues={issues}/>
        {searched.length !==0 && <>
          <TitleComponent title="Searched Issues" />
          <Grid
          container
          spacing={2}
          sx={{
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },
          }}>
            {searched.map(issue=>(
                <Grid item wrap key={issue._id}>
                <Box sx={{ p: 1 }}>
                  <BasicCard
                    where={issue.where}
                    description={issue.description}
                    issue={issue}
                  /> 
                </Box>
              </Grid>
            ))}
          </Grid>
        </>}
      <TitleComponent title="Addressed issues" />
      {loader && <Loader />}
      {error && (
        <div>
          <h5>{error}</h5>
        </div>
      )}
      {issues.length !== 0 && (
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
          {issues.map((issue) => (
            <Grid item wrap key={issue._id}>
              <Box  sx={{p:1}}>
              <BasicCard
                where={issue.where}
                description={issue.description}
                issue={issue}
                type="done"
              />
              {loggedIn && admin ? (
                <Box sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                     
                      handleAdminDelete(issue);
                    }}
                    color="error"
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              ) : (
                <div></div>
              )}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      {issues.length == 0  && loader === false && <EmptyScreen/>}
    </Box>
  );
}
