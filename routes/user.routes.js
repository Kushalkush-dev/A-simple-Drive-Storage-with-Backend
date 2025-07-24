const express=require("express")
const Router=express.Router()
const {body, validationResult}=require("express-validator")
const userModel=require("../models/user.models")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")


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

    const hashPassword=await bcrypt.hash(password,10)

    const newuser= await userModel.create({
      username:username,
      email:email,
      password:hashPassword
    })
    res.send(newuser)
    

  

})





Router.get("/login",(req,res)=>{
  res.render("login")
})

Router.post("/login",
  body("username").trim(),
  body("password").trim(),async (req,res)=>{

  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      message:"Invalid data",
      errors:errors.array()
    })
  }

  const {username,password}=req.body

 const user=await userModel.findOne({
  username:username
  })

  if(!user){
    res.status(400).json({
      message:"Username or Password is Incorrect"
    })
  }

  const isMatch=await bcrypt.compare(password,user.password)
  if(!isMatch){
    res.status(400).json({
      message:"Username or Password is Incorrect"
    })
  }

  const token=jwt.sign({
    _id:user._id,
    email:user.email,
    username:username
  },process.env.JWT_ACCESS_TOKEN)

  return res.json({token:token})
})


module.exports=Router