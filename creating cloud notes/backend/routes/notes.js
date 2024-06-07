const express = require('express');
const Notes=require("../models/notes");
const fetchuser = require('../middleware/fetchUser');
const {body,validationResult} =require('express-validator');


const router = express.Router();


//route 1:get method: fetching all notes of a particular user: login required
router.get("/fetchNotes",fetchuser,async(req,res)=>{
  let success=false;
  try{
  let notes=await Notes.find({user:req.user.id}).sort({$natural:-1});
  //console.log(notes);
  success=true;
  res.status(200).json({success:success,notes:notes});}
  catch(err){
    console.error(err);
    res.status(401).json({success:success,err:"internal server error"})
  }
})


//route 2: post method:creating a new notes:login required

router.post("/createNotes",fetchuser,[
  body("title").isLength(1),
  body("descreption").isLength(1),
],async(req,res)=>{
  //expressvalidator  validating the data given 
  let success=false;

  //console.log(req.body);
  const result= validationResult(req);
  if(!result.isEmpty()){
   return res.status(400).json({success:success,err:result});
  }
  try{
  const note=await Notes.create({
    user:req.user.id,
    title:req.body.title,
    descreption:req.body.descreption,
    tag:req.body.tag
  })
  success=true
  //console.log(note);
  res.status(200).json({success:success,notes:note});
  return;
}
  catch(err){
    console.log(err);
    res.status(401).json({success:success,err:"internal server error"});
    return;
  }
})

//route 3:delete method:delete a particular note login required
router.delete("/deleteNotes/:id",fetchuser,async(req,res)=>{
  let success=false;
  try{
  //console.log(req.params.id);
  let notes= await Notes.findById(req.params.id);
  if(!notes){return res.status(400).json({err:"notes not found"})}
  if(!notes.user.toString()==req.user){
    return res.status(400).json({err:"not allowed"});
  }
  
  notes=await Notes.findByIdAndDelete(req.params.id);
  //console.log(notes);
  success=true;
  res.status(200).json({success:success});}
  catch(err){
    console.log(err);
    return res.status(400).json({success:success,err:"internal server error"})
  }
})

//route: put :update notes :login required
router.put("/updateNotes",fetchuser,async(req,res)=>{
  let success=false;
  try{
  //console.log(req.params.id);
  //console.log(req.body);
  let {title,descreption,tag,_id}=req.body;
  let notes= await Notes.findById(_id);
  //console.log(notes)
  if(!notes){return res.status(400).json({success:success,err:"notes not found"})}
  if(!notes.user.toString()==req.user){
    return res.status(400).json({success:success,err:"not allowed"});
  }
  
  let updateObj={title,descreption,tag};  
  notes=await Notes.findByIdAndUpdate(_id,updateObj,{new:true});
  //console.log(notes);
  success=true;
  res.status(200).json({success:success,notes:notes});}
  catch(err){
    console.log(err);
    return res.status(400).json({success:success,err:"internal server error"})
  }
})

module.exports=router;