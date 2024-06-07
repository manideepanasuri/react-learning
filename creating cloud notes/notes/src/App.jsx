import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";

import Notestate from "./context/notes/Notestate";
import Addnotes from "./pages/Addnotes";
import Alertstate from "./context/alert/Alertstate";
import Userstate from "./context/user/Userstate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createHashRouter([
  {
    path: "/",
    element: <Home/>
  },
  
  {
    path:"/notes",
    element:<Addnotes/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
]);

function App() {
  

  return (
   
    <Alertstate>
    <Userstate>
      <Notestate>
      
        <RouterProvider router={router} />
        
      </Notestate>
      </Userstate>
    </Alertstate>
    
    
  )
}

export default App
