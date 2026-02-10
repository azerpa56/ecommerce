"use client"

import React, { useEffect, useMemo, useState } from 'react'
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import CurrencyToggle from "../components/CurrencyToggle"
import { useCurrency } from "../context/CurrencyProvider"
import styles from './page.module.css'
import apiEndPoint from "../config/apiEndPoint.json"

export default function Products() {
  const { formatPrice } = useCurrency()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(apiEndPoint.products.list)

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`)
        }

        const data = await response.json()
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No hay productos disponibles')
        }

        setProducts(data)
      } catch (err) {
        setError(err.message)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(['Todos'])
    products.forEach((product) => {
      if (product.category) {
        unique.add(product.category)
      }
    })
    return Array.from(unique)
  }, [products])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return products
    }
    return products.filter((product) => product.category === selectedCategory)
  }, [products, selectedCategory])

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingIndex = cart.findIndex((item) => item.id === product.id)

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.salePrice || product.price) || 0,
        quantity: 1,
        image: product.images?.[0]?.dataUrl || product.image || ''
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`${product.name} agregado al carrito`)
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div>
              <h1 className={styles.heroTitle}>Nuestros Productos</h1>
              <p className={styles.heroSubtitle}>
                Explora nuestra amplia selección de productos de calidad
              </p>
            </div>
            <CurrencyToggle />
          </div>
        </section>

        <section className={styles.filtersSection}>
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.productsSection}>
          {loading && <p className={styles.message}>Cargando productos...</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <img 
                    src={product.images?.[0]?.dataUrl || product.image || 'https://via.placeholder.com/300x300/f5f5f5/000000?text=Producto'} 
                    alt={product.name} 
                    className={styles.productImage}
                  />
                  {product.isFeatured && (
                    <span className={styles.featuredBadge}>⭐ DESTACADO</span>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>
                    {formatPrice(product.salePrice || product.price)}
                  </p>
                  {product.stock <= (product.alertStock || 5) && product.stock > 0 && (
                    <span className={styles.lowStockBadge}>⚠️ Últimas unidades</span>
                  )}
                  {product.stock === 0 && (
                    <span className={styles.outOfStockBadge}>Sin stock</span>
                  )}
                  <button 
                    className={styles.productButton} 
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Sin stock' : 'Agregar al Carrito'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
