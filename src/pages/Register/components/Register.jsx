import axios from 'axios';
import React, { useState } from 'react'
import { object, string } from 'yup';
import './Register.css'
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  });

  const handleChange = (e) => {
    if (e.target.name == 'image') {
      const { name, files } = e.target;

      setUser({
        ...user,
        [name]: files[0]
      });
    }
    else {
      const { name, value } = e.target;
      setUser({
        ...user,
        [name]: value,
      });
    }

  };

  const validateData = async (e) => {
    const userSchema = object({
      userName: string().min(5).max(25).required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required()
    });
    try {
      await userSchema.validate(user, { abortEarly: false });
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
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('image', user.image);

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signup`, formData);
        setUser({
          userName: '',
          email: '',
          password: '',
          image: '',
        });
        console.log(data);
        setErrors([]);
        if (data.message == 'success') {
          toast.success('your  account has been created successfully', {
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
          navigate('/');
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 409) {
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
        }
      } finally {
        setLoader(false);
      }

    }

  };

  return (
    <div className="main">
      <h1 className='firstLabel'>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>userName</label>
        <input type="text" value={user.userName} name="userName" onChange={handleChange} />
        <label>email</label>
        <input type="email" value={user.email} name="email" onChange={handleChange} />
        <label>password</label>
        <input type="text" value={user.password} name="password" onChange={handleChange} />
        <label>Image</label>
        <input className="inputImage" type="file" name="image" onChange={handleChange} />
        <button type="submit" disabled={loader ? 'disabled' : null}>{!loader ? 'Submit' : 'Wait..'}</button>
      </form>

      <div className='errors'>
        {errors.length > 0 ? errors.map(error =>
          <p key={error} className='error'>    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
            {error}</p>
        ) : <div className='hidden'></div>}
      </div>



    </div>
  )
}
