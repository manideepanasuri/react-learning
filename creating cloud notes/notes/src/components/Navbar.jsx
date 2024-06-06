
//import { useContext } from "react";
import { Link,useLocation } from "react-router-dom";
import Alert from "./Alert";
import { useContext } from "react";
import AlertContext from "../context/alert/Alertcontex";
//import NoteContext from "../context/notes/Notecontext";





export default function Navbar() {
  let location=useLocation();
  let {show}=useContext(AlertContext);
  //let state=useContext(NoteContext);
  //console.log("hi");
  return (
    
    <div className="p-2 flex items-center justify-between relative">
      <Link to='/'><h1 className="inline-block text-xl font-bold light ">Notes</h1></Link>
      <ul className="flex items-center">
        <Link to='/'>
          <li className={"m-2 smooth cursor-pointer "+((location.pathname==="/")?"active":"un-active")}>Home</li>          
        </Link>
        <Link to='/about'>
          <li className={"m-2 smooth cursor-pointer "+((location.pathname==="/about")?"active":"un-active")}>About Us </li>
        </Link>
        <Link to='/notes'>
          <li className={"m-2 smooth cursor-pointer "+((location.pathname==="/notes")?"active":"un-active")}>Create New</li>
        </Link>
        
      </ul>
      {(show)?<div className="absolute top-full left-1/2 -translate-x-1/2">
        <Alert/>
      </div>:<></>
      }
    </div>
  )
}
