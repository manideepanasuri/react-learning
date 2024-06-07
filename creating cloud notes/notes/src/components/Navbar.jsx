//import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Alert from "./Alert";
import { useContext, useState } from "react";
import AlertContext from "../context/alert/Alertcontex";
import UserContext from "../context/user/Usercontext";
//import NoteContext from "../context/notes/Notecontext";


export default function Navbar() {
  const [progress,setProgress]=useState(0);
  let location = useLocation();
  let { show } = useContext(AlertContext);
  let { auth, logOut } = useContext(UserContext);
  //let state=useContext(NoteContext);
  //console.log("hi");

  function handleLogOut() {
    setProgress(40);
    window.localStorage.removeItem("auth-token");
    logOut();
    setProgress(100);
  }
  function handleClick() {
    setProgress(40);
    setProgress(100);
  }
  return (
    <div className="p-2 flex items-center justify-between relative">
      <Link to="/">
        <h1 className="inline-block text-xl font-bold light ">Notes</h1>
      </Link>
      {
      (auth)?<div className="flex items-center justify-end">
        <ul className="flex items-center">
          <Link to="/">
            <li
              className={
                "m-2 smooth cursor-pointer " +
                (location.pathname === "/" ? "active" : "un-active")
              }
            >
              Home
            </li>
          </Link>
          <Link to="/notes">
            <li
              className={
                "m-2 smooth cursor-pointer " +
                (location.pathname === "/notes" ? "active" : "un-active")
              }
            >
              Create New
            </li>
          </Link>
        </ul>
        <button className="p-2 py-1 mx-3 hover:bg-textcolor hover:text-background duration-300 rounded-md border-2 border-textcolor" onClick={handleLogOut}>Log Out</button>
      </div>:<div className="flex items-center justify-end">
      <Link to="/login">
        <button onClick={handleClick} className=" p-2 py-1 mx-3 hover:bg-textcolor hover:text-background duration-300 rounded-md border-2 border-textcolor">Login</button>
        </Link>
        <Link to="/signup">
        <button onClick={handleClick} className="p-2 py-1 mx-3 hover:bg-textcolor hover:text-background duration-300 rounded-md border-2 border-textcolor">Sign up</button>
        </Link>
      </div>
      }
      {show ? (
        <div className="absolute top-full left-1/2 -translate-x-1/2">
          <Alert />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
