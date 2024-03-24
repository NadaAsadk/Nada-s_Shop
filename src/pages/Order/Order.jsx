import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import './Order.css'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Order() {
    const [cart, setCartProducts] = useState([]);
    const [loader, setLoader] = useState(true);
    const token = localStorage.getItem('userToken');

    const getCart = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`/cart`, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });

            setCartProducts(data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        getCart();
    }, []);
    const [coupon, setcoupon] = useState([]);

    const getCoupons = async () => {
        const all = await axios.get(`/coupon`, { headers: { Authorization: `Tariq__${token}` } });
        setcoupon(all.coupons);
        console.log(all);
    }
    useEffect(() => {
        getCoupons();
    }, []);
    const [order, setOrder] = useState({
        couponName: '',
        address: '',
        phone: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/order`,
                order, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            setOrder({
                couponName: '',
                address: '',
                phone: '',
            });
            getCart();
            toast.success('order done successfully', {
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
            
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
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

    if (loader) {
        return <Loader />
    }
    return (
        <div className="mainOrder">
            <div className='Ordercart'>
                <h2>Your Cart</h2>
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
                    {(cart.length > 0) ? cart.map(product =>
                        <SwiperSlide>
                            <span>{product.details.name}</span>
                            <img src={product.details.mainImage.secure_url} />
                            <span>quantity: {product.quantity}</span>
                        </SwiperSlide>
                    ) : <p>Nothing in your cart to order</p>}


                </Swiper>

            </div>
            <h1 className='firstLabel'>Order</h1>
            <form onSubmit={handleSubmit}>
                <label>couponName</label>
                <input type="text" value={order.couponName} name="couponName" onChange={handleChange} />
                <label>address</label>
                <input type="text" value={order.address} name="address" onChange={handleChange} />
                <label>phone</label>
                <input type="text" value={order.phone} name="phone" onChange={handleChange} />
                <button type="submit">Order Now</button>
            </form>
        </div>
    )
}
