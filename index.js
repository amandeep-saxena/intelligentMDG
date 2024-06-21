const express = require("express");
const app = express();
const port = 4000;
var bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");


//mongodb connection//
// mongoose.connect("mongodb://127.0.0.1:27017/intellisepGPt").then(
//   () => {
//     console.log("mongodb connection successful");
//   },
//   (err) => {
//     console.log("err connection ", err);
//   }
// );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});
require("./app/routes")(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
