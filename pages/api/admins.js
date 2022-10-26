import nextConnect  from "next-connect";
import axios from "axios";
const handler = nextConnect();

// fetching all the department admins
handler.get((req,res)=>{
    var config = {
        headers: {
            'Authorization': 'Bearer ' + req.headers.authorization,
            'Content-Type': 'application/json'
        }
    }

    axios.get(" https://grievance-redressal-app-server.onrender.com/api/auth/admins", config).then(res1=>{
        res.send(res1.data.admins);
    })
    .catch(error=>{
        res.status(error.response.status).json(error.response.data);
    });

})

// deleting a department admin by the root admin
handler.post((req,res)=>{
    var config = {
        headers: {
            'Authorization': 'Bearer ' + req.headers.authorization,
            'Content-Type': 'application/json'
        }
    }

    axios.post(" https://grievance-redressal-app-server.onrender.com/api/auth/delete",req.body,config).then(res1=>{
        res.send(res1.data);
    })
    .catch(error=>{
        res.status(error.response.status).json(error.response.data);
    });

})

export default handler;