const mongoose=require("mongoose")

const fileSchema=mongoose.Schema({
  path:{
    type:String,
    required:[true,"patth is required"]
  },
  disppath:{
    type:String,
    required:true
  },
  originalname:{
     type:String,
     required:[true,"patth is required"]
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"User is required"]
  }

})

const Filemodel=mongoose.model("Filemodel",fileSchema)

module.exports=Filemodel;