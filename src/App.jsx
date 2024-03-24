import React, { useState } from 'react'
import Root from './routes/Root'
import Home from './pages/Home/components/Home';
import Categories from './pages/Categories/components/Categories';
import Signin from './pages/Signin/components/Signin';
import Register from './pages/Register/components/Register';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import NotFound from './pages/NotFound/NotFound';
import Products from './pages/Products/components/Products';
import ALL_Products from './pages/ALL_Products/components/ALL_Products';
import Product from './pages/Product/component/Product';
import UserContextProvider from './context/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart/components/Cart';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Profile from './pages/Profile/Profile';
import Order from './pages/Order/Order';



export default function App() {
  const [userName,setUserName] = useState('nada');
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path:'/',
          element:<Home />,
        },
        {
          path:'/Categories',
          element:<Categories />,
        },
        {
          path:'/Signin',
          element:<Signin />,
        },
        {
          path:'/Cart',
          element:<Cart />,
        },
        {
          path:'/Register',
          element:
          <Register />,
        },
        {
          path:'/Profile',
          element:
          <Profile />,
        },
        {
          path:'/order',
          element:
          <Order />,
        },
        {
          path:'/forgotPassword',
          element:<ForgotPassword />,
        },
        {
          path:'/resetPassword',
          element:<ResetPassword />,
        },
        {
          path:'/Products',
          element:
          <ProtectedRoutes>
            <ALL_Products />
          </ProtectedRoutes>
          ,
        },{
          path: "/products/category/",
          element: <Products />,
        },{
          path: "/productsdetails",
          element: <Product />,
        },
        {
          path:'*',
          element:<NotFound />,
        },
      ],
    }
  ]);

  return (
    <>
    <ToastContainer/>
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
    </>
  )
}
