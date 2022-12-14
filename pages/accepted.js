import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Box,
  Grid,
  Modal,
  Paper,
  TextField,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Link from "@mui/material/Link";
import Form from "./form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import BasicCard from "../components/card";
import TitleComponent from "../components/title";
import Loader from "../components/Loader";
import SearchBar from "../components/searchbar";
import dayjs from "dayjs";
import EmptyScreen from "../components/empty_screen";

export default function Accepted() {
  const [issues, setIssues] = useState([]);
  const [searched, setSearch] = useState([]);
  const [error, setError] = useState(null);
  const [email_content, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [toPrincipal, setToPrincipal] = useState(false);
  const [modal, setModal] = useState(false);
  const [flag, setFlag] = useState(null);
  const [issue, setIssue] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleModal = () => {
    setModal(!modal);
  };

  // once issue is completed, we send a response to the griever and to the principal if needed and move the issue to done list
  const handleSend = () => {
    var tId = toast.loading("Posting...", {
      position: toast.POSITION.TOP_CENTER,
    });
    if (flag === "done" && email_content && subject) {
      const options = {
        headers: {
          Authorization: Cookies.get("Token"),
        },
      };

      issue.mail_content = email_content;
      issue.subject = subject;
      issue.to_principal = toPrincipal;
      issue.time_of_completion = dayjs()["$d"].toString();

      axios
        .post("/api/done", issue, options)
        .then((res) =>
          toast.update(tId, {
            render: "Done successfully!",
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
    } else {
      toast.update(tId, {
        render: "OOPS! An error occured.",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    }
  };
 
  // for root admin deletion of accepted issues
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
      .put("/api/accepted", issue, options)
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
 
  // for fetching the accepted issues
  useEffect(() => {
    if (Cookies.get("Token")) {
      const options = {
        headers: {
          Authorization: Cookies.get("Token"),
        },
      };
      axios
        .get("/api/accepted", options)
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
        .get("/api/accepted")
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
  return (
    <>
      <Modal
        open={modal}
        onClose={handleModal}
        sx={{ maxHeight: "10em", maxWidth: "30em", m: 3 }}
      >
        <Paper sx={{ p: 4 }}>
          <h3>Send response</h3>
          <TextField
            margin="normal"
            required
            fullWidth
            name="subject"
            label="Subject"
            id="subject"
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email_content"
            label="Email content"
            name="email_content"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={(e) => setToPrincipal(e.target.checked)}
              />
            }
            label="Send a copy to the principal"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleSend}
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Paper>
      </Modal>
      <Box sx={{ m: 4, minHeight: "80vh" }}>
        <SearchBar setSearch={setSearch} issues={issues} />
        {searched.length !== 0 && (
          <>
            <TitleComponent title="Searched Issues" />
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
              {searched.map((issue) => (
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
          </>
        )}
        <TitleComponent title="Accepted issues" />
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
                <Box sx={{ p: 1 }}>
                  <BasicCard
                    where={issue.where}
                    description={issue.description}
                    issue={issue}
                  />
                  {loggedIn ? (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setFlag("done");
                          setIssue(issue);
                          handleModal();
                        }}
                        color="success"
                        sx={{
                          borderRadius: 4,
                        }}
                      >
                        Done
                      </Button>
                    </Box>
                  ) : (
                    <div></div>
                  )}
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
        {issues.length == 0 && loader === false && <EmptyScreen />}
      </Box>
    </>
  );
}
