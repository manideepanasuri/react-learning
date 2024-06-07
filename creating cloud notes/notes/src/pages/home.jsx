//import Addnotes from "../components/Addnotes";
//import Addnotes from "../components/Addnotes";
import Navbar from "../components/Navbar";
//import ViewNotes from "../components/viewNotes";
import { useContext, useEffect, useState } from "react"
import NoteContext from "../context/notes/Notecontext"
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {Link,useNavigate } from "react-router-dom"
import UserContext from "../context/user/Usercontext"
import LoadingBar from "react-top-loading-bar";


export default function Home() {
  const [progress,setProgress]=useState(0);
  //let tok1=localStorage.getItem("auth-token");
  let {notes,getNotes}=useContext(NoteContext);
  let {auth,checkLocal,token} =useContext(UserContext);
  let navigate=useNavigate();
  //let [res1,setRes1]=useState(true);
  
  
  useEffect(()=>{
    setProgress(40);
    let tok=localStorage.getItem("auth-token")
    checkLocal(tok);
    
    setProgress(100);
  },[])
  ;
  useEffect(()=>{
    if(!auth){
      navigate("/signup")
    }
  },[auth, navigate])

    
  useEffect(()=>{
    setProgress(40);
      if(auth){getNotes()}
    setProgress(100);
  },[auth,token]);  
    
  return (
    <div className="bg-background min-h-[100vh]">
      <Navbar/>
      <div className="relative">
      
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        
      />
      </div>
      <div>
      <div className="p-2 flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Your Notes</h1>
      </div>
      <div className=" items-center justify-center">
      <div className="relative left-1/2 -translate-x-1/2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-[90vw] md:w-[80vw] sm:w-[80vw] gap-3 p-2">
      
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
