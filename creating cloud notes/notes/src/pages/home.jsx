//import Addnotes from "../components/Addnotes";
//import Addnotes from "../components/Addnotes";
import Navbar from "../components/Navbar";
//import ViewNotes from "../components/viewNotes";
import { useContext, useEffect } from "react"
import NoteContext from "../context/notes/Notecontext"
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {Link,useNavigate } from "react-router-dom"
import UserContext from "../context/user/Usercontext"



export default function Home() {
  let {notes,getNotes}=useContext(NoteContext);
  let {auth,checkLocal,token} =useContext(UserContext);
  let navigate=useNavigate();
  
  useEffect(()=>{
    
    let tok=localStorage.getItem("auth-token")
    checkLocal(tok);
    console.log(tok,"hi",window.localStorage.getItem("go"));
  },[])
  
  useEffect(()=>{
    if(!auth){
      navigate("/signup")
    }
  },[auth, navigate])

  
  useEffect(()=>{
    if(auth){getNotes()}},[auth,token]);  
  
  return (
    <div className="bg-background min-h-[100vh]">
      <Navbar/>
      <div>
      <div className="p-2 flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Your Notes</h1>
      </div>
      <div className=" items-center justify-center">
      <div className="relative left-1/2 -translate-x-1/2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-[90vw] md:w-[80vw] sm:w-[80vw] gap-2 p-2">
      
      <div className="bg-gray-300 rounded-md relative"> 
      <Link to="/notes/" >     
        <div className="h-10 bg-gray-400 p-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md flex justify-center hover:shadow-xl items-center shadow-md transition-all hover:bg-gray-200 cursor-pointer" >          
          <FontAwesomeIcon icon={faPlus}/>
          <p className="mx-2 text-nowrap">Create New</p>
        </div> 
        </Link>      
      </div>
      
      {notes.length?notes.map((note)=>{return <Card key={note._id} note={note}/>}):<p className="h-20  font-semibold text-xl flex items-center justify-center">no notes</p>}
    </div>
    </div>
    </div>
    </div>
  )
}
