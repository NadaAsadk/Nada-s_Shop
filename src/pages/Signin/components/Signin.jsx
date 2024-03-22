import axios from 'axios';
import React, { useState } from 'react'
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../context/User';

export default function Signin() {
  const {setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

  };

  const validateData = async (e) => {
    const LoginuserSchema = object({
      email: string().email().required(),
      password: string().min(8).max(20).required(),
    });
    try {
      await LoginuserSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      setLoader(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await validateData()) {

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signin`, {
          email: user.email,
          password: user.password,
        });
        setUser({
          email: '',
          password: '',
        });

        setErrors([]);
        toast.success('Sign in successfully', {
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
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        navigate('/');

      } catch (error) {
        toast.error(error.response.data.message, {
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
      } finally {
        setLoader(false);
      }

    }

  };

  return (
    <div className="main">
      <h1 className='firstLabel'>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input type="email" value={user.email} name="email" onChange={handleChange} />
        <label>password</label>
        <input type="password" value={user.password} name="password" onChange={handleChange} />
        <button type="submit" disabled={loader ? 'disabled' : null}>{!loader ? 'sign in' : 'Wait..'}</button>
        <NavLink to={'/forgotPassword'}>forgot Password?</NavLink>
      </form>
    </div>
  )
}
