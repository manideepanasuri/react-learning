
import { useState } from "react";
import Nav from "./components/Navbar"
import Mani from "./pages/Mani";

function App() {
  
  const [mode,setMode]=useState("light");
  function toggleMode() {
    if(mode==="light"){setMode("dark")}
    else{setMode("light")}
  }

  return (
    <>
      <div className={`${mode}-bg h-[100vh] ${mode}-txt`}>
      <Nav mode={mode} toggle={toggleMode} />      
      <Mani mode={mode}/>
      </div>
    </>
      
  )
}

export default App
