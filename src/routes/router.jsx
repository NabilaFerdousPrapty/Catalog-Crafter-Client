
import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./Private/PrivateRoute";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute>
        <Main/>
      </PrivateRoute>,
      children:[
        {
            path: "/",
            element:<Home/>,

        }
      ]
    },
    {
        path:'/login',
        element:<Login/>
    },{
        path:'/signup',
        element:<SignUp/>
    }
  ]);
export default router;