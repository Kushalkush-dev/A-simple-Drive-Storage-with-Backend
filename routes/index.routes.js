const express=require("express")
const Router=express.Router()
const multer=require("multer")
const cloudinary=require("../config/cloudinary")





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

Router.get("/home",(req,res)=>{
  res.render("home")
})




Router.post("/upload",upload.single("file"),async (req,res)=>{
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
  res.send(`Upload successfull 
    <img src="${result.secure_url}" width="300" height="200">
    <iframe src="${result.secure_url}" width="50%" height="600px"></iframe>


   
    <a href="${downloadfile}" download target="_blank">download</a>`)
    console.log(req.file);
    
  
})


module.exports=Router