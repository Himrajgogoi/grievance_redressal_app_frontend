import Head from "next/head";
import Image from "next/image";
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { toast } from "react-toastify";
import Link from "@mui/material/Link";
import Form from "./form";
import Cookies from "js-cookie";
import BasicCard from "../components/card";
import TitleComponent from "../components/title";
import Loader from "../components/Loader";
import SearchBar from "../components/searchbar";
import Departments from "../components/departments";
import EmptyScreen from "../components/empty_screen";

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [searched, setSearch] = useState([]);
  const [error, setError] = useState(null);
  const [email_content, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [toPrincipal, setToPrincipal] = useState(false);

  const [dateWithNoInitialValue, setDateWithNoInitialValue] = useState(null);
  const [modal, setModal] = useState(false);
  const [flag, setFlag] = useState(null);
  const [issue, setIssue] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleModal = () => {
    setModal(!modal);
  };

  // const handleChange = (newValue: Date | null) => {
  //   setEstimated(newValue);
  // };

  // sending email
  const handleSend = () => {
    var tId = toast.loading("Posting...", {
      position: toast.POSITION.TOP_CENTER,
    });
    
    issue.mail_content = email_content;
    issue.subject = subject;
    issue.to_principal = toPrincipal;

    if (flag === "accept"  && email_content && subject && dateWithNoInitialValue) {
      const options = {
        headers: {
          Authorization: Cookies.get("Token"),
        },
      };
   
      issue.estimated_time = dateWithNoInitialValue["$d"].toString();

    
      axios
        .post("/api/accepted", issue, options)
        .then((res) =>
          toast.update(tId, {
            render: "Accepted successfully and mail sent!",
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
    else if(flag === "reject"  && email_content && subject){
      const options = {
        headers: {
          Authorization: Cookies.get("Token"),
        },
      };

      issue.id = issue._id;

      
      axios
        .put("/api/main", issue, options)
        .then((res) =>
          toast.update(tId, {
            render: "Rejected successfully and mail sent!",
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
    else{
      toast.update(tId, { render: "OOPS! An error occured.", type: "error",autoClose: 2000, isLoading: false })
    }
  };

  useEffect(() => {
    if (Cookies.get("Token")) {
      const options = {
        headers: {
          Authorization: Cookies.get("Token"),
        },
      };
      axios
        .get("/api/main", options)
        .then((res) => {
          setIssues(res.data);
          setLoader(false);
        })
        .catch((error) => {
          setError(error);
          setLoader(false);
        });
      setLoggedIn(true);
    } else {
      axios
        .get("/api/main")
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
            id="email_content"
            label="Email content"
            name="email_content"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="subject"
            label="Subject"
            id="subject"
            onChange={(e) => setSubject(e.target.value)}
          />
              <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={e=>setToPrincipal(e.target.checked)} />}
              label="Send a copy to the principal"
            />
            <DateTimePicker
                label ="estimated time of completion"
                value={dateWithNoInitialValue}
                onChange={(newValue) => setDateWithNoInitialValue(newValue)}
                renderInput={(params) => (
                  <TextField {...params} helperText="Provide the estimated time of completion" />
                )}
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
        <h1>Welcome to grievance redressal app.</h1>
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
        <TitleComponent title="Current Issues" />
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
                    <Box sx={{mt:2}}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setFlag("accept");
                          setIssue(issue);
                          handleModal();
                        }}
                        color="success"
                        sx={{
                          borderRadius:4
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setFlag("reject");
                          setIssue(issue);
                          handleModal();
                        }}
                        color="error"
                        sx={{ ml: 2, borderRadius:4 }}
                      >
                        Reject
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
         {issues.length == 0 && loader === false && <EmptyScreen/>}
      </Box>
    </>
  );
}
