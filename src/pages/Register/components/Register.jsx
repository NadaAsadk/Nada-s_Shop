import axios from 'axios';
import React, { useState } from 'react'
import { object, string, number, date } from 'yup';

export default function Register() {
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
  const handleImage = (e) =>{
    const{name,files} = e.target;
    setUser({
      ...user,
      [name]:files[0]
    });
  };
  const validateData = async()=>{
    const RegisterSchema = object({
      userName:string().min(5).max(20).required(),
      email:string().email("plz enter valid email"),
      password:string().min(8).max(20).required(),
      image:string().required(),
    });
    try {
      await RegisterSchema.validate(user,{abortEarly:false});
      return true;
    } catch (error) {
      console.log("validation error",error.errors);
      setErrors(error.errors);
      return false;
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const validate = await validateData();
    
    const formData = new FormData();
    formData.append('userName',user.userName);
    formData.append('email',user.email);
    formData.append('password',user.password);
    formData.append('image',user.image);

    const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signup`,formData);
    console.log(user);
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      <label>user Name</label>
        <input type="text" value={user.userName} name="userName" onChange={handleChange}/>
        <label>email</label>
        <input type="email" value={user.email} name="email" onChange={handleChange}/>
        <label>password</label>
        <input type="text" value={user.password} name="password" onChange={handleChange}/>
        <label>Image</label>
        <input type="file" name="image" onChange={handleImage}/>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
