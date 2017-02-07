//including dependencies.
var responseGenerator = require("../libs/responseGenerator.js");

//function to validate if blog title is given or not and return accordingly.
module.exports.checkTitle = function(req,res,next){
  if(req.body.title == undefined || req.body.title == null || req.body.title == ""){
    console.log("Title Can Not Be Empty. Please Provide The Title.");
    var myResponse = responseGenerator.generate(true,"Title Can Not Be Empty. Please Provide The Title.",404,null);
    res.send(myResponse);
  }
  else{
    next();
  }
};

//function to validate if blog title is given at the time of editing.
module.exports.checkUpdatedTitle = function(req,res,next){
  if(req.body.title == ""){
    console.log("Title Can Not Be Empty. Please Provide The Title.");
    var myResponse = responseGenerator.generate(true,"Title Can Not Be Empty. Please Provide The Title.",404,null);
    res.send(myResponse);
  }
  else{
    next();
  }
};
