import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Cart.css'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';
import { MdRemoveShoppingCart } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { BsCartCheckFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

export default function Cart() {
  const [loader, setLoader] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
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
      toast.error(error, {
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
    } finally {
      setLoader(false);
    }
  }
  const finalPrice = () =>{
    let sum=0;
    for(let i = 0;i<cartProducts.length;i++){
      sum+=(cartProducts[i].details.finalPrice * cartProducts[i].quantity);
    }
    return sum;
  }

  useEffect(() => {
    getCart();
  }, []);
  

  const incraseQuantity = async (productId) => {
    const add = await axios.patch(`/cart/incraseQuantity`, {
      productId
    }
      , {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
    getCart();
  }

  const decraseQuantity = async (productId) => {

    const dec = await axios.patch(`/cart/decraseQuantity`, {
      productId
    }
      , {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });

    getCart();
  }
  const deleteProduct = async (productId) => {
    const deleteItem = await axios.patch(`/cart/removeItem`, {
      productId
    }
      , {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
    getCart();
    toast.success('deleted successfully', {
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
  const cant = () => {
    toast.error("Can't decrase Quantity", {
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
  const clearCart = async () => {
    if (cartProducts.length > 0) {
      const data = await axios.patch(`/cart/clear`, {
        cartProducts
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      console.log(data);
      getCart();
      toast.success('cleared cart successfully', {
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
    } else {
      toast.error("can't clear nothing", {
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
  if (loader) {
    return <Loader />
  }

  return (
    <div className='all'>
      <div className='header'>
        <div className='info'>
        <h2>Cart <IoCart /></h2>
          <p>Total price: {finalPrice()} $</p>
        </div>
        <div className='row'>
        <button onClick={() => clearCart()}>clear Cart <MdRemoveShoppingCart /></button>
       <NavLink to='/order'>Check Out <BsCartCheckFill /></NavLink>
        </div>
        
      </div>
      <div className="cart">
        {(cartProducts.length > 0) ? cartProducts.map(product =>
          <div className='oneproduct' key={product.details._id}>
            <h2>{product.details.name}</h2>
            <img src={product.details.mainImage.secure_url} />
            <span>price: {product.details.price} $</span>
            <span>total: {product.details.price * product.quantity} $</span>
            <div className='qnty'>
              <button onClick={() => incraseQuantity(product.details.id)}><FaPlus color='palevioletred' /></button>
              <span>{product.quantity}</span>
              {(product.quantity < 1) ? <button onClick={() => cant()}> </button>
                : <button onClick={(product.quantity < 0) ? () => deleteProduct(product.details.id) : () => decraseQuantity(product.details.id)}><FaMinus color='palevioletred' /></button>}
            </div>
            <button onClick={() => deleteProduct(product.details.id)}><FaTrashAlt color='palevioletred' /></button>

          </div>

        ) :
          <>
            <h2>No Products in Your Cart</h2>
          </>}

      </div>
    </div>

  )
}
