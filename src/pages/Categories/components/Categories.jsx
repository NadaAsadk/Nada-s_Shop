import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './Categories.module.css';
import 'swiper/css';



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
    }


  };

  useEffect(() => {
    getCategories();
  }, []);


  return (
    
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >

        {categories.map(category =>
                  <SwiperSlide>

          <div className="card" style={{ width: '18rem' }}>
            <img src={category.image.secure_url} className="card-img-top" alt={category.name} />
            <div className="card-body">
              <p className="card-text">{category.name}</p>
            </div>
          </div>
          </SwiperSlide>

        )}
      </Swiper>

    
  )
}
