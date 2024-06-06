
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import NoteContext from "../context/notes/Notecontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'



export default function Addnotes() {
  const location=useLocation();
  const [title,setTitle]=useState(()=>{return (location.state)?location.state.title:""});
  const [descreption,setDescreption]=useState(()=>{return (location.state)?location.state.descreption:""});
  const [tag,setTag]=useState(()=>{return (location.state)?location.state.tag:"general"});
  
  
  let {addNotes,editNotes}=useContext(NoteContext);
  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeDescreption(e) {
    setDescreption(e.target.value);
  }
  function handleChangeTag(e) {
    setTag(e.target.value);
  }
  function handleClick() {    
    if(title.length<1||descreption.length<1){return}
    if(!location.state){addNotes(title,descreption,tag);}
    else{editNotes({_id:location.state._id,title,descreption,tag})}
  }

  return (
    <div >
      <Navbar/>
      <div className="flex items-center justify-center p-3">
        {(location.state)?<h1 className="text-3xl font-bold">Edit Your Notes</h1>:<h1 className="text-3xl font-bold">Create New Notes</h1>}
      </div>
      <div className="flex items-center justify-center p-2">
        <div className="bg-gray-300 p-3 rounded-md m-3">
        
        <label htmlFor="title">
        <h2 className="text-xl font-semibold">Enter Title</h2>
        <input type="text" className="w-[80vw] my-2 h-9 p-3  rounded-md" onChange={handleChangeTitle} id="title" value={title} placeholder="Title" />
        
        </label>
        <label htmlFor="descreption">
          <h2 className="text-xl font-semibold">Descreption</h2>
          <textarea name="descreption" placeholder="Descreption" className="w-[80vw] my-2 h-[40vh] p-3  rounded-md" id="descreption" value={descreption} onChange={handleChangeDescreption}></textarea>
          
        </label>
        <div className="flex items-end justify-between">
        <label htmlFor="tag">
          <h2 className="text-xl font-semibold">Tag</h2>         
          <input type="text" id="tag" placeholder="Tag" value={tag} onChange={handleChangeTag} className="my-2 p-2 px-3 rounded-md"/>            
        </label>
        <div>
        <Link to='/'>
        <button  className="transition-all bg-textcolor text-background hover:bg-gray-900  hover:shadow-md p-2 my-2 rounded-md ml-3" onClick={handleClick}>Save Notes</button>
        </Link>
        <Link to='/'>
        <button className="bg-textcolor text-background hover:bg-gray-900  hover:shadow-md p-2 my-2 rounded-md ml-3"><FontAwesomeIcon icon={faTrash}/> Clear</button>
        </Link>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}
