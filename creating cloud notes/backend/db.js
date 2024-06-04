const mongoose=require("mongoose");

let url='mongodb://127.0.0.1:27017/cloudNotes';
const ConnectToDb=async()=>{
  try{
    await mongoose.connect(url);
    console.log("connected succefullly")
  }
  catch(err){console.log(err)}
}
module.exports=ConnectToDb;
