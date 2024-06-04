const jwt=require("jsonwebtoken");
const User=require('../models/user');

//fecting user from token

const fetchuser= async(req,res,next)=>{
  try{
    //storing token from hedder auth-token
  const token= req.header('auth-token');
  //declaring token id
  
  try{
    //verifing token 
    const tokenId=jwt.verify(token,"hello my name is manideep");
    req.user=tokenId;
    next();
  }
  catch(err){
    //console.log(err);
    return res.status(400).json({token:"invalid token"});
  }
  
  }
  catch(err){
    console.error(err);
    res.status(401).json({err:"server error"})
  }
}
module.exports=fetchuser;