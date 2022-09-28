import nextConnect  from "next-connect";
import axios from "axios";
import {v2 as cloudinary} from "cloudinary"
import Departments from "../../components/departments";
const handler = nextConnect();

handler.get((req, res)=>{
    if(req.headers.authorization){
        var config = {
            headers: {
                'Authorization': 'Bearer ' + req.headers.authorization,
                'Content-Type': 'application/json'
            }
        }
        axios
            .get("https://grievance-redressal-app-server.herokuapp.com/api/main/", config)
            .then(res1=>{
        
                res.send(res1.data.issues);
            })
            .catch(error=>{
                res.send(error);
            });
    }
    else{
        axios
        .get("https://grievance-redressal-app-server.herokuapp.com/api/main/")
        .then(res1=>{
            res.send(res1.data.issues);
        })
        .catch(error=>{
            res.send(error);
        });
    }
});

handler.post(async(req, res)=>{

    if(req.body.image){
        const img = await cloudinary.uploader.upload(req.body.image,{folder: Departments[req.body.department]});
        const image = img.secure_url;
        const public_id = img.public_id;
        req.body.image = image;
        req.body.public_id = public_id;
        
    }
    
    axios
        .post("https://grievance-redressal-app-server.herokuapp.com/api/main/", req.body)
        .then(res1=>{
            res.send(res1.data);
        })
        .catch(error=>{
            res.send(error);
        });
});

handler.put(async(req, res)=>{
    
    if(req.body.public_id){
       await cloudinary.uploader.destroy(req.body.public_id);
    }

    var config = {
        headers: {
            'Authorization': 'Bearer ' + req.headers.authorization,
            'Content-Type': 'application/json'
        }
    }

    axios.put("https://grievance-redressal-app-server.herokuapp.com/api/main/", req.body, config)
    .then(res1=>{
        res.send(res1.data);
    })
    .catch(error=>{
        res.send(error);
    });
})

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '3mb',
  
        }
    }
}

export default handler;