import React from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            {/* Sobre Nosotros */}
            <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>Sobre Gorazer</h3>
                <p className={styles.footerText}>
                    Tu tienda de confianza para productos de calidad. 
                    Ofrecemos la mejor experiencia de compra online.
                </p>
                <div className={styles.socialLinks}>
                    <a href="#" className={styles.socialLink} aria-label="Facebook">F</a>
                    <a href="#" className={styles.socialLink} aria-label="Instagram">IG</a>
                    <a href="#" className={styles.socialLink} aria-label="Twitter">X</a>
                    <a href="#" className={styles.socialLink} aria-label="LinkedIn">in</a>
                </div>
            </div>

            {/* Enlaces Rápidos */}
            <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>Enlaces Rápidos</h3>
                <ul className={styles.footerList}>
                    <li><Link href="/" className={styles.footerLink}>Inicio</Link></li>
                    <li><Link href="/products" className={styles.footerLink}>Productos</Link></li>
                    <li><Link href="/servicio" className={styles.footerLink}>Servicios</Link></li>
                    <li><Link href="/ofertas" className={styles.footerLink}>Ofertas</Link></li>
                    <li><Link href="/noticias" className={styles.footerLink}>Noticias</Link></li>
                </ul>
            </div>

            {/* Información Legal */}
            <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>Información</h3>
                <ul className={styles.footerList}>
                    <li><Link href="/terminos" className={styles.footerLink}>Términos y Condiciones</Link></li>
                    <li><Link href="/privacidad" className={styles.footerLink}>Política de Privacidad</Link></li>
                    <li><Link href="/envios" className={styles.footerLink}>Política de Envíos</Link></li>
                    <li><Link href="/devoluciones" className={styles.footerLink}>Devoluciones</Link></li>
                    <li><Link href="/faq" className={styles.footerLink}>Preguntas Frecuentes</Link></li>
                </ul>
            </div>

            {/* Contacto */}
            <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>Contacto</h3>
                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <strong>Email:</strong>
                        <a href="mailto:gorazer.contacto@gmail.com" className={styles.contactLink}>
                            gorazer.contacto@gmail.com
                        </a>
                    </div>
                    <div className={styles.contactItem}>
                        <strong>Teléfono:</strong>
                        <span>+58 424 123 4567</span>
                    </div>
                    <div className={styles.contactItem}>
                        <strong>Horario:</strong>
                        <span>Lun - Vie: 9:00 - 18:00</span>
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.footerBottom}>
            <p>© 2026 Gorazer. Todos los derechos reservados.</p>
        </div>
    </footer>
  )
}
