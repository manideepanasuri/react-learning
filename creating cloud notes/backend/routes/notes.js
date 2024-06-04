const express = require('express');
const Notes=require("../models/notes");
const fetchuser = require('../middleware/fetchUser');
const {body,validationResult} =require('express-validator');


const router = express.Router();


//route 1:get method: fetching all notes of a particular user: login required
router.get("/fetchNotes",fetchuser,async(req,res)=>{
  try{
  let notes=await Notes.find({user:req.user.id});
  console.log(notes);
  res.status(200).json(notes);}
  catch(err){
    console.error(err);
    res.status(401).json({err:"internal server error"})
  }
})


//route 2: post method:creating a new notes:login required

router.post("/createNotes",fetchuser,[
  body("title").isLength(2),
  body("descreption").isLength(2),
],async(req,res)=>{
  //expressvalidator  validating the data given 
  const result= validationResult(req);
  if(!result.isEmpty()){
    res.status(400).json(result);
  }
  try{
  const note=await Notes.create({
    user:req.user.id,
    title:req.body.title,
    descreption:req.body.descreption,
    tag:req.body.tag
  })
  console.log(note);
  res.status(200).json(note);
  return;
}
  catch(err){
    console.log(err);
    res.status(401).json({err:"internal server error"});
    return;
  }
})

//route 3:put method:update a particular note login required
router.put("/updateNotes/:id",fetchuser,async(req,res)=>{
  try{
  //console.log(req.params.id);
  let notes= await Notes.findById(req.params.id);
  if(!notes){return res.status(400).json({err:"notes not found"})}
  if(!notes.user.toString()==req.user){
    return res.status(400).json({err:"not allowed"});
  }
  
  notes=await Notes.findByIdAndDelete(req.params.id);
  //console.log(notes);
  res.status(200).send("success");}
  catch(err){
    console.log(err);
    return res.status(400).json({err:"internal server error"})
  }
})

//route: delete :delete notes :login required
router.delete("/deleteNotes/:id",fetchuser,async(req,res)=>{
  try{
  //console.log(req.params.id);
  let notes= await Notes.findById(req.params.id);
  if(!notes){return res.status(400).json({err:"notes not found"})}
  if(!notes.user.toString()==req.user){
    return res.status(400).json({err:"not allowed"});
  }
  let {title,descreption,tag}=req.body;
  let updateObj;
  if(title){updateObj={...updateObj,title:title}}
  if(descreption){updateObj={...updateObj,descreption:descreption}}
  if(tag){updateObj={...updateObj,tag:tag}}
  notes=await Notes.findByIdAndUpdate(req.params.id,updateObj,{new:true});
  //console.log(notes);
  res.status(200).send(notes);}
  catch(err){
    console.log(err);
    return res.status(400).json({err:"internal server error"})
  }
})

module.exports=router;