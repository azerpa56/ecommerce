import React from 'react'
import Nav from "../nav/page"
import Image from "next/image"
import styles from './page.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.topBar}>
            <div className={styles.logoContainer}>
                <Image 
                    src="/logo.jpg" 
                    alt="Gorazer Logo" 
                    width={150} 
                    height={50} 
                />
            </div>

            <div className={styles.searchContainer}>
                <input 
                    type="text" 
                    placeholder="Buscar productos..."
                    className={styles.searchInput}
                />
                <button className={styles.searchButton}>Buscar</button>
            </div>
        </div>
        
        <Nav />
    </header>
  )
}
