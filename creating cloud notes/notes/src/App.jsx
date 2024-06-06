import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Aboutus from "./pages/aboutus";
import Notestate from "./context/notes/Notestate";
import Addnotes from "./pages/Addnotes";
import Alertstate from "./context/alert/Alertstate";
import Userstate from "./context/user/Userstate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path:"/about",
    element:<Aboutus/>
  },
  {
    path:"/notes",
    element:<Addnotes/>
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
