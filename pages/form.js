import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';

export default function Form(){

    const [name,setName] = useState(null);
    const [phone,setPhone] = useState(null);
    const [email,setEmail] = useState(null);
    const [department, setDepartment] = useState(null);
    const [where,setWhere] = useState(null);
    const [description,setDescription] = useState(null);
    const [availability_time,setAvailability_time] = useState(null);
    const [image, setImage] = useState(null);


    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const submit = async()=>{
        let creds;
        if(image){
            const img = await getBase64(image);
            creds = {
                name: name,
                phone: phone,
                email: email,
                department: department,
                where: where,
                description: description,
                availability_time: availability_time,
                image: img
            }
        }
        else{
            creds = {
                name: name,
                phone: phone,
                email: email,
                department: department,
                where: where,
                description: description,
                availability_time: availability_time
            }
        }
        console.log(creds);
        axios.post("/api/main", creds).then(res=>alert(res.data.status)).catch(error=>alert(error.error));
    }

    return(
        <Box sx={{m:4}}>
            <h1>Grievance related form</h1>
            <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
             display:"flex",
             flexDirection:{
                xs:"column",
                md:"row"
             },
             justifyContent:"center",
             alignItems:"center"
            }}
            autoComplete="off"
            >
            <TextField
                required
                id="outlined-required"
                label="Name"
                onChange={e=>setName(e.target.value)}
            />
            <TextField
                required
                id="outlined-required"
                label="Phone-No."
                onChange={e=>setPhone(e.target.value)}
            />
            <TextField
                required
                id="outlined-required"
                label="Email"
                onChange={e=>setEmail(e.target.value)}
            />
            <FormControl sx={{minWidth:120}}>
                {/* required
                id="outlined-number"
                label="Department"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }} */}
                <InputLabel id="dept">
                    Department
                </InputLabel>
                <Select onChange={e=>setDepartment(e.target.value)} labelId="dept">
                    <MenuItem value={1}>Civil</MenuItem>
                    <MenuItem value={2}>Instrumentation</MenuItem>
                    <MenuItem value={3}>Computer Science</MenuItem>
                    <MenuItem value={4}>Mechanical</MenuItem>
                    <MenuItem value={5}>Electrical</MenuItem>
                    <MenuItem value={6}>Campus</MenuItem>
                    <MenuItem value={7}>Water</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                id="outlined-required"
                label="Location"
                onChange={e=>setWhere(e.target.value)}
            />
            <TextField
                required
                id="outlined-required"
                label="Description"
                onChange={e=>setDescription(e.target.value)}
            />
            <TextField
                required
                id="outlined-required"
                label="Availability_time"
                onChange={e=>setAvailability_time(e.target.value)}
            />
            {/* <TextField
             type="file"
             onChange={e=> setImage(e.target.files[0])}
            /> */}
            
        </Box>
        <Button
            type="button"
            variant="contained"
            onClick={submit}
            sx={{ mt: 3, mb: 2, ml:{
                xs:2,
                md:1
            }}}
        >Submit
        </Button>
    </Box>
    )
}