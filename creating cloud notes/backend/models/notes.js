const mongoose=require("mongoose");
const User=require("./user");
const {Schema}=mongoose;

const notesSchema= new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  title:{
    type:String
  },
  descreption:{
    type:String
  },
  tag:{
    type:String,
    default:"general"
  },
  data:{
    type:Date,
    default:Date.now
  }
})
const Notes=mongoose.model("notes",notesSchema);
module.exports=Notes;