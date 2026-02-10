"use client"

import React, { useEffect, useState } from 'react'
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import CreateProductModal from "../components/CreateProductModal"
import LoadInventoryModal from "../components/LoadInventoryModal"
import CreateServiceModal from "../components/CreateServiceModal"
import EditProductModal from "../components/EditProductModal"
import AdminReports from "../components/AdminReports"
import styles from './admin-new.module.css'
import apiEndPoint from "../config/apiEndPoint.json"

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [authToken, setAuthToken] = useState('')
  const [adminMessage, setAdminMessage] = useState('')
  const [adminMessageType, setAdminMessageType] = useState('success')

  // Modal states
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false)
  const [isLoadInventoryOpen, setIsLoadInventoryOpen] = useState(false)
  const [isCreateServiceOpen, setIsCreateServiceOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isViewReportsOpen, setIsViewReportsOpen] = useState(false)

  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token') || ''
    const roles = user.roles || []

    setAuthToken(token)
    setIsAdmin(roles.includes('ROLE_ADMIN'))
  }, [])

  useEffect(() => {
    if (isAdmin) {
      fetchProducts()
      fetchServices()
    }
  }, [isAdmin])

  const fetchProducts = async () => {
    try {
      const response = await fetch(apiEndPoint.products.list)
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      setAdminMessage('No se pudieron cargar los productos')
      setAdminMessageType('error')
    }
  }

  const fetchServices = async () => {
    try {
      const response = await fetch(apiEndPoint.services.list)
      const data = await response.json()
      setServices(Array.isArray(data) ? data : [])
    } catch (error) {
      setAdminMessage('No se pudieron cargar los servicios')
      setAdminMessageType('error')
    }
  }

  const handleProductCreated = () => {
    fetchProducts()
    setIsCreateProductOpen(false)
    showMessage('Producto creado exitosamente', 'success')
  }

  const handleInventoryLoaded = () => {
    fetchProducts()
    setIsLoadInventoryOpen(false)
    showMessage('Inventario cargado exitosamente', 'success')
  }

  const handleServiceCreated = () => {
    fetchServices()
    setIsCreateServiceOpen(false)
    showMessage('Servicio creado exitosamente', 'success')
  }

  const handleProductUpdated = () => {
    fetchProducts()
    setIsEditProductOpen(false)
    setSelectedProduct(null)
    showMessage('Producto actualizado exitosamente', 'success')
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setIsEditProductOpen(true)
  }

  const handleToggleFeatured = async (productId, currentStatus) => {
    try {
      const response = await fetch(`${apiEndPoint.products.featured_toggle}/${productId}/featured`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al cambiar estado destacado')
      }

      fetchProducts()
      showMessage('Estado destacado actualizado', 'success')
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      const response = await fetch(`${apiEndPoint.products.admin}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        throw new Error('No se pudo eliminar el producto')
      }

      fetchProducts()
      showMessage('Producto eliminado', 'success')
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  const handleDeleteService = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return

    try {
      const response = await fetch(`${apiEndPoint.services.admin}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        throw new Error('No se pudo eliminar el servicio')
      }

      fetchServices()
      showMessage('Servicio eliminado', 'success')
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  const showMessage = (message, type) => {
    setAdminMessage(message)
    setAdminMessageType(type)
    setTimeout(() => setAdminMessage(''), 4000)
  }

  if (!isAdmin) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <section className={styles.errorSection}>
            <h1>Acceso Denegado</h1>
            <p>No tienes permisos de administrador.</p>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Panel Administrador</h1>
          <p className={styles.heroSubtitle}>Gestiona productos, inventario, servicios y reportes</p>
        </section>

        {adminMessage && (
          <div className={`${styles.message} ${styles[adminMessageType]}`}>
            {adminMessage}
          </div>
        )}

        {/* Dashboard de acciones rápidas */}
        <section className={styles.dashboard}>
          <div className={styles.actionGrid}>
            <button
              className={styles.actionButton}
              onClick={() => setIsCreateProductOpen(true)}
            >
              <span className={styles.actionIcon}>📦</span>
              <span className={styles.actionLabel}>Crear Producto</span>
            </button>

            <button
              className={styles.actionButton}
              onClick={() => setIsLoadInventoryOpen(true)}
            >
              <span className={styles.actionIcon}>📥</span>
              <span className={styles.actionLabel}>Cargar Inventario</span>
            </button>

            <button
              className={styles.actionButton}
              onClick={() => setIsCreateServiceOpen(true)}
            >
              <span className={styles.actionIcon}>🛠️</span>
              <span className={styles.actionLabel}>Crear Servicio</span>
            </button>

            <button
              className={styles.actionButton}
              onClick={() => setIsViewReportsOpen(true)}
            >
              <span className={styles.actionIcon}>📊</span>
              <span className={styles.actionLabel}>Ver Ganancias</span>
            </button>
          </div>
        </section>

        {/* Listado de productos */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Productos ({products.length})</h2>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img
                    src={product.images?.[0]?.dataUrl || 'https://via.placeholder.com/200x200/f5f5f5/000000?text=Sin+Imagen'}
                    alt={product.name}
                  />
                  {product.isFeatured && (
                    <span className={styles.featuredBadge}>⭐ Destacado</span>
                  )}
                </div>

                <div className={styles.productContent}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>${Number(product.salePrice || product.price || 0).toFixed(2)}</p>
                  <p className={styles.productStock}>Stock: {product.stock || 0}</p>
                  {product.alertStock && product.stock <= product.alertStock && (
                    <span className={styles.lowStockWarning}>⚠️ Stock bajo</span>
                  )}

                  <div className={styles.productActions}>
                    <button
                      className={styles.btnEdit}
                      onClick={() => handleEditProduct(product)}
                      title="Editar producto"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className={styles.btnToggle}
                      onClick={() => handleToggleFeatured(product.id, product.isFeatured)}
                      title={product.isFeatured ? 'Quitar destacado' : 'Marcar como destacado'}
                    >
                      ⭐ {product.isFeatured ? 'Quitar' : 'Destacar'}
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDeleteProduct(product.id)}
                      title="Eliminar producto"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Listado de servicios */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Servicios ({services.length})</h2>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                {service.price && (
                  <p className={styles.servicePrice}>${Number(service.price).toFixed(2)}</p>
                )}
                <div className={styles.serviceActions}>
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDeleteService(service.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modales */}
      {isCreateProductOpen && (
        <CreateProductModal
          authToken={authToken}
          onClose={() => setIsCreateProductOpen(false)}
          onSuccess={handleProductCreated}
        />
      )}

      {isLoadInventoryOpen && (
        <LoadInventoryModal
          authToken={authToken}
          products={products}
          onClose={() => setIsLoadInventoryOpen(false)}
          onSuccess={handleInventoryLoaded}
        />
      )}

      {isCreateServiceOpen && (
        <CreateServiceModal
          authToken={authToken}
          onClose={() => setIsCreateServiceOpen(false)}
          onSuccess={handleServiceCreated}
        />
      )}

      {isEditProductOpen && selectedProduct && (
        <EditProductModal
          authToken={authToken}
          product={selectedProduct}
          onClose={() => {
            setIsEditProductOpen(false)
            setSelectedProduct(null)
          }}
          onSuccess={handleProductUpdated}
        />
      )}

      {isViewReportsOpen && (
        <AdminReports
          authToken={authToken}
          onClose={() => setIsViewReportsOpen(false)}
        />
      )}
    </div>
  )
}
