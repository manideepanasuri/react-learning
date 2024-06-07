const mongoose=require("mongoose");
require("dotenv").config()

let url=process.env.MONGO_DB_URI;
const ConnectToDb=async()=>{
  try{
    await mongoose.connect(url);
    console.log("connected succefullly")
  }
  catch(err){console.log(err)}
}
module.exports=ConnectToDb;
