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
            .get("https://grievance-redressal-app-server.herokuapp.com/api/accepted/", config)
            .then(res1=>{
                res.send(res1.data.accepted);
            })
            .catch(error=>{
                res.status(error.response.status).json(error.response.data);
            });
    }
    else{
        axios
        .get("https://grievance-redressal-app-server.herokuapp.com/api/accepted/")
        .then(res1=>{
            res.send(res1.data.accepted);
        })
        .catch(error=>{
            res.status(error.response.status).json(error.response.data);
        });
    }
});

handler.post((req, res)=>{


    var config = {
        headers: {
            'Authorization': 'Bearer ' + req.headers.authorization,
            'Content-Type': 'application/json'
        }
    }
    axios
        .post("https://grievance-redressal-app-server.herokuapp.com/api/accepted/", req.body, config)
        .then(res1=>{
            res.send(res1.data);
        })
        .catch(error=>{
            res.status(error.response.status).json(error.response.data);
        });
});

// for admin deletion
handler.put(async (req, res)=>{

    if(req.body.public_id){
        await cloudinary.uploader.destroy(req.body.public_id);
     }

    var config = {
        headers: {
            'Authorization': 'Bearer ' + req.headers.authorization,
            'Content-Type': 'application/json'
        }
    }

    axios
        .put("https://grievance-redressal-app-server.herokuapp.com/api/accepted/", req.body, config)
        .then(res1=>{
            res.send(res1.data);
        })
        .catch(error=>{
            res.status(error.response.status).json(error.response.data);
        });
});



export default handler;