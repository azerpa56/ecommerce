"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'
import styles from './page.module.css'

export default function Nav() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const roles = user.roles || []
    
    setIsLoggedIn(!!token)
    setIsAdmin(roles.includes('ROLE_ADMIN'))
  }

  useEffect(() => {
    checkAuthStatus()
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    setIsLoggedIn(false)
    setIsAdmin(false)
    router.push('/')
  }

  return (
    <nav className={styles.nav}>
        <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Inicio</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/products" className={styles.navLink}>Productos</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/servicio" className={styles.navLink}>Servicios</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/ofertas" className={styles.navLink}>Ofertas</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/noticias" className={styles.navLink}>Noticias</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contacto</Link>
            </li>
            {isLoggedIn && !isAdmin && (
              <>
                <li className={styles.navItem}>
                  <Link href="/cart" className={styles.navLink}>Carrito</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/orders" className={styles.navLink}>Mis Pedidos</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li className={styles.navItem}>
                <Link href="/admin" className={styles.navLink}>Admin</Link>
              </li>
            )}
            {!isLoggedIn ? (
              <li className={styles.navItem}>
                <Link href="/login" className={styles.navLinkLogin}>Iniciar Sesión</Link>
              </li>
            ) : (
              <li className={styles.navItem}>
                <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
              </li>
            )}
        </ul>
    </nav>
  );
}
