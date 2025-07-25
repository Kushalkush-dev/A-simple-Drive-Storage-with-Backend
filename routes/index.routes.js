const express=require("express")
const Router=express.Router()
const multer=require("multer")





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() 
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

Router.get("/home",(req,res)=>{
  res.render("home")
})



Router.post("/upload",upload.single("file"),(req,res)=>{
  res.json(req.file)
  
})


module.exports=Router