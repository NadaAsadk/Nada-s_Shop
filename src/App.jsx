import React from 'react'
import Root from './routes/Root'
import Home from './pages/Home/components/Home';
import Categories from './pages/Categories/components/Categories';
import Signin from './pages/Signin/components/Signin';
import Register from './pages/Register/components/Register';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import NotFound from './pages/NotFound/NotFound';
import Products from './pages/Products/components/Products';
import ALL_Products from './pages/ALL_Products/components/ALL_Products';

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
        path:'/Register',
        element:<Register />,
      },
      {
        path:'/Products',
        element:<ALL_Products />,
      },
      
      {
        path:'*',
        element:<NotFound />,
      },
    ],
  },{
    path: "/products/category",
    element: <Products />,
  }
]);

export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
