import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Categories.css';
import Loader from '../../../components/Loader/Loader';




export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10`);
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
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });
  return (
    <div className="swiper-container mySwiper">
      <div className="swiper-wrapper">
        {categories.map(category =>
          <div className="swiper-slide">
            <img src={category.image.secure_url} className="card-img-top" alt={category.name} />
            <p className="card-text">{category.name}</p>
          </div>

        )}
      </div>

      <div className="swiper-pagination" /></div>


  );
}
