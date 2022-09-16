import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { Box, Grid, Modal, Paper,TextField, Card, CardContent } from '@mui/material'
import Link from '@mui/material/Link';
import Form from './form'
import Cookies from 'js-cookie'
import BasicCard from '../components/card'

export default function Accepted() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [email_content, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [estimated_time, setEstimated] = useState(Date.now());
  const [modal, setModal] = useState(false);
  const [flag, setFlag] = useState(null);
  const [issue, setIssue] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null)

  const handleModal = () =>{
    setModal(!modal);
}

  
  const handleSend = () =>{
    if(flag === "done"){
      const options = {
        headers:{
          Authorization: Cookies.get("Token")
        }
      };

      issue.email_content = email_content;
      issue.subject = subject;
      issue.time_of_completion = estimated_time;
      console.log(issue)
      axios.post("/api/done",issue, options)
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
        axios.get("/api/accepted",options)
        .then(res=>setIssues(res.data))
        .catch(error=>setError(error));
       }
       else{
        axios.get("/api/accepted")
        .then(res=>setIssues(res.data))
        .catch(error=>setError(error));
       // axios
       //   .post("/api/main", data)
       //   .then(res=>console.log(res.data))
       //   .catch(error=>console.log(error));
       }
  },[])

  useEffect(()=>{
    if(Cookies.get("Token")){
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }
  },[])
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
      <h3>Accepted issues</h3>
      {error ? <div><h5>{error}</h5></div>: <Grid container spacing={2}>
      {issues.map(issue=>(
          <Grid item wrap key={issue._id}>
            
            <Box sx={{p:1}}>
            <BasicCard where={issue.where} description={issue.description} issue={issue}/> 
            {loggedIn? <Box>
              <Button size="small" variant="contained" onClick={()=>{setFlag("done"); setIssue(issue); handleModal();}} color="success">Done</Button>
              </Box>: <div></div>
        }</Box></Grid>
        ))}
      </Grid>}
    </Box>
    </>
  );
}
