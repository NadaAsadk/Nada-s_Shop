import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Profile.css'
import cover from './cover.png'
import Loader from '../../components/Loader/Loader';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { MdCancel } from "react-icons/md";

import { EffectCoverflow, Manipulation, Pagination } from 'swiper/modules';



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
    }
    const cancelOrder = async (orderId) => {
        console.log(orderId);
        console.log(`/order/cancel/${orderId}`);
        const { data } = await axios.patch(`${import.meta.env.VITE_API}/order/cancel/${orderId}`,{},
            { headers: {
                Authorization:`Tariq__${token}`

            }});
        console.log(data);

        getOrders();
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
                    {(orders.length > 0) ?
                        <div>
                            {orders.map(order =>
                                (order.status != 'cancelled') ?
                                    
                                        <div className='Ordercart order' key={order._id}>
                                            <div className='first'>
                                                <div className='firstinfo'>
                                                    <p>address: {order.address}</p>
                                                    <p>finalPrice: {order.finalPrice} $</p>
                                                    <p>status: {order.status}</p>
                                                </div>
                                                <button onClick={() => cancelOrder(order._id)}><MdCancel fill="white" /></button>

                                            </div>

                                            <h2>Order's Products: </h2>
                                            <Swiper
                                                effect={'coverflow'}
                                                grabCursor={false}
                                                centeredSlides={true}
                                                slidesPerView={'auto'}
                                                coverflowEffect={{
                                                    rotate: 50,
                                                    stretch: 0,
                                                    depth: 100,
                                                    modifier: 1,
                                                    slideShadows: true,
                                                }}
                                                pagination={false}
                                                modules={[EffectCoverflow, Pagination]}
                                                className="mySwiper"
                                            >
                                                {order.products.map(product =>
                                                    <SwiperSlide key={product.id}>
                                                        <p>{product.productId.name}</p>
                                                        <img src={product.productId.mainImage.secure_url} />
                                                        <div className='info'>
                                                            <p>price: {product.finalPrice} $</p>
                                                            <p>quantity: {product.quantity}</p>
                                                            <p>total: {product.finalPrice} $</p>
                                                        </div>

                                                    </SwiperSlide>
                                                )}


                                            </Swiper>

                                        </div>
                                    : <>
                                    </>

                            )}
                        </div> : <p>No orders yet</p>}
                </div>
            </div>
                : <></>
            }

        </div>

    )
}
