import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Product.css'
import Loader from '../../../components/Loader/Loader';
import { FaCartPlus } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

export default function Product() {
    const [product, setProduct] = useState([]);
    const [Images, setImages] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loader, setLoader] = useState(true);
    const [yourreview, setReview] = useState({
        comment: '',
        rating: '',
    });
    const URL = new URLSearchParams(window.location.search);
    const id = URL.get('product_id');

    const navigate = useNavigate();


    const getProducts = async () => {
        try {
            const response = await axios.get(`/products/${id}`);
            const data = response.data;
            setProduct(data.product);
            setImages(data.product.subImages);
            setReviews(data.product.reviews);

        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }


    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({
            ...yourreview,
            [name]: value,
        });
    };


    const addreview = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                console.log(id);
                const addyourreview = await axios.post(`/products/${id}/review`,yourreview , {
                    headers: {
                        authorization: `Tariq__${token}`
                    }
                });
                getProducts();
            } catch (error) {
                console.log(error);
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

        }
        else {
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
    useEffect(() => {
        getProducts();
    }, []);


    if (loader) {
        return <Loader />
    }

    const addToCart = async (productId) => {
        const token = localStorage.getItem('userToken');
        if (token) {
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
        } else {
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
                <div className='oneproduct' key={product._id}>
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
                                    <img src={Images.secure_url} key={Images.public_id} />
                                )
                            }

                        </div>
                    </div>
                    <div className='details'>
                        <p>{product.description}</p>
                    </div>

                    <div className='reviews'>
                        <h4><FaStar /> Reviews</h4>
                        {(reviews.length > 0) ? reviews.map(review =>
                            <div className='review' key={review._id}>
                                <img src={review.createdBy.image.secure_url} />
                                <p>{review.createdBy.userName}: </p>
                                <p>{review.comment}</p>
                                <div className='rating'>
                                    {(review.rating == 1) ? <><FaStar /></>
                                        : (review.rating == 2) ? <><FaStar /><FaStar /></>
                                            : (review.rating == 3) ? <><FaStar /><FaStar /><FaStar /></>
                                                : (review.rating == 4) ? <><FaStar /><FaStar /><FaStar /><FaStar /></>
                                                    : <><><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></>
                                                    </>}
                                </div>

                            </div>
                        ) : <></>}

                    </div>
                    <button className="add" onClick={() => addToCart(product._id)}><span>Add to cart</span><FaCartPlus color='white' /></button>
                    <form onSubmit={addreview} className='addreview'>
                        <div className='addinreview'>
                            <label>comment</label>
                            <input type="text" value={yourreview.comment} name="comment" onChange={handleChange} />
                        </div>
                        <div className='addinreview'>
                            <label>rating</label>
                            <input type="text" value={yourreview.rating} name="rating" onChange={handleChange} />
                        </div>

                        <button type="submit">add your review</button>
                    </form>

                </div>
            </div>


        </>
    )
}
