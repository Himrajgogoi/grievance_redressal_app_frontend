import nextConnect  from "next-connect";
import axios from "axios";
const handler = nextConnect();
import {v2 as cloudinary} from "cloudinary"

handler.get((req, res)=>{
    if(req.headers.authorization){
        var config = {
            headers: {
                'Authorization': 'Bearer ' + req.headers.authorization,
                'Content-Type': 'application/json'
            }
        }
        axios
            .get("https://grievance-redressal-app-server.herokuapp.com/api/done/", config)
            .then(res1=>{
                res.send(res1.data.done);
            })
            .catch(error=>{
                res.send(error);
            });
    }
    else{
        axios
            .get("https://grievance-redressal-app-server.herokuapp.com/api/done/")
            .then(res1=>{
                res.send(res1.data.done);
            })
            .catch(error=>{
                res.send(error);
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
        .post("https://grievance-redressal-app-server.herokuapp.com/api/done/", req.body, config)
        .then(res1=>{
            res.send(res1.data);
        })
        .catch(error=>{
            res.send(error);
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
        .put("https://grievance-redressal-app-server.herokuapp.com/api/done/", req.body, config)
        .then(res1=>{
            res.send(res1.data);
        })
        .catch(error=>{
            res.send(error);
        });
});

export default handler;