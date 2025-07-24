const express=require("express")
const Router=express.Router()
const {body, validationResult}=require("express-validator")
const userModel=require("../models/user.models")


Router.get("/register",(req,res)=>{
  res.render("register")
})

Router.post("/register",
  body("username").trim().isLength({min:3}),
  body("email").trim().isLength({min:11}),
  body("password").trim().isLength({min:5}),async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
     return  res.status(400).json({
        message:'Invalid data',
        errors:errors.array() 
      })
    }
    const {username,email,password}=req.body 

    const newuser= await userModel.create({
      username:username,
      email:email,
      password:password
    })
    res.send(newuser)
    

  

})



Router.get("/login",(req,res)=>{
  res.render("login")
})



Router.post("/login",(req,res)=>{

})

module.exports=Router