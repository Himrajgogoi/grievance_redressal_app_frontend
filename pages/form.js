import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ReCAPTCHA from "react-google-recaptcha";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextareaAutosize,
  OutlinedInput,
} from "@mui/material";
import TitleComponent from "../components/title";
import { toast } from "react-toastify";
import imageCompression from 'browser-image-compression';
import Departments from "../components/departments";

const recaptchaPublicKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function Form() {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [department, setDepartment] = useState(null);
  const [where, setWhere] = useState(null);
  const [description, setDescription] = useState(null);
  const [availability_time, setAvailability_time] = useState(null);
  const [image, setImage] = useState(null);
  const [captchaCode,setCaptchaCode] = useState(null);

  const recaptchaRef = React.createRef();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    
  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return;
    }

    setCaptchaCode(captchaCode);
    recaptchaRef.current.reset();
  };

  const submit = async () => {
    recaptchaRef.current.execute();
    var tId = toast.loading("Posting...",{
      position: toast.POSITION.TOP_CENTER
    })
    if(name && phone && email && department && where && description && availability_time && captchaCode){
      let creds;
      if (image) {
        const compressedImage = await imageCompression(image,{maxSizeMB:2, useWebWorker: true});
        const img = await getBase64(compressedImage);
        creds = {
          name: name,
          phone: phone,
          email: email,
          department: department,
          department_name: Departments[Number(department)-1],
          where: where,
          description: description,
          availability_time: availability_time,
          image: img,
        };
      } else {
        creds = {
          name: name,
          phone: phone,
          email: email,
          department: department,
          department_name: Departments[Number(department)-1],
          where: where,
          description: description,
          availability_time: availability_time,
        };
      }
      axios
        .post("/api/main", creds)
        .then((res) => toast.update(tId, { render: "Posted successfully!", type: "success", autoClose: 2000, isLoading: false }))
        .catch((error) => toast.update(tId, { render: "OOPS! An error occured.", type: "error",autoClose: 2000, isLoading: false }));
    }
    else{
      toast.update(tId, { render: "OOPS! Some necessary fields are missing", type: "error",autoClose: 2000, isLoading: false });
    }
  };

  return (
    <Box sx={{ m: 4, minHeight:'80vh'  }}>
      <TitleComponent title="Post an Issue."/>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        autoComplete="off"
      >
        <Grid container>
          <Grid item xs={12} lg={5}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Phone-No."
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
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
                  {Departments.map((name,index)=>
                   (<MenuItem key={index+1} value={index+1}>{name}</MenuItem>)
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Availability_time"
                  onChange={(e) => setAvailability_time(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Location"
                  onChange={(e) => setWhere(e.target.value)}
                />
              </Grid>
              <Grid item  xs={12} lg={6}>
              <ReCAPTCHA
	                  ref={recaptchaRef}
                    sitekey="6LcM0FwiAAAAAL-Oc_0gOBT4gqUKq8UpxwONtzlU"
                    onChange={onReCAPTCHAChange}
	            />
              </Grid>
              <Grid item xs={12} lg={6}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    sx={{display:'none', m:1}}
                    onChange={e=>{ setImage(e.target.files[0]); toast.success("Selected Image!",{autoClose:2000, position: toast.POSITION.TOP_CENTER})}}
                  />
                  <Button variant="outlined" size="large" component="span"  sx={{ m:1}}>
                    Upload a photo
                  </Button>
                </label>
              </Grid>

            </Grid>
          </Grid>
          <Grid item lg={5} sx={{ display:{xs:"none", lg:"flex"}}}>
            <Image
            src="/Checklist.jpg"
            alt="vector icon"
            height="300"
            width="500"
            />
          </Grid>
        </Grid>

        {/* <TextField
             type="file"
             onChange={e=> setImage(e.target.files[0])}
            /> */}
      </Box>
      <Button
        type="submit"
        variant="contained"
        onClick={submit}
        sx={{
          mt: 3,
          mb: 2,
          ml: {
            xs: 2,
            md: 1,
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
