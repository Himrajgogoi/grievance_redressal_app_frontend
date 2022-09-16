import nextConnect  from "next-connect";
import axios from "axios";
import {deleteCookie, setCookie} from "cookies-next"
const handler = nextConnect();


handler.post((req,res)=>{
        axios.post("https://grievance-redressal-app-server.herokuapp.com/api/auth/login", req.body).then(res1=>{
        res.send(res1.data);
    })
    .catch(error=>{
       
        res.send(error);
    });
})

handler.get((req,res)=>{
    axios.get("https://grievance-redressal-app-server.herokuapp.com/api/auth/logout").then(res1=>{
        res.send(res1.data);
    })
    .catch(error=>{
      
        res.send(error);
    });
})
export default handler;