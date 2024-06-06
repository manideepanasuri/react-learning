import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Aboutus from "./pages/aboutus";
import Notestate from "./context/notes/Notestate";
import Addnotes from "./pages/Addnotes";

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
    <>
    <Notestate>
      <RouterProvider router={router} />
    </Notestate>
    </>
  )
}

export default App
