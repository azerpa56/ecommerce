import React from 'react'
import Link from 'next/link'
import Header from "../../components/header/page"
import Footer from "../../components/footer/page"
import styles from './page.module.css'

export default function Home() {
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
                <Link href="/products" className={styles.heroButton}>
                    Ver Productos
                </Link>
            </section>

            {/* Ofertas Especiales */}
            <h2 className={styles.sectionTitle}>Ofertas Especiales</h2>
            <section className={styles.sliderContainer}>
                <div className={styles.slider}>
                    <div className={styles.sliderItem}>
                        <img 
                            src="https://via.placeholder.com/800x400/000000/FFFFFF?text=Oferta+1" 
                            alt="Oferta 1" 
                            className={styles.sliderImage}
                        />
                        <div className={styles.sliderContent}>
                            <h3 className={styles.sliderTitle}>Descuento de Temporada</h3>
                            <p className={styles.sliderText}>
                                Hasta 50% de descuento en productos seleccionados. ¡No te lo pierdas!
                            </p>
                            <button className={styles.sliderButton}>Ver Más</button>
                        </div>
                    </div>
                    <div className={styles.sliderItem}>
                        <img 
                            src="https://via.placeholder.com/800x400/000000/FFFFFF?text=Oferta+2" 
                            alt="Oferta 2" 
                            className={styles.sliderImage}
                        />
                        <div className={styles.sliderContent}>
                            <h3 className={styles.sliderTitle}>Envío Gratis</h3>
                            <p className={styles.sliderText}>
                                En compras mayores a $50. Disfruta de entregas rápidas y seguras.
                            </p>
                            <button className={styles.sliderButton}>Comprar Ahora</button>
                        </div>
                    </div>
                    <div className={styles.sliderItem}>
                        <img 
                            src="https://via.placeholder.com/800x400/000000/FFFFFF?text=Oferta+3" 
                            alt="Oferta 3" 
                            className={styles.sliderImage}
                        />
                        <div className={styles.sliderContent}>
                            <h3 className={styles.sliderTitle}>Nuevos Productos</h3>
                            <p className={styles.sliderText}>
                                Descubre lo último en nuestra colección. Innovación y calidad.
                            </p>
                            <button className={styles.sliderButton}>Explorar</button>
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

            {/* Productos Destacados */}
            <section className={styles.featuredSection}>
                <h2 className={styles.sectionTitle}>Productos Destacados</h2>
                <div className={styles.productsGrid}>
                    <div className={styles.productCard}>
                        <img 
                            src="https://via.placeholder.com/300x300/f5f5f5/000000?text=Producto+1" 
                            alt="Producto 1" 
                            className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>Producto Premium 1</h3>
                            <p className={styles.productPrice}>$99.99</p>
                            <button className={styles.productButton}>Agregar al Carrito</button>
                        </div>
                    </div>
                    <div className={styles.productCard}>
                        <img 
                            src="https://via.placeholder.com/300x300/f5f5f5/000000?text=Producto+2" 
                            alt="Producto 2" 
                            className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>Producto Premium 2</h3>
                            <p className={styles.productPrice}>$149.99</p>
                            <button className={styles.productButton}>Agregar al Carrito</button>
                        </div>
                    </div>
                    <div className={styles.productCard}>
                        <img 
                            src="https://via.placeholder.com/300x300/f5f5f5/000000?text=Producto+3" 
                            alt="Producto 3" 
                            className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>Producto Premium 3</h3>
                            <p className={styles.productPrice}>$79.99</p>
                            <button className={styles.productButton}>Agregar al Carrito</button>
                        </div>
                    </div>
                    <div className={styles.productCard}>
                        <img 
                            src="https://via.placeholder.com/300x300/f5f5f5/000000?text=Producto+4" 
                            alt="Producto 4" 
                            className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>Producto Premium 4</h3>
                            <p className={styles.productPrice}>$199.99</p>
                            <button className={styles.productButton}>Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
  )
}
