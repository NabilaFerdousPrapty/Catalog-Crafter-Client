
import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./Private/PrivateRoute";
import Error from "../Pages/Error/Error";
import UseAxiosCommon from "../hooks/UseAxiosCommon";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
const axiosCommon=UseAxiosCommon();
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
            loader: async () => {
              try {
                  const response = await axiosCommon.get("/productsCount");
                  return response.data;
              } catch (error) {
                  // console.error("Error loading product count:", error);
                  throw new Error("Failed to load product count");
              }
          }
          

        },{
          path: "/product/:id",
          element:<ProductDetails/>,
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