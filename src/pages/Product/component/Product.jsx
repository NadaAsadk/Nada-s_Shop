import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Product.css'
import Loader from '../../../components/Loader/Loader';
import { FaCartPlus } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Product() {
    const [Images, setImages] = useState([]);
    const [loader, setLoader] = useState(true);
    const URL = new URLSearchParams(window.location.search);
    const id = URL.get('product_id');
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();


    const getProducts = async () => {
        try {
            const response = await axios.get(`/products/${id}`);
            const data = response.data;
            setProduct(data.product);
            setImages(data.product.subImages);
        } catch (error) {
            console.log(error);
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
            <div className='all'>
                <div className='oneproduct' >
                    <h2>{product.name}</h2>
                    <div className='spans'>
                        <span className='price'>price : ${product.price}</span>
                        <span>stock : {product.stock}</span>
                    </div>
                    <div className='imagess'>
                        <img src={product.mainImage.secure_url} />
                        <div className='subImages'>

                            {
                                Images.map(Images =>
                                    <img src={Images.secure_url} />
                                )
                            }

                        </div>
                    </div>
                    <div className='details'>
                        <p>{product.description}</p>
                    </div>
                    <button className="add" onClick={() => addToCart(product._id)}><span>Add to cart</span><FaCartPlus color='white' /></button>
                </div>
            </div>


        </>
    )
}
