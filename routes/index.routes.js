const express=require("express")
const Router=express.Router()
const multer=require("multer")
const cloudinary=require("../config/cloudinary")
const Filemodel=require("../models/file.model")
const authmiddleware=require("../middlewares/auth.middleware")





// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now()    
//     cb(null, uniqueSuffix + '-' +file.originalname )
//   }
// })


const storage=multer.memoryStorage();

const upload = multer({ storage: storage })

Router.get("/home",authmiddleware,async (req,res)=>{
   
  const userfiles=await Filemodel.find({
    user:req.user._id
  })
  console.log(userfiles);
  
  res.render("home",{
    files:userfiles
  }
  )
})








Router.post("/upload",authmiddleware,upload.single("file"),async (req,res)=>{
  
  const base64=req.file.buffer.toString("base64")
  const dataUri=`data:${req.file.mimetype};base64,${base64}`

  

 const result=await cloudinary.uploader.upload(dataUri,
  {
    folder:"sample",
    public_id:+ Date.now()+"_"+ req.file.originalname,
    resource_type:"auto"
  }
 )

const downloadfile=result.secure_url.replace('/upload',"/upload/fl_attachment")
const newfile=await Filemodel.create({
  path:downloadfile,
  originalname:req.file.originalname,
  user:req.user._id
})

res.redirect("home")



  // res.send(`Upload successfull 
  //   <img src="${result.secure_url}" width="300" height="200">
  //   <embed src="${result.secure_url}" type="application/pdf" width="100%" height= "500">
  //   <a href="${downloadfile}" download target="_blank">download</a>`)
  //   console.log(req.file);
    
  
})


module.exports=Router