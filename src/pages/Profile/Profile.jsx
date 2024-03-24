import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Profile.css'
import cover from './cover.png'
import Loader from '../../components/Loader/Loader';
export default function Profile() {
    const [userProfile, setUserProfile] = useState({});
    const [loader, setLoader] = useState(true);
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('userToken');

    const getUserProfile = async () => {
        const profile = await axios.get(`/user/profile`, {
            headers: {
                Authorization: `Tariq__${token}`
            }
        });
        setUserProfile(profile.data.user);
        setLoader(false);
        console.log(userProfile);
    }
    
    useEffect(() => {
        getUserProfile();
    }, {});
    const getOrders = async () => {
        const gorders = await axios.get(`/order`, {
            headers: {
                Authorization: `Tariq__${token}`
            }
        });
        setOrders(gorders.data.orders);
        console.log(gorders);
    }
    useEffect(() => {
        getOrders();
    }, {});

    if (loader) {
        return <Loader />
    }

    return (
        <div className='allprofile'>
        {(userProfile) ? <div className='mainprofile'>
            <div className='Profile'>
                <div className='left'>
                    <h2>User Name: {userProfile.userName}</h2>
                    <p>email: {userProfile.email}</p>
                </div>
                <div className='right'>
                    <img src={userProfile.image.secure_url} />
                </div>
                </div>
                <div className='Orders'>
                    <h2>Your last Orders</h2>
                    {(orders.length>0)?<></>:<p>No orders yet</p>}
                </div>
            </div>
                : <></>
            }
            
        </div>
        
    )
}
