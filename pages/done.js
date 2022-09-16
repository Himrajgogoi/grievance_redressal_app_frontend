import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material'
import Link from '@mui/material/Link';
import Form from './form'
import Cookies from 'js-cookie'
import BasicCard from '../components/card'

export default function Done() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
  
    if(Cookies.get("Token")){
        const options = {
          headers:{
            Authorization: Cookies.get("Token")
          }
        };
        axios.get("/api/done",options)
        .then(res=>setIssues(res.data))
        .catch(error=>setError(error));
        
       }
       else{
        axios.get("/api/done")
        .then(res=>setIssues(res.data))
        .catch(error=>setError(error));
       // axios
       //   .post("/api/main", data)
       //   .then(res=>console.log(res.data))
       //   .catch(error=>console.log(error));
       console.log(issues)
       }
  },[]);
  return (
    <Box sx={{m:4}}>
      <h3>Issues addressed</h3>
      {error ?<div><h5>{error}</h5></div>:<Grid container spacing={2}>
        {issues.map(issue=>(
          <Grid item wrap key={issue._id}><BasicCard where={issue.where} description={issue.description} issue={issue} type="done"/></Grid>
        ))}
      </Grid>}
    </Box>
  );
}
