const express=require("express")
const Router=express.Router()


Router.get('/test',(req,res)=>{
  res.send("Using Routes")
})


module.exports=Router