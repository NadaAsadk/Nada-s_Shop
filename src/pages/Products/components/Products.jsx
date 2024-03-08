import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar';
import axios from 'axios';
import './Products.css'
import Loader from '../../../components/Loader/Loader';
import { NavLink } from 'react-router-dom';

export default function Products() {
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(true);
    const URL = new URLSearchParams(window.location.search);
    const id = URL.get('category_id');
    const [products, setProducts] = useState([]);


    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
            const data = response.data;
            setProducts(data.products);
            console.log(products);
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
        <div className='catproduct'>
            <div className="products">
                
            
        {
            (products.length > 0)?products.map(product =>
                <NavLink to={`/productsdetails?product_id=${product._id}`} className='product' key={product._id} style={{textDecoration: 'none'}}>
                    <img src={product.mainImage.secure_url} />
                    <h2>{product.name}</h2>
                </NavLink>

            ): <h2>There Are No Products To Display Yet..</h2>
            
        }
            
        </div>
        </div>
        </>

    )
}
