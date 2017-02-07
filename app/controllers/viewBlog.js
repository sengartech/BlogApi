//including dependencies.
var express = require("express");
var mongoose = require("mongoose");

//including libs and middlewares.
var responseGenerator = require("../../libs/responseGenerator.js");

var router = express.Router();

var blogModel = mongoose.model("Blog");

//defining controller function.
module.exports.controller = function(app){

  //route to show all blogs.
  router.get("/all",function(req,res){
    //reading all blogs document.
    blogModel.find({},function(err,result){
      if(err){
        console.log(err);
        var myResponse = responseGenerator.generate(true,"Some Error : "+err,500,null);
        res.send(myResponse);
      }
      else if(result == undefined || result == null || result == ""){
        console.log("No Blogs Found. Please Create First.");
        var myResponse = responseGenerator.generate(true,"No Blogs Found. Please Create First.",404,null);
        res.send(myResponse);
      }
      else{
        console.log("Blogs Found Success.");
        var myResponse = responseGenerator.generate(false,"Blogs Found Success.",200,result);
        res.send(myResponse);
      }
    });
  });

  //route to show particular blog.
  router.get("/view/:blogId",function(req,res){
    //reading particular blog document.
    blogModel.findOne({"blogId":req.params.blogId},function(err,result){
      if(err){
        console.log(err);
        var myResponse = responseGenerator.generate(true,"Some Error : "+err,500,null);
        res.send(myResponse);
      }
      else if(result == undefined || result == null || result == ""){
        console.log("No Such Blog Found. Please Check Your Input.");
        var myResponse = responseGenerator.generate(true,"No Such Blog Found. Please Check Your Input.",404,null);
        res.send(myResponse);
      }
      else{
        console.log("Blog Found Success.");
        var myResponse = responseGenerator.generate(false,"Blog Found Success.",200,result);
        res.send(myResponse);
      }
    });
  });

  app.use("/api/v1/blog",router);

}//end of controller function.
