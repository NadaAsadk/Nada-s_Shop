import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ALL_Products.css'
import Loader from '../../../components/Loader/Loader';
import { NavLink } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';

export default function ALL_Products({userName}) {
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(true);
    const [allproducts, setAllProducts] = useState([]);


    const getProducts = async () => {
        try {
            const response = await axios.get(`/products?page=1&limit=10`);
            const data = response.data;
            setAllProducts(data.products);
        } catch (error) {
            setError('error to load error');
        } finally {
            setLoader(false);
        }

    }

    useEffect(() => {
        getProducts();
    }, []);

    if (loader) {
        return <Loader />
    }
    const addToCart = async (productId) => {
        const token = localStorage.getItem('userToken');
        if(token){
            try {
                const { data } = await axios.post(`/cart`, {
                    productId
                }, {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                });
                console.log(data);
                toast.success('added one item to the cart', {
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
        }else{
            toast.error('please sign In ', {
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
        }
        


    };


    return (
        <>
            <div className='allProducts'>
                {
                    allproducts.map(product =>
                        <div className='product' key={product._id}>
                        <NavLink to={`/productsdetails?product_id=${product._id}`} key={product._id} style={{textDecoration: 'none'}}>
                            <img src={product.mainImage.secure_url} />
                            <h2>{product.name}</h2>
                        </NavLink>
                        <button onClick={() => addToCart(product._id)}><span>Add to cart</span><FaCartPlus color='white' /></button>
                        </div>
                        
                    )
                }

            </div>
        </>
    )
}
