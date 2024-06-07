const jwt=require("jsonwebtoken");
const User=require('../models/user');
require("dotenv").config()

//fecting user from token

const fetchuser= async(req,res,next)=>{
  let success=false;
  try{
    //storing token from hedder auth-token
  const token= req.header('auth-token');
  //declaring token id
  //console.log(token);
  try{
    //verifing token 
    const tokenId=jwt.verify(token,process.env.JWT_TOKEN_SCRECT);
    req.user=tokenId;
    next();
  }
  catch(err){
    //console.log(err);
    return res.status(400).json({success:success,err:"invalid token"});
  }
  
  }
  catch(err){
    console.error(err);
    res.status(401).json({success:success,err:"server error"})
  }
}
module.exports=fetchuser;