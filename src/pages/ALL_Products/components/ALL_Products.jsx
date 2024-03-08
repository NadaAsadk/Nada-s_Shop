import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ALL_Products.css'
import Loader from '../../../components/Loader/Loader';
import { NavLink } from 'react-router-dom';

export default function ALL_Products() {
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(true);
    const [allproducts, setAllProducts] = useState([]);


    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/products?page=1&limit=10`);
            const data = response.data;
            setAllProducts(data.products);
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
            <div className='allProducts'>
                {
                    allproducts.map(product =>
                        <NavLink to={`/productsdetails?product_id=${product._id}`} className='product' key={product._id} style={{textDecoration: 'none'}}>
                            <img src={product.mainImage.secure_url} />
                            <h2>{product.name}</h2>
                        </NavLink>

                    )
                }

            </div>
        </>
    )
}