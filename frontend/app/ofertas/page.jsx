import React from 'react'
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import styles from './page.module.css'

export default function Ofertas() {
  const offers = [
    {
      id: 1,
      title: "Black Friday Sale",
      discount: "50%",
      description: "Descuento en toda la categoría de electrónica",
      validUntil: "31 Dic 2026",
      image: "https://via.placeholder.com/600x400/000000/FFFFFF?text=Black+Friday"
    },
    {
      id: 2,
      title: "Cyber Monday",
      discount: "40%",
      description: "Las mejores ofertas en tecnología",
      validUntil: "15 Dic 2026",
      image: "https://via.placeholder.com/600x400/000000/FFFFFF?text=Cyber+Monday"
    },
    {
      id: 3,
      title: "Liquidación Verano",
      discount: "30%",
      description: "Descuentos en moda y accesorios",
      validUntil: "28 Feb 2026",
      image: "https://via.placeholder.com/600x400/000000/FFFFFF?text=Verano"
    }
  ]

  const flashDeals = [
    { id: 1, name: "Laptop Gaming", originalPrice: "$1499.99", offerPrice: "$999.99", savings: "33%", stock: 5 },
    { id: 2, name: "Smart TV 55\"", originalPrice: "$899.99", offerPrice: "$599.99", savings: "33%", stock: 8 },
    { id: 3, name: "Tablet Pro", originalPrice: "$699.99", offerPrice: "$449.99", savings: "36%", stock: 12 },
    { id: 4, name: "Auriculares Premium", originalPrice: "$299.99", offerPrice: "$179.99", savings: "40%", stock: 20 }
  ]

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Ofertas Especiales</h1>
          <p className={styles.heroSubtitle}>
            No te pierdas las mejores promociones y descuentos increíbles
          </p>
        </section>

        <section className={styles.offersSection}>
          <h2 className={styles.sectionTitle}>Promociones Activas</h2>
          <div className={styles.offersGrid}>
            {offers.map((offer) => (
              <div key={offer.id} className={styles.offerCard}>
                <img src={offer.image} alt={offer.title} className={styles.offerImage} />
                <div className={styles.offerContent}>
                  <div className={styles.offerBadge}>{offer.discount} OFF</div>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerDescription}>{offer.description}</p>
                  <p className={styles.offerValidity}>Válido hasta: {offer.validUntil}</p>
                  <button className={styles.offerButton}>Ver Productos</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.flashSection}>
          <h2 className={styles.sectionTitle}>Ofertas Relámpago ⚡</h2>
          <div className={styles.flashGrid}>
            {flashDeals.map((deal) => (
              <div key={deal.id} className={styles.flashCard}>
                <div className={styles.flashSavings}>{deal.savings} OFF</div>
                <h3 className={styles.flashName}>{deal.name}</h3>
                <div className={styles.flashPrices}>
                  <span className={styles.flashOriginalPrice}>{deal.originalPrice}</span>
                  <span className={styles.flashOfferPrice}>{deal.offerPrice}</span>
                </div>
                <p className={styles.flashStock}>Solo {deal.stock} unidades disponibles</p>
                <button className={styles.flashButton}>Comprar Ahora</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
