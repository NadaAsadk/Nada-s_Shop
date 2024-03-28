import React from 'react'
import { Navigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

export default function ProtectedRoutes({children}) {
    const token = localStorage.getItem('userToken');
    if(!token){
      toast.warn('Confirm your login Info', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        return <Navigate to='/Signin' replace/>
    }

  return children;

}
