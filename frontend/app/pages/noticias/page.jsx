'use client'

import React, { useState, useEffect } from 'react'
import Header from "../../components/header/page"
import Footer from "../../components/footer/page"
import styles from './page.module.css'

export default function Noticias() {
  const [news, setNews] = useState([])
  const [featuredNews, setFeaturedNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTechNews()
  }, [])

  const fetchTechNews = async () => {
    try {
      setLoading(true)
      setError(null)

      // Llamada al backend para evitar CORS y proteger la API key
      const response = await fetch('http://localhost:8080/api/news/tech')

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`)
      }

      const data = await response.json()
      
      console.log('Respuesta de NewsAPI:', data) // Debug
      
      // Si la API responde con error o sin artículos
      if (data.status === 'error') {
        throw new Error(data.message || 'Error al obtener noticias')
      }
      
      if (!data.articles || data.articles.length === 0) {
        throw new Error('No hay noticias disponibles en este momento')
      }
      
      const formattedNews = data.articles
        .filter(article => article.title && article.description && article.title !== '[Removed]')
        .map((article, index) => ({
          id: index + 1,
          title: article.title,
          category: article.source.name || 'Tecnología',
          date: new Date(article.publishedAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          excerpt: article.description || 'Sin descripción disponible',
          image: article.urlToImage || 'https://via.placeholder.com/600x400/f5f5f5/000000?text=Noticia',
          url: article.url,
          author: article.author || article.source.name
        }))

      if (formattedNews.length > 0) {
        setFeaturedNews(formattedNews[0])
        setNews(formattedNews.slice(1))
      } else {
        throw new Error('No hay noticias disponibles')
      }
    } catch (err) {
      console.error('Error fetching news:', err)
      setError(err.message)
      // Usar noticias de ejemplo si falla la API
      loadFallbackNews()
    } finally {
      setLoading(false)
    }
  }

  const loadFallbackNews = () => {
    // Noticias de ejemplo si falla la API
    const fallbackNews = [
      {
        id: 1,
        title: "Inteligencia Artificial revoluciona el comercio electrónico",
        category: "Tecnología",
        date: "8 Feb 2026",
        excerpt: "Las últimas innovaciones en IA están transformando la experiencia de compra online con recomendaciones personalizadas y asistentes virtuales.",
        image: "https://via.placeholder.com/600x400/f5f5f5/000000?text=IA",
        url: "#"
      },
      {
        id: 2,
        title: "Cloud Computing alcanza nuevos estándares de seguridad",
        category: "Cloud",
        date: "7 Feb 2026",
        excerpt: "Los proveedores de servicios en la nube implementan protocolos de seguridad avanzados para proteger datos empresariales.",
        image: "https://via.placeholder.com/600x400/f5f5f5/000000?text=Cloud",
        url: "#"
      },
      {
        id: 3,
        title: "5G llega a más ciudades del país",
        category: "Conectividad",
        date: "6 Feb 2026",
        excerpt: "La infraestructura 5G se expande permitiendo velocidades de internet sin precedentes para usuarios móviles.",
        image: "https://via.placeholder.com/600x400/f5f5f5/000000?text=5G",
        url: "#"
      },
      {
        id: 4,
        title: "Realidad Virtual en el retail: el futuro es hoy",
        category: "VR/AR",
        date: "5 Feb 2026",
        excerpt: "Tiendas implementan experiencias de compra inmersivas usando realidad virtual y aumentada.",
        image: "https://via.placeholder.com/600x400/f5f5f5/000000?text=VR",
        url: "#"
      },
      {
        id: 5,
        title: "Ciberseguridad: principales amenazas del 2026",
        category: "Seguridad",
        date: "4 Feb 2026",
        excerpt: "Expertos identifican las vulnerabilidades más críticas y cómo protegerse contra ataques cibernéticos.",
        image: "https://via.placeholder.com/600x400/f5f5f5/000000?text=Security",
        url: "#"
      },
      {
        id: 6,
        title: "Blockchain transforma la logística empresarial",
        category: "Blockchain",
        date: "3 Feb 2026",
        excerpt: "La tecnología blockchain mejora la transparencia y eficiencia en cadenas de suministro globales.",
        image: "https://via.placeholder.com/600x400/f5f5f5/000000?text=Blockchain",
        url: "#"
      }
    ]
    
    setFeaturedNews(fallbackNews[0])
    setNews(fallbackNews.slice(1))
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Noticias de Tecnología</h1>
          <p className={styles.heroSubtitle}>
            Las últimas novedades del mundo tech actualizadas en tiempo real
          </p>
        </section>

        {loading && (
          <section className={styles.loadingSection}>
            <div className={styles.loader}></div>
            <p>Cargando noticias de tecnología...</p>
          </section>
        )}

        {error && (
          <section className={styles.errorSection}>
            <p className={styles.errorText}>⚠️ Mostrando noticias de ejemplo</p>
            <p className={styles.errorSubtext}>
              No se pudo conectar al backend de noticias. Verifica que el servidor Spring Boot
              este corriendo y que el endpoint /api/news/tech responda.
            </p>
          </section>
        )}

        {!loading && featuredNews && (
          <>
            <section className={styles.featuredSection}>
              <div className={styles.featuredCard}>
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title} 
                  className={styles.featuredImage}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/1200x500/000000/FFFFFF?text=Noticia+Destacada'
                  }}
                />
                <div className={styles.featuredContent}>
                  <span className={styles.featuredCategory}>DESTACADO</span>
                  <h2 className={styles.featuredTitle}>{featuredNews.title}</h2>
                  <p className={styles.featuredExcerpt}>{featuredNews.excerpt}</p>
                  <div className={styles.featuredMeta}>
                    <span className={styles.featuredSource}>📰 {featuredNews.category}</span>
                    <span className={styles.featuredDate}>📅 {featuredNews.date}</span>
                  </div>
                  {featuredNews.url && featuredNews.url !== '#' && (
                    <a 
                      href={featuredNews.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.featuredButton}
                    >
                      Leer Artículo Completo
                    </a>
                  )}
                </div>
              </div>
            </section>

            <section className={styles.newsSection}>
              <h2 className={styles.sectionTitle}>Más Noticias Tecnológicas</h2>
              <div className={styles.newsGrid}>
                {news.map((item) => (
                  <article key={item.id} className={styles.newsCard}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={styles.newsImage}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400/f5f5f5/000000?text=Tech+News'
                      }}
                    />
                    <div className={styles.newsContent}>
                      <div className={styles.newsMeta}>
                        <span className={styles.newsCategory}>{item.category}</span>
                        <span className={styles.newsDate}>{item.date}</span>
                      </div>
                      <h3 className={styles.newsTitle}>{item.title}</h3>
                      <p className={styles.newsExcerpt}>{item.excerpt}</p>
                      {item.url && item.url !== '#' ? (
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.newsButton}
                        >
                          Leer Más →
                        </a>
                      ) : (
                        <button className={styles.newsButton}>Leer Más →</button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
