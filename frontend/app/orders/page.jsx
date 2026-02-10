"use client"

import React, { useEffect, useState } from 'react'
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import styles from './page.module.css'
import apiEndPoint from "../config/apiEndPoint.json"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setSuccessMessage('¡Pedido realizado con éxito!')
    }
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setMessage('Debes iniciar sesión para ver tus pedidos')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(apiEndPoint.orders.myOrders, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar pedidos')
      }

      const data = await response.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { text: 'Pendiente', color: '#ffa500' },
      PROCESSING: { text: 'Procesando', color: '#2196f3' },
      COMPLETED: { text: 'Completado', color: '#4caf50' },
      CANCELLED: { text: 'Cancelado', color: '#9e9e9e' },
      FAILED: { text: 'Fallido', color: '#f44336' }
    }
    const info = statusMap[status] || { text: status, color: '#000' }
    return <span className={styles.statusBadge} style={{ backgroundColor: info.color }}>{info.text}</span>
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Mis Pedidos</h1>
          <p className={styles.heroSubtitle}>Revisa el historial y estado de tus compras</p>
        </section>

        <section className={styles.ordersSection}>
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          {loading && <p>Cargando pedidos...</p>}
          {message && <p className={styles.errorMessage}>{message}</p>}

          {!loading && orders.length === 0 && !message && (
            <p className={styles.empty}>No tienes pedidos aún.</p>
          )}

          {!loading && orders.length > 0 && (
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div>
                      <h3>Pedido #{order.id}</h3>
                      <p className={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className={styles.orderStatus}>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <span className={styles.itemName}>{item.productName}</span>
                        <span className={styles.itemQuantity}>x{item.quantity}</span>
                        <span className={styles.itemPrice}>${Number(item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <span className={styles.orderTotal}>Total: ${Number(order.totalAmount).toFixed(2)}</span>
                    {order.paymentIntentId && (
                      <span className={styles.paymentId}>ID: {order.paymentIntentId.slice(0, 20)}...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
