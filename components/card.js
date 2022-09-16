import { Card, CardHeader, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import Modal from "@mui/material";
import TextField from "@mui/material";

export default function BasicCard(props) {

    return (
      <>
      
       <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.where}
          </Typography>
          <Typography variant="h5" component="div">
            {props.description}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            when: {props.issue.when}
          </Typography>
        </CardContent>
      
      </Card>
      </>
    );
  }