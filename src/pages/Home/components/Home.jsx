import React from 'react'
import image from './image.png'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <img src={image}className={styles.images}/>
    </div>
  )
}
