import nextConnect from "next-connect";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import Departments from "../../components/departments";
const handler = nextConnect();

// for fetching currently posted issues
handler.get((req, res) => {
  if (req.headers.authorization) {
    var config = {
      headers: {
        Authorization: "Bearer " + req.headers.authorization,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(
        "https://grievance-redressal-app-server.herokuapp.com/api/main/",
        config
      )
      .then((res1) => {
        res.send(res1.data.issues);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  } else {
    axios
      .get("https://grievance-redressal-app-server.herokuapp.com/api/main/")
      .then((res1) => {
        res.send(res1.data.issues);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  }
});

// for posting new issues
handler.post(async (req, res) => {

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
    if (req.body.image) {
      const img = await cloudinary.uploader.upload(req.body.image, {
        folder: Departments[req.body.department],
      });
      const image = img.secure_url;
      const public_id = img.public_id;
      req.body.image = image;
      req.body.public_id = public_id;
    }

    delete req.body.captcha;

    axios
      .post(
        "https://grievance-redressal-app-server.herokuapp.com/api/main/",
        req.body
      )
      .then((res1) => {
        res.send(res1.data);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  }
  else{
    res.status(422).json({ message: "Something went wrong" });
  }
});

// for rejecting certain issues
handler.put(async (req, res) => {
  if (req.body.public_id) {
    await cloudinary.uploader.destroy(req.body.public_id);
  }

  var config = {
    headers: {
      Authorization: "Bearer " + req.headers.authorization,
      "Content-Type": "application/json",
    },
  };

  axios
    .put(
      "https://grievance-redressal-app-server.herokuapp.com/api/main/",
      req.body,
      config
    )
    .then((res1) => {
      res.send(res1.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
  },
};

export default handler;
