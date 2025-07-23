const express=require("express")
const Router=express.Router()



Router.get("/register",(req,res)=>{
  res.render("register")
})

Router.post("/register",(req,res)=>{
  console.log(req.body); 
  res.render("index")

})
module.exports=Router