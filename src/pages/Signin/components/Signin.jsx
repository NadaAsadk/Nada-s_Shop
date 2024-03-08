import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { object, string, number, date } from 'yup';

export default function Signin() {
  const [errors,setErrors]=useState([]);
  const [user,setUser]=useState({
    userName:'',
  email: '',
  password: '',
  image: '',
});

const handleChange = (e) =>{
  const{name,value} = e.target;
  setUser({
    ...user,
    [name]:value
  });
};

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signin`, {user});
    console.log(user);
  };
  return (
    <div className='main'>
      <h1 className='firstLabel'>Sign In</h1>
      <form onSubmit={handleSubmit}>
      <label>user Name</label>
        <input type="text" value={user.userName} name="userName" onChange={handleChange}/>
        <label>password</label>
        <input type="text" value={user.password} name="password" onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
