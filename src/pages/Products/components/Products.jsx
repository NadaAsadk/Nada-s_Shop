import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar';
import axios from 'axios';
import './Products.css'
import Loader from '../../../components/Loader/Loader';
import { NavLink } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';

export default function Products() {
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(true);
    const URL = new URLSearchParams(window.location.search);
    const id = URL.get('category_id');
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get(`/products/category/${id}`);
            const data = response.data;
            setProducts(data.products);
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
        
            <div className="allProducts">
                
            
        {
            (products.length > 0)?products.map(product =>
                <div className='product' >
                <NavLink to={`/productsdetails?product_id=${product._id}`} key={product._id} style={{textDecoration: 'none'}}>
                    <img src={product.mainImage.secure_url} />
                    <h2>{product.name}</h2>
                </NavLink>
                <button onClick={() => addToCart(product._id)}><span>Add to cart</span><FaCartPlus color='white' /></button>
                </div>

            ): <div className='empty'>
                <h2>There Are No Products To Display Yet..</h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
            </div>
            
        }
            
        </div>
        </>

    )
}
