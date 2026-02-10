"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import CurrencyToggle from "../components/CurrencyToggle"
import { useCurrency } from "../context/CurrencyProvider"
import styles from './page.module.css'
import apiEndPoint from "../config/apiEndPoint.json"

export default function Home() {
  const { formatPrice } = useCurrency()
  const [newProducts, setNewProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      // Cargar productos nuevos y destacados en paralelo
      const [newResponse, featuredResponse] = await Promise.all([
        fetch(apiEndPoint.products.new),
        fetch(apiEndPoint.products.featured)
      ])

      const newData = await newResponse.json()
      const featuredData = await featuredResponse.json()

      setNewProducts(Array.isArray(newData) ? newData.slice(0, 4) : [])
      setFeaturedProducts(Array.isArray(featuredData) ? featuredData.slice(0, 4) : [])
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
        <Header />

        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Bienvenido a Gorazer</h1>
                <p className={styles.heroSubtitle}>
                    Descubre productos de calidad al mejor precio. Tu tienda de confianza online.
                </p>
                <div className={styles.heroActions}>
                  <Link href="/products" className={styles.heroButton}>
                      Ver Productos
                  </Link>
                  <CurrencyToggle />
                </div>
            </section>

            {/* Productos Nuevos */}
            {newProducts.length > 0 && (
              <section className={styles.newProductsSection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.newBadge}>🆕</span> Productos Nuevos
                </h2>
                <div className={styles.productsGrid}>
                  {newProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.id}`} 
                      className={styles.productCard}
                    >
                      <div className={styles.productImageContainer}>
                        <img 
                          src={product.images?.[0]?.dataUrl || 'https://via.placeholder.com/300x300/f5f5f5/000000?text=Producto'} 
                          alt={product.name} 
                          className={styles.productImage}
                        />
                        <span className={styles.newProductBadge}>NUEVO</span>
                      </div>
                      <div className={styles.productInfo}>
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.productDescription}>
                          {product.description?.substring(0, 60)}...
                        </p>
                        <p className={styles.productPrice}>
                          {formatPrice(product.salePrice || product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Productos Destacados */}
            {featuredProducts.length > 0 && (
              <section className={styles.featuredSection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.featuredBadge}>⭐</span> Productos Destacados
                </h2>
                <div className={styles.productsGrid}>
                  {featuredProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.id}`} 
                      className={styles.productCard}
                    >
                      <div className={styles.productImageContainer}>
                        <img 
                          src={product.images?.[0]?.dataUrl || 'https://via.placeholder.com/300x300/f5f5f5/000000?text=Producto'} 
                          alt={product.name} 
                          className={styles.productImage}
                        />
                        <span className={styles.featuredProductBadge}>⭐ DESTACADO</span>
                      </div>
                      <div className={styles.productInfo}>
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.productDescription}>
                          {product.description?.substring(0, 60)}...
                        </p>
                        <p className={styles.productPrice}>
                          {formatPrice(product.salePrice || product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {loading && (
              <div className={styles.loadingContainer}>
                <p>Cargando productos...</p>
              </div>
            )}

            {/* Ofertas Especiales */}
            <h2 className={styles.sectionTitle}>Ofertas Especiales</h2>
            <section className={styles.sliderContainer}>
                <div className={styles.slider}>
                    <div className={styles.sliderItem}>
                        <img 
                            src="https://via.placeholder.com/800x400/667eea/FFFFFF?text=Ofertas+Exclusivas" 
                            alt="Oferta 1" 
                            className={styles.sliderImage}
                        />
                        <div className={styles.sliderContent}>
                            <h3 className={styles.sliderTitle}>Descuento de Temporada</h3>
                            <p className={styles.sliderText}>
                                Hasta 50% de descuento en productos seleccionados. ¡No te lo pierdas!
                            </p>
                            <Link href="/ofertas" className={styles.sliderButton}>Ver Ofertas</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categorías */}
            <section className={styles.categoriesSection}>
                <h2 className={styles.sectionTitle}>Categorías</h2>
                <div className={styles.categoriesGrid}>
                    <Link href="/products?category=electronics" className={styles.categoryCard}>
                        <div className={styles.categoryIcon}>📱</div>
                        <h3 className={styles.categoryName}>Electrónica</h3>
                    </Link>
                    <Link href="/products?category=fashion" className={styles.categoryCard}>
                        <div className={styles.categoryIcon}>👔</div>
                        <h3 className={styles.categoryName}>Moda</h3>
                    </Link>
                    <Link href="/products?category=home" className={styles.categoryCard}>
                        <div className={styles.categoryIcon}>🏠</div>
                        <h3 className={styles.categoryName}>Hogar</h3>
                    </Link>
                    <Link href="/products?category=sports" className={styles.categoryCard}>
                        <div className={styles.categoryIcon}>⚽</div>
                        <h3 className={styles.categoryName}>Deportes</h3>
                    </Link>
                    <Link href="/products?category=books" className={styles.categoryCard}>
                        <div className={styles.categoryIcon}>📚</div>
                        <h3 className={styles.categoryName}>Libros</h3>
                    </Link>
                    <Link href="/products?category=toys" className={styles.categoryCard}>
                        <div className={styles.categoryIcon}>🎮</div>
                        <h3 className={styles.categoryName}>Juguetes</h3>
                    </Link>
                </div>
            </section>
        </main>

        <Footer />
    </div>
  )
}
