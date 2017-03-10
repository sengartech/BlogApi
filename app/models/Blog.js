//including dependencies.
var mongoose = require("mongoose");

//declaring schema object.
var Schema = mongoose.Schema;

//defining blog schema.
var blogSchema = new Schema({

  blogId : {type:String,unique:true,required:true},
  title : {type:String,default:"",required:true},
  subTitle : {type:String,default:""},
  content : {type:String,default:"No content to display."},
  imageUrl : {type:String,default:"http://default/path/to/image.jpg"},
  likes : {type:Number,default:0},
  shares : {type:Number,default:0},
  author : {type:String,default:""},
  createdOn : {type:Date,default:""},
  updatedOn : {type:Date,deafult:""}

});

//creating model.
mongoose.model("Blog",blogSchema);
