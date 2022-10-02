import nextConnect  from "next-connect";
import axios from "axios";
const handler = nextConnect();

// for logging in department admin
handler.post((req,res)=>{
        axios.post("https://grievance-redressal-app-server.herokuapp.com/api/auth/login", req.body).then(res1=>{
        res.send(res1.data);
    })
    .catch(error=>{

        res.status(error.response.status).json(error.response.data);
    });
})

// for logging out the admin
handler.get((req,res)=>{
    axios.get("https://grievance-redressal-app-server.herokuapp.com/api/auth/logout").then(res1=>{
        res.send(res1.data);
    })
    .catch(error=>{
        res.status(error.response.status).json(error.response.data);
    });
})

// for registering new department admins
handler.put((req,res)=>{
    
    axios.post("https://grievance-redressal-app-server.herokuapp.com/api/auth/register", req.body).then(res1=>{
        res.send(res1.data);
    })
    .catch(error=>{
        res.status(error.response.status).json(error.response.data);
    });
    
})
export default handler;