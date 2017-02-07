//including dependencies.
var express = require("express");
var mongoose = require("mongoose");

//including libs and middlewares.
var responseGenerator = require("../../libs/responseGenerator.js");
var validate = require("../../middlewares/validate.js");

var router = express.Router();

var blogModel = mongoose.model("Blog");

//defining controller function.
module.exports.controller = function(app){

  //route to edit a blog.
  router.put("/edit/:blogId",validate.checkUpdatedTitle,function(req,res){
    //setting current updated date.
    req.body.updatedOn = Date.now();
    var update = req.body;

    //finding and update blog.
    blogModel.findOneAndUpdate({"blogId":req.params.blogId},update,function(err,result){
      if(err){
        console.log(err);
        var myResponse = responseGenerator.generate(true,"Some Error : "+err,500,null);
        res.send(myResponse);
      }
      else if(result == undefined || result == null || result == ""){
        console.log("Blog Does Not Exist. Please Check Your Input.");
        var myResponse = responseGenerator.generate(true,"Blog Does Not Exist. Please Check Your Input.",404,null);
        res.send(myResponse);
      }
      else{
        //reading and showing the updated result.
        blogModel.find({"blogId":req.params.blogId},function(err,newResult){
          console.log("Blog Updation Success.");
          var myResponse = responseGenerator.generate(false,"Blog Updation Success.",200,newResult);
          res.send(myResponse);
        });
      }
    });

  });

  //route to delete a blog.
  router.post("/delete/:blogId",function(req,res){
    //removing blog.
    blogModel.remove({"blogId":req.params.blogId},function(err,result){

      //parsing JSON data for accessing fields of result.
      var newResult = JSON.parse(result);

      if(err){
        console.log(err);
        var myResponse = responseGenerator.generate(true,"Some Error : "+err,500,null);
        res.send(myResponse);
      }
      else if(result == undefined || result == null || result == "" || newResult.n == 0){
        console.log("Blog Does Not Exist. Please Check Your Input.");
        var myResponse = responseGenerator.generate(true,"Blog Does Not Exist. Please Check Your Input.",404,null);
        res.send(myResponse);
      }
      else{
        console.log("Blog Deletion Success.");
        var myResponse = responseGenerator.generate(false,"Blog Deletion Success.",200,result);
        res.send(myResponse);
      }
    });
  });

  app.use("/api/v1/blog",router);

}//end of controller function.
