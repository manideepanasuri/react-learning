const express = require('express');
const User=require('../models/user');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const fetchuser=require("../middleware/fetchUser");
require("dotenv").config();

const router = express.Router()
const {body,validationResult} =require('express-validator');

//creating a user using post route doesnt require auth /login
router.post("/createUser",[body("name").isLength({min:3}),
body("email").isEmail(),
body("password").isLength({min:6})],async(req,res)=>{
    let success=false;

  //expressvalidator  validating the data given
  const result= validationResult(req);
  if(!result.isEmpty()){
    res.status(400).json({success:success,err:result});
  }
  else{
    //searching weather user already exists or not
    let user= await User.findOne({email:req.body.email});
    //if exists
    if(user){
      return res.status(400).json({success:success,err:"user already exists"})
    }
    //if doesnt exist creating user
    try{
      //bcrypt salt passwords
      const salt=await bcrypt.genSalt(10);
      const hashed_p= await bcrypt.hash(req.body.password,salt);

      user= await User.create(
        {
          "name":req.body.name,
          "email":req.body.email,
          "password":hashed_p
        }
      );
    //console.log(user);  
    }
    catch(err){return res.status(400).json({success:success,err:"coudnt generate hash password"})}

    const token=jwt.sign({id:user.id},process.env.JWT_TOKEN_SCRECT);
    success=true;
    res.status(200).json({success:success,token:token});
  }
  
})


//Login route: no login required
router.post("/login",[
  body('email').isEmail(),
  body('password').isLength({min:1})
],async(req,res)=>{
  let {email,password}=req.body;
  let success=false;
  const result= validationResult(req);
  //email and password validation
  try{
    if(!result.isEmpty()){
      return res.status(400).json({success:success,err:result});
    }
    else{
      //finding user
      let user=await User.findOne({email:email})
      //if user doesnt exist 
      if(!user){return res.status(400).json({success:success,err:"user does not exists please sign up"})}
      //comparing inp password with user password
      let pCompareResult=await bcrypt.compare(password,user.password);
      //if result is false
      if(!pCompareResult){return res.status(400).json({success:success,err:"wrong password"})}
      //if result is true sending token
      const token=jwt.sign({id:user.id},process.env.JWT_TOKEN_SCRECT);
      success=true;
      return res.status(200).json({success:success,token:token});
    }
  }
  catch(err){console.log(err);return res.status(401).json({success:success,err:"server error"})}
})

//get User

router.post("/getUser",fetchuser,async(req,res)=>{
  let success=false;
  try{
    //storing user without password
  const user=await User.findById(req.user.id).select("-password");
  //sending user
  success=true;
  res.status(200).json({success:success,user:user});}
  catch(err){
    console.log(err);
    res.status(401).json({success:success,err:"unknown error"})
  }
  
})

module.exports=router;