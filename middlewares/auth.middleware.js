
const jwt=require("jsonwebtoken")

function auth(req,res,next){
  const token=req.cookies.token;
  
 if(!token){
    return res.status(401).json({
      message:"Unauthorized"
    })
 }
 try {

   const decoded= jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
   req.user=decoded

   return next()
  
 } catch (error) {

    res.status(401).json({
      message:"Unauthorized"
    })
  
 }



}


module.exports=auth;