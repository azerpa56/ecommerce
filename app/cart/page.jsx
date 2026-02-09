"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import styles from './page.module.css'
import { apiEndpoints as apiEndPoint } from "../config/api.js"

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
const stripePromise = stripePublicKey.includes('placeholder') ? null : loadStripe(stripePublicKey)

const CheckoutForm = ({ total, cartItems, onMessage }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isPaying, setIsPaying] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      onMessage('Stripe no esta configurado correctamente')
      return
    }

    if (cartItems.length === 0) {
      onMessage('Tu carrito esta vacio')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      onMessage('Debes iniciar sesion para pagar')
      return
    }

    setIsPaying(true)
    onMessage('')

    try {
      const amountInCents = Math.round(total * 100)
      const response = await fetch(apiEndPoint.payment.createPaymentIntent, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: 'usd',
          description: 'Compra en Gorazer'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear pago')
      }

      const cardElement = elements.getElement(CardElement)
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement
        }
      })

      if (result.error) {
        throw new Error(result.error.message || 'Error en el pago')
      }

      if (result.paymentIntent?.status === 'succeeded') {
        // Crear la orden en el backend
        try {
          const orderItems = cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))

          const orderResponse = await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              totalAmount: total,
              items: orderItems,
              paymentIntentId: result.paymentIntent.id
            })
          })

          if (orderResponse.ok) {
            // Limpiar carrito y redirigir a historial de pedidos
            localStorage.removeItem('cart')
            onMessage('Pago completado con exito. Redirigiendo...')
            setTimeout(() => {
              window.location.href = '/orders'
            }, 2000)
          } else {
            onMessage('Pago completado pero error al registrar orden. Contacta soporte.')
          }
        } catch (error) {
          onMessage('Pago completado pero error al registrar orden. Contacta soporte.')
        }
      } else {
        onMessage('Pago procesado, revisa el estado')
      }
    } catch (error) {
      onMessage(error.message)
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <CardElement className={styles.cardElement} />
      <button className={styles.payButton} type="submit" disabled={isPaying}>
        {isPaying ? 'Procesando...' : 'Pagar'}
      </button>
    </form>
  )
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(storedCart)
  }, [])

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  const updateCart = (items) => {
    setCartItems(items)
    localStorage.setItem('cart', JSON.stringify(items))
  }

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id)
    updateCart(updated)
  }

  const handleQuantityChange = (id, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const nextQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: nextQuantity }
      }
      return item
    })
    updateCart(updated)
  }


  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Carrito de Compras</h1>
          <p className={styles.heroSubtitle}>Revisa tus productos antes de pagar</p>
        </section>

        <section className={styles.cartSection}>
          {cartItems.length === 0 ? (
            <p className={styles.empty}>Tu carrito esta vacio.</p>
          ) : (
            <div className={styles.cartGrid}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img
                    src={item.image || 'https://via.placeholder.com/120x120/f5f5f5/000000?text=Producto'}
                    alt={item.name}
                    className={styles.cartImage}
                  />
                  <div className={styles.cartInfo}>
                    <h3 className={styles.cartName}>{item.name}</h3>
                    <p className={styles.cartPrice}>${item.price.toFixed(2)}</p>
                    <div className={styles.cartQuantity}>
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className={styles.removeButton} onClick={() => handleRemove(item.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className={styles.summary}>
            <h2>Total: ${total.toFixed(2)}</h2>
            {!stripePromise && (
              <p className={styles.message}>Configura NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY para habilitar el pago.</p>
            )}
            {stripePromise && (
              <Elements stripe={stripePromise}>
                <CheckoutForm total={total} cartItems={cartItems} onMessage={setMessage} />
              </Elements>
            )}
            {message && <p className={styles.message}>{message}</p>}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
