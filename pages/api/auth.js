import nextConnect from "next-connect";
import axios from "axios";
const handler = nextConnect();

// for logging in department admin
handler.post((req, res) => {
  axios
    .post(
      "https://grievance-redressal-app-server.herokuapp.com/api/auth/login",
      req.body
    )
    .then((res1) => {
      res.send(res1.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
});

// for logging out the admin
handler.get((req, res) => {
  axios
    .get("https://grievance-redressal-app-server.herokuapp.com/api/auth/logout")
    .then((res1) => {
      res.send(res1.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
});

// for registering new department admins
handler.put(async (req, res) => {
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.captcha}`,
    null,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    }
  );
  if (response.data.success) {
    
    delete req.body.captcha;
    axios
      .post(
        "https://grievance-redressal-app-server.herokuapp.com/api/auth/register",
        req.body
      )
      .then((res1) => {
        res.send(res1.data);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  } 
  else {
    res.status(422).json({ message: "Something went wrong" });
  }
});
export default handler;
