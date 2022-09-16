import nextConnect  from "next-connect";
import axios from "axios";
import {v2 as cloudinary} from "cloudinary"
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
                console.log(res1.data)
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
        const img = await cloudinary.uploader.upload(req.body.image,(err,result)=>console.log(result));
        console.log(img.secure_url)
        const image = img.secure_url;
        const public_id = img.public_id;
        req.body.image = image;
        req.body.public_id = public_id;
        
    }
    console.log(req.body);
    axios
        .post("https://grievance-redressal-app-server.herokuapp.com/api/main/", req.body)
        .then(res1=>{
            res.send(res1.data);
        })
        .catch(error=>{
            res.send(error);
        });
});

export default handler;