
import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./Private/PrivateRoute";
import Error from "../Pages/Error/Error";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute>
        <Main/>
      </PrivateRoute>,
 errorElement:<Error/>,
      children:[
        {
            path: "/",
            element:<Home/>,

        }
      ]
    },
    {
        path:'/login',
        element:<Login/>,
        errorElement:<Error/>
    },{
        path:'/signup',
        element:<SignUp/>,
        errorElement:<Error/>
    }
  ]);
export default router;