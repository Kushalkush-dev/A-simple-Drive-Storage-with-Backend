const express=require("express")
const Router=express.Router()
const multer=require("multer")
const cloudinary=require("../config/cloudinary")





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()    
    cb(null, uniqueSuffix + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage })

Router.get("/home",(req,res)=>{
  res.render("home")
})




Router.post("/upload",upload.single("file"),async (req,res)=>{
 const result=await cloudinary.uploader.upload(req.file.path,
  {
    folder:"sample",
    use_filename:true
  }
 )
  res.json(result)
  
})


module.exports=Router