import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Container, Grid, Modal, Paper, TextField } from '@mui/material'
import Link from '@mui/material/Link';
import Form from './form'
import Cookies from 'js-cookie'
import BasicCard from '../components/card'


export default function Home() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [email_content, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [estimated_time, setEstimated] = useState(Date.now());
  const [modal, setModal] = useState(false);
  const [flag, setFlag] = useState(null);
  const [issue, setIssue] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  const handleModal = () =>{
      setModal(!modal);
  }

  // const handleChange = (newValue: Date | null) => {
  //   setExtimated(newValue);
  // };

  // sending email
  const handleSend = () =>{
    if(flag === "accept"){
      const options = {
        headers:{
          Authorization: Cookies.get("Token")
        }
      };

      issue.email_content = email_content;
      issue.subject = subject;
      issue.estimated_time = estimated_time;
      console.log(issue)
      axios.post("/api/accepted",issue, options)
      .then(res=>alert(res.data.status))
      .catch(error=>alert(error));
    }
  }

  useEffect(()=>{
     if(Cookies.get("Token")){

      const options = {
        headers:{
          Authorization: Cookies.get("Token")
        }
      };
      axios.get("/api/main",options)
      .then(res=>setIssues(res.data))
      .catch(error=>setError(error));
      setLoggedIn(true)
     }
     else{
      axios.get("/api/main")
      .then(res=>setIssues(res.data))
      .catch(error=>setError(error));
     // axios
     //   .post("/api/main", data)
     //   .then(res=>console.log(res.data))
     //   .catch(error=>console.log(error));
     setLoggedIn(false)
     }
  },[]);
  return (
    <>
    <Modal open={modal}
            onClose={handleModal} sx={{maxHeight:"10em", maxWidth:"30em", m: 3}}>
                <Paper sx={{p:4}}>
                    <h3>Send response</h3>
                    <TextField
              margin="normal"
              required
              fullWidth
              id="email_content"
              label="Email content"
              name="email_content"
              autoFocus
              onChange={e=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="subject"
              label="Subject"
              id="subject"
              onChange={e=>setSubject(e.target.value)}
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
    <Box sx={{m:4}}>
      <h1>Welcome to grievance redressal app.</h1>
      <h3>Current issues</h3>
      {error ? <div><h5>{error}</h5></div>:      <Grid container spacing={2}>
        {issues.map(issue=>(
          <Grid item wrap key={issue._id}>
            
            <Box sx={{p:1}}>
            <BasicCard where={issue.where} description={issue.description} issue={issue}/>  
            {loggedIn? <Box>
            <Button size="small" variant="contained" onClick={()=>{setFlag("accept"); setIssue(issue); handleModal();}} color="success">Accept</Button>
            <Button size="small" variant="contained" onClick={()=>{setFlag("reject"); setIssue(issue); handleModal();}} color="secondary" sx={{ml:2}}>Reject</Button>
            </Box>:<div></div>
        }</Box></Grid>
        ))}
      </Grid>}
    </Box>
    </>
  );
}
