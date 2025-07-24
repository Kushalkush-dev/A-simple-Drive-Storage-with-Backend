const express=require("express")
const Router=express.Router()


Router.get("/home",(req,res)=>{
  res.render("home")
})


module.exports=Router