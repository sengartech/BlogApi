//including dependencies.
var express = require("express");
var mongoose = require("mongoose");
var shortid = require("shortid");

//including libs and middlewares
var responseGenerator = require("../../libs/responseGenerator.js");
var validate = require("../../middlewares/validate.js");

var router = express.Router();

var blogModel = mongoose.model("Blog");

//defining controller function.
module.exports.controller = function(app){

  //route to create a blog.
  router.post("/create",validate.checkTitle,function(req,res){

    //getting current date.
    var today = Date.now();
    //creating unique id for storing as blogId.
    var id = shortid.generate();
    //creating new blog object.
    var newBlog = new blogModel({
      blogId : id,
      title : req.body.title,
      subTitle : req.body.subTitle,
      content : req.body.content,
      imageUrl : req.body.imageUrl,
      author : req.body.author,
      createdOn : today,
      updatedOn : today
    });
    //saving new blog.
    newBlog.save(function(err,result){
      if(err){
        console.log(err);
        var myResponse = responseGenerator.generate(true,"Some Error : "+err,500,null);
        res.send(myResponse);
      }
      else if(result == undefined || result == null || result == ""){
        console.log("Blog Is Not Created. Please Try Again.");
        var myResponse = responseGenerator.generate(true,"Blog Is Not Created. Please Try Again.",404,null);
        res.send(myResponse);
      }
      else{
        console.log("Blog Creation Success.");
        var myResponse = responseGenerator.generate(false,"Blog Creation Success.",200,result);
        res.send(myResponse);
      }
    });
  });

  app.use("/api/v1/blog",router);

}//end of controller function.
