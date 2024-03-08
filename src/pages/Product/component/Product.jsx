import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Product.css'
import Loader from '../../../components/Loader/Loader';
import { NavLink } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

export default function Product() {
    const [error, setError] = useState('');
    const [Images, setImages] = useState([]);
    const [loader, setLoader] = useState(true);

    const URL = new URLSearchParams(window.location.search);
    const id = URL.get('product_id');
    console.log(id);
    const [product, setProduct] = useState([]);


    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/products/${id}`);
            const data = response.data;
            setProduct(data.product);
            setImages(data.product.subImages);
            console.log(data);
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

    return (
        <>
            <div className='all'>
                <div className='oneproduct'>
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
                </div>
            </div>


        </>
    )
}
