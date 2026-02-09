"use client"

import React, { useEffect, useMemo, useState } from 'react'
import Header from "../../components/header/page"
import Footer from "../../components/footer/page"
import styles from './page.module.css'
import apiEndPoint from "../../config/apiEndPoint.json"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const fallbackProducts = [
    { id: 1, name: "Laptop Premium", price: 999.99, category: "Electrónica", images: [{ dataUrl: "https://via.placeholder.com/300x300/f5f5f5/000000?text=Laptop" }] },
    { id: 2, name: "Smartphone Pro", price: 699.99, category: "Electrónica", images: [{ dataUrl: "https://via.placeholder.com/300x300/f5f5f5/000000?text=Smartphone" }] },
    { id: 3, name: "Auriculares Wireless", price: 149.99, category: "Electrónica", images: [{ dataUrl: "https://via.placeholder.com/300x300/f5f5f5/000000?text=Auriculares" }] },
    { id: 4, name: "Camiseta Designer", price: 49.99, category: "Moda", images: [{ dataUrl: "https://via.placeholder.com/300x300/f5f5f5/000000?text=Camiseta" }] },
    { id: 5, name: "Zapatillas Running", price: 129.99, category: "Deportes", images: [{ dataUrl: "https://via.placeholder.com/300x300/f5f5f5/000000?text=Zapatillas" }] },
    { id: 6, name: "Silla Ergonómica", price: 299.99, category: "Hogar", images: [{ dataUrl: "https://via.placeholder.com/300x300/f5f5f5/000000?text=Silla" }] },
    { id: 7, name: "Cafetera Automática", price: 199.99, category: "Hogar", images: [{ dataUrl: "https://via.placeholder.com/300x300/f5f5f5/000000?text=Cafetera" }] },
    { id: 8, name: "Reloj Inteligente", price: 249.99, category: "Electrónica", images: [{ dataUrl: "https://via.placeholder.com/300x300/f5f5f5/000000?text=Reloj" }] },
  ]

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
        setProducts(fallbackProducts)
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

  const formatPrice = (value) => {
    const amount = Number(value)
    if (Number.isNaN(amount)) {
      return '$0.00'
    }
    return amount.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingIndex = cart.findIndex((item) => item.id === product.id)

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        quantity: 1,
        image: product.imageUrls?.[0] || product.image || ''
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Nuestros Productos</h1>
          <p className={styles.heroSubtitle}>
            Explora nuestra amplia selección de productos de calidad
          </p>
        </section>

        <section className={styles.filtersSection}>
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                key={category}
                className={styles.filterButton}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.productsSection}>
          {loading && <p>Cargando productos...</p>}
          {error && <p>Mostrando productos de ejemplo.</p>}
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img 
                  src={product.images?.[0]?.dataUrl || product.image || 'https://via.placeholder.com/300x300/f5f5f5/000000?text=Producto'} 
                  alt={product.name} 
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>{formatPrice(product.price)}</p>
                  <button className={styles.productButton} onClick={() => addToCart(product)}>
                    Agregar al Carrito
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
