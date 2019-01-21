const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.static(path.join(__dirname, "build")));

var dataRouter = require("./router");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", dataRouter);
app.use(cors());

const DBurl = "mongodb://teamji:reactLut123@ds149414.mlab.com:49414/courses";

var db = mongoose.connect(
 DBurl,
 { useNewUrlParser: true },
 function(error) {
   if (error) console.log(error);

   console.log("connection successful");
 }
);

app.use(function(req, res, next) {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader(
   "Access-Control-Allow-Methods",
   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
 );

 res.setHeader(
   "Access-Control-Allow-Headers",
   "X-Requested-With,content-type"
 );

 next();
});

app.get("/", function(req, res) {
 res.json("server running");
});

app.listen(process.env.PORT || 8080);


