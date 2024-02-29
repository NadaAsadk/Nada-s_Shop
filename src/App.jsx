import React from 'react'
import Root from './routes/Root'
import Home from './pages/Home/components/Home';
import Categories from './pages/Categories/components/Categories';
import Signin from './pages/Signin/components/Signin';
import Signup from './pages/Signup/components/Signup';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import NotFound from './pages/NotFound/NotFound';

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
        path:'/Signup',
        element:<Signup />,
      },
      {
        path:'*',
        element:<NotFound />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
