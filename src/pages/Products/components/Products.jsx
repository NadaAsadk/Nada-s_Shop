import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar';
import axios from 'axios';
import './Products.css'
import Loader from '../../../components/Loader/Loader';

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
            <Navbar />
            <div className="products">
                {products.map(product =>
                    <div className='product' key={product._id}>
                        <img src={product.mainImage.secure_url} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <span>price: {product.price} $</span>

                    </div>

                )
                }
            </div>
        </>

    )
}
