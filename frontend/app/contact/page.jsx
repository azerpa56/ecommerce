import React from 'react'
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import styles from './page.module.css'

export default function Contact() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Contáctanos</h1>
          <p className={styles.heroSubtitle}>
            Estamos aquí para ayudarte. Envíanos tu mensaje y te responderemos pronto
          </p>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.contactGrid}>
            {/* Formulario */}
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Envíanos un Mensaje</h2>
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={styles.input}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={styles.input}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Teléfono</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className={styles.input}
                    placeholder="+58 424 123 4567"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Asunto</label>
                  <select id="subject" className={styles.select}>
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta General</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="ventas">Información de Ventas</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Mensaje</label>
                  <textarea 
                    id="message" 
                    className={styles.textarea}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Información de Contacto */}
            <div className={styles.infoContainer}>
              <h2 className={styles.infoTitle}>Información de Contacto</h2>
              
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📍</div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoLabel}>Dirección</h3>
                  <p className={styles.infoText}>
                    Av. Principal #123<br />
                    Caracas, Venezuela
                  </p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📧</div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoLabel}>Email</h3>
                  <p className={styles.infoText}>
                    gorazer.contacto@gmail.com<br />
                    soporte@gorazer.com
                  </p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📱</div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoLabel}>Teléfono</h3>
                  <p className={styles.infoText}>
                    +58 424 123 4567<br />
                    +58 212 555 0123
                  </p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🕐</div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoLabel}>Horario de Atención</h3>
                  <p className={styles.infoText}>
                    Lunes - Viernes: 9:00 - 18:00<br />
                    Sábados: 9:00 - 14:00<br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>

              <div className={styles.socialSection}>
                <h3 className={styles.socialTitle}>Síguenos</h3>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>Facebook</a>
                  <a href="#" className={styles.socialLink}>Instagram</a>
                  <a href="#" className={styles.socialLink}>Twitter</a>
                  <a href="#" className={styles.socialLink}>LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
