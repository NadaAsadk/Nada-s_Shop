import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

export default function ResetPassword() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
        code: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
    
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch(`/auth/forgotPassword`, {
                email: user.email,
                password: user.password,
                code: user.code,
              });
              toast.success('Password changed successfully', {
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
              navigate('/Signin');
        } catch (error) {
            toast.error(error, {
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
        }
        
        
        
        


    };
  return (
    <div className="main">
            <h1 className='firstLabel'>Reset Password</h1>
            <form onSubmit={handleSubmit}>
            <label>email</label>
                <input type="email" name="email" onChange={handleChange} />

                <label>new Password</label>
                <input type="password" name="password" onChange={handleChange} />

                <label>code</label>
                <input type="text" name="code" onChange={handleChange} />

                <button type="submit">Reset</button>
            </form>
        </div>
  )
}
