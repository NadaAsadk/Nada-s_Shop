import React from 'react'
import image from './1.png'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home_right}>
        <h1 className={styles.title}>Welcome to your favorite online shopping site</h1>
      </div>
      <div className={styles.home_left}>
        <img src={image} className={styles.images} />

      </div>
    </div>
  )
}
