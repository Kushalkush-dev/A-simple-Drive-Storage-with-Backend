const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    minlength:[3,"Enter username with mininum of 3 characters"],
    unique:true,
    lowercase:true
  },
  email:{
    type:String,
    required:true,
    minlength:[11,"Enter email with mininum of 11 characters"],
    unique:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true,
    minlength:[5,"Mininum number of characters required is 5"],
    unique:true,
  }
  
},{timestamps:true})

const User=mongoose.model("User",userSchema)

module.exports=User
