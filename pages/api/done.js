import nextConnect  from "next-connect";
import axios from "axios";
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

export default handler;