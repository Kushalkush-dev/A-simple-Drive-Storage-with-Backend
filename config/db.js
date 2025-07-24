const mongoose=require("mongoose")
require("dotenv").config()


async function  dbconnection(){
  try {

  await mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("Connected to Database");
  
 })
    
  } catch (error) {
    console.log("Unable to connect to Database",error);
    
  }

 
}

module.exports=dbconnection