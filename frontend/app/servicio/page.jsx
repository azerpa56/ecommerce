"use client"

import React, { useEffect, useState } from 'react'
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import styles from './page.module.css'
import { apiEndpoints as apiEndPoint } from "../config/api.js"

export default function Servicios() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(apiEndPoint.services.list)

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`)
        }

        const data = await response.json()
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No hay servicios disponibles')
        }

        setServices(data)
      } catch (err) {
        setError(err.message)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Nuestros Servicios</h1>
          <p className={styles.heroSubtitle}>
            Comprometidos con tu satisfacción en cada paso del proceso
          </p>
        </section>

        <section className={styles.servicesSection}>
          {loading && <p>Cargando servicios...</p>}
          {error && <p>Mostrando servicios de ejemplo.</p>}
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>¿Necesitas ayuda?</h2>
          <p className={styles.ctaText}>
            Nuestro equipo está disponible para asistirte en todo momento
          </p>
          <button className={styles.ctaButton}>Contáctanos</button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
