import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState({
        email: '',
    });
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.patch(`/auth/sendcode`,{
            email:email
        });
        navigate('/resetPassword');


    };
    return (
        <div className="main">
            <h1 className='firstLabel'>Forgot Password?</h1>
            <form onSubmit={handleSubmit}>
                <label>email</label>
                <input type="email" name="email" onChange={handleChange} />

                <button type="submit">sendCode</button>
            </form>
        </div>
    )
}
