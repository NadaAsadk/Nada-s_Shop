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

            ): <div className='empty'>
                <h2>There Are No Products To Display Yet..</h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                </div>
            
        }
            
        </div>
        </div>
        </>

    )
}
