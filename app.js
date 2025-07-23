const express=require("express")
const app=express()
const userRouter=require("./routes/user.routes")

const Port=6200;

app.set("view engine","ejs")


app.use("/user",userRouter)

app.listen(Port,()=>{  
  console.log(`Server is running on Port :${Port}`);
  }
)