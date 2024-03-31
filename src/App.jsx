import React, { useState } from 'react'
import Root from './routes/Root'
import Home from './pages/Home/components/Home';
import Categories from './pages/Categories/components/Categories';
import Signin from './pages/Signin/components/Signin';
import Register from './pages/Register/components/Register';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
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
import CartContextProvider from './context/CartItems';



export default function App() {
  const [userName, setUserName] = useState('nada');
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/Categories',
          element: 
          <ProtectedRoutes>
          <Categories />
          </ProtectedRoutes>,
        },
        {
          path: '/Signin',
          element: <Signin />,
        },
        {
          path: '/Cart',
          element: 
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>,
        },
        {
          path: '/Register',
          element:
            <Register />,
        },
        {
          path: '/Profile',
          element:
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>,
        },
        {
          path: '/order',
          element:
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>,
        },
        {
          path: '/forgotPassword',
          element: <ForgotPassword />,
        },
        {
          path: '/resetPassword',
          element: <ResetPassword />,
        },
        {
          path: '/Products',
          element:
            <ProtectedRoutes>
              <ALL_Products />
            </ProtectedRoutes>
          ,
        }, {
          path: "/products/category/",
          element:
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>,
        }, {
          path: "/productsdetails",
          element: 
          
          <ProtectedRoutes>
            <Product />
          </ProtectedRoutes>,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    }
  ]);

  return (
    <>
      <ToastContainer />
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </UserContextProvider>
    </>
  )
}
