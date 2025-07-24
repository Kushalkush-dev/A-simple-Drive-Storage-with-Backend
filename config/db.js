const mongoose=require("mongoose")

async function  dbconnection(){
  try {

  await mongoose.connect("mongodb://0.0.0.0/Drive-Storage").then(()=>{
  console.log("Connected to Database");
  
 })
    
  } catch (error) {
    console.log("Unable to connect to Database",error);
    
  }

 
}

module.exports=dbconnection