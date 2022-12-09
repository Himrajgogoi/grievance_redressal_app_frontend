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
  Typography,
} from "@mui/material";
import TitleComponent from "../components/title";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import Departments from "../components/departments";
import { useRouter } from "next/router";
import { isEmail, isPhone } from "../components/validator";



export default function Form() {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [department, setDepartment] = useState(null);
  const [where, setWhere] = useState(null);
  const [description, setDescription] = useState(null);
  const [availability_time, setAvailability_time] = useState(null);
  const [image, setImage] = useState(null);
  const [captchaCode, setCaptchaCode] = useState(null);

  const recaptchaRef = React.createRef();

  const router = useRouter();



  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  /// to initialize reCaptcha and post an issue if not spam
  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      toast.error("An error occured!",{autoClose:2000});
      return;
    } 
    else {
      var tId = toast.loading("Posting...", {
        position: toast.POSITION.TOP_CENTER,
      });
      if (
        name &&
        isPhone(phone) && isEmail(email) &&
        department &&
        where &&
        description &&
        availability_time) {

        let creds;
        if (image) {
          const compressedImage = await imageCompression(image, {
            maxSizeMB: 2,
            useWebWorker: true,
          });
          const img = await getBase64(compressedImage);
          creds = {
            name: name,
            phone: phone,
            email: email,
            department: department,
            department_name: Departments[Number(department) - 1],
            where: where,
            description: description,
            availability_time: availability_time,
            image: img,
            captcha: captchaCode,
          };
        } else {
          creds = {
            name: name,
            phone: phone,
            email: email,
            department: department,
            department_name: Departments[Number(department) - 1],
            where: where,
            description: description,
            availability_time: availability_time,
            captcha: captchaCode,
          };
        }
        axios
          .post("/api/main", creds)
          .then((res) =>{

            toast.update(tId, {
              render: "Posted successfully!",
              type: "success",
              autoClose: 2000,
              isLoading: false,
            });
            
            setTimeout(()=>{
              router.push("/");
            },2000);
          })
          .catch((error) =>{
            toast.update(tId, {
              render: "OOPS! An error occured.",
              type: "error",
              autoClose: 2000,
              isLoading: false,
            });

            setTimeout(()=>{
              window.location.reload();
            },2000);

          });
      } else {
        toast.update(tId, {
          render: "OOPS! Some necessary fields are missing or invalid input!",
          type: "error",
          autoClose: 2000,
          isLoading: false,
        });
      }
    }
    recaptchaRef.current.reset();
  };
  

  // handling form submission
  const submit = async () => {

    recaptchaRef.current.execute();
  };

  return (
    <Box sx={{ m: 4, minHeight: "80vh" }}>
      <TitleComponent title="Post an Issue." />
      <Typography>Before filling up the details, wait for the reCaptcha to load on bottom right. If it has not, refresh the page.</Typography>
      <br/>
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
                  type="number"
                  id="outlined-required"
                  label="Phone-No. (dont add +91)"
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
                    {Departments.map((name, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {name}
                      </MenuItem>
                    ))}
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
              <Grid item xs={12} lg={6}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={process.env.RECAPTCHA_SITE_KEY}
                  onChange={onReCAPTCHAChange}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    sx={{ display: "none", m: 1 }}
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      toast.success("Selected Image!", {
                        autoClose: 2000,
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="large"
                    component="span"
                    sx={{ m: 1 }}

                  >
                    Upload a photo
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={5} sx={{ display: { xs: "none", lg: "flex" } }}>
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
        
        type="button"
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
