import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Categories.css';
import Loader from '../../../components/Loader/Loader';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


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
 
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 5,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    },

    scrollbar: {
      el: '.swiper-scrollbar',
    },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 50
      }
    }
  });


  return (
    <>
    
      <swiper 
      direction= {'horizontal'}
      loop= {false}
  
      pagination= {{
        type: 'progressbar',
        clickable: true,
      }}
  
      navigation= {{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true,
      }}
  
      slidesPerView= {4}
      spaceBetween= {40}
      breakpoints= {{
        320: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 50
        }
      }}
      className={'swiper'}>
        <div className="swiper-wrapper">
          {categories.map(category =>
            <div className="swiper-slide">
              <img src={category.image.secure_url} alt={category.name} />
              <p>{category.name}</p>
            </div>

          )}

        </div>
        <div className="swiper-pagination" />
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </swiper>

    </>

  );
}
