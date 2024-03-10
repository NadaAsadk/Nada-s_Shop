import React from 'react'
import image from './image.jpg'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home_right}>
      </div>
      <div className={styles.home_left}>
        <img src={image} className={styles.images} />

      </div>
    </div>
  )
}
