import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Categories.css';
import { NavLink } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader';


export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/categories/active?page=1&limit=10`);
      setCategories(data.categories);
      setError('');
    } catch (error) {
      setError('error to load error');
    } finally {
      setLoader(false);
    }


  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loader) {
    return <Loader />
  }


  return (
     <div className="categories">
          {
            categories.map(category =>
              <NavLink to={`/products/category?category_id=${category._id}`} className="category" key={category._id} style={{textDecoration: 'none'}}> 
                  <img src={category.image.secure_url} />
                  <p>{category.name}</p>
               </NavLink>
            )
          }
     </div>
  );
}
