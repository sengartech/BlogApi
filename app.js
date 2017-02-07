//including dependencies.
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var fs = require("fs");

//defining express app.
var app = express();

//logging all requests.
app.use(logger("dev"));

//connecting with database.
var dbPath = "mongodb://localhost/blogDB";
mongoose.connect(dbPath);
mongoose.connection.once("open",function(){
  console.log("Database Connection Established.");
});

//parsers for accepting inputs.
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

//including models files.
fs.readdirSync("./app/models").forEach(function(file){
  if(file.indexOf(".js")){
    require("./app/models/"+file);
  }
});

//including controllers files.
fs.readdirSync("./app/controllers").forEach(function(file){
  if(file.indexOf(".js")){
    var route = require("./app/controllers/"+file);
    //calling controllers function and passing app instance.
    route.controller(app);
  }
});

//returning 404 status.
app.use(function(req,res){
  console.log("Page Not Found.");
  res.status(404).send("Page Not Found.");
});

//listening app at port 3000.
app.listen(3000,function(){
  console.log("Blog app started at port : 3000.");
});
