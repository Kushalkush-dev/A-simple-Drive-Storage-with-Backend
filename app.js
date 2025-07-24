const express=require("express")
const app=express()
const userRouter=require("./routes/user.routes")
const mongoose=require("mongoose")
const dbconnection=require("./config/db")
const bcrypt = require('bcrypt');
const cookieParser=require("cookie-parser")
const indexRouter=require("./routes/index.routes")
dbconnection()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const Port=6200;

app.set("view engine","ejs")

app.use("/",indexRouter)
app.use("/user",userRouter)

app.get("/user",(req,res)=>{
  res.send("<h1>Homepage</h1>")
})

app.get("/",(req,res)=>{
  res.send("<h1>Welcome to the Server</h1>")
})
app.listen(Port,()=>{  
  console.log(`Server is running on Port :${Port}`);
  }
)