"use client"

import React, { useEffect, useState } from 'react'
import Header from "../../components/header/page"
import Footer from "../../components/footer/page"
import styles from './page.module.css'
import { apiEndpoints as apiEndPoint } from "../../config/api.js"

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [authToken, setAuthToken] = useState('')
  const [adminMessage, setAdminMessage] = useState('')
  const [adminMessageType, setAdminMessageType] = useState('error')

  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    active: true
  })
  const [editingProductId, setEditingProductId] = useState(null)

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: '',
    active: true
  })
  const [editingServiceId, setEditingServiceId] = useState(null)

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
    }
  }

  const fetchServices = async () => {
    try {
      const response = await fetch(apiEndPoint.services.list)
      const data = await response.json()
      setServices(Array.isArray(data) ? data : [])
    } catch (error) {
      setAdminMessage('No se pudieron cargar los servicios')
    }
  }

  const handleProductSubmit = async (event) => {
    event.preventDefault()
    setAdminMessage('')

    try {
      const payload = {
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        category: productForm.category,
        stock: Number(productForm.stock),
        active: productForm.active
      }

      const url = editingProductId
        ? `${apiEndPoint.products.admin}/${editingProductId}`
        : apiEndPoint.products.admin

      const method = editingProductId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Error al guardar el producto')
      }

      setProductForm({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        active: true
      })
      setEditingProductId(null)
      fetchProducts()
      setAdminMessage('Producto guardado exitosamente')
      setAdminMessageType('success')
      setTimeout(() => setAdminMessage(''), 3000)
    } catch (error) {
      setAdminMessage(error.message)
      setAdminMessageType('error')
    }
  }

  const handleProductEdit = (product) => {
    setEditingProductId(product.id)
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      stock: product.stock || '',
      active: product.active
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleProductCancelEdit = () => {
    setEditingProductId(null)
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      active: true
    })
  }

  const handleProductDelete = async (id) => {
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
    } catch (error) {
      setAdminMessage(error.message)
    }
  }

  const handleProductImageUpload = async (productId, file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${apiEndPoint.products.admin}/${productId}/images`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('No se pudo subir la imagen')
      }

      fetchProducts()
    } catch (error) {
      setAdminMessage(error.message)
    }
  }

  const handleProductImageDelete = async (productId, imageId) => {
    try {
      const response = await fetch(`${apiEndPoint.products.admin}/${productId}/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        throw new Error('No se pudo eliminar la imagen')
      }

      fetchProducts()
    } catch (error) {
      setAdminMessage(error.message)
    }
  }

  const handleImageReorder = async (productId, images) => {
    try {
      const positions = images.map((image, index) => ({
        imageId: image.id,
        position: index
      }))

      const response = await fetch(`${apiEndPoint.products.admin}/${productId}/images/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(positions)
      })

      if (!response.ok) {
        throw new Error('No se pudo reordenar las imagenes')
      }

      fetchProducts()
    } catch (error) {
      setAdminMessage(error.message)
    }
  }

  const handleDragStart = (event, imageIndex) => {
    event.dataTransfer.setData('imageIndex', imageIndex.toString())
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event, productId, targetIndex, images) => {
    event.preventDefault()
    const sourceIndex = parseInt(event.dataTransfer.getData('imageIndex'))
    
    if (sourceIndex === targetIndex) return

    const newImages = [...images]
    const [movedImage] = newImages.splice(sourceIndex, 1)
    newImages.splice(targetIndex, 0, movedImage)

    handleImageReorder(productId, newImages)
  }

  const handleServiceSubmit = async (event) => {
    event.preventDefault()
    setAdminMessage('')

    try {
      const payload = {
        title: serviceForm.title,
        description: serviceForm.description,
        icon: serviceForm.icon,
        active: serviceForm.active
      }

      const url = editingServiceId
        ? `${apiEndPoint.services.admin}/${editingServiceId}`
        : apiEndPoint.services.admin

      const method = editingServiceId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Error al guardar el servicio')
      }

      setServiceForm({
        title: '',
        description: '',
        icon: '',
        active: true
      })
      setEditingServiceId(null)
      fetchServices()
      setAdminMessage('Servicio guardado exitosamente')
      setAdminMessageType('success')
      setTimeout(() => setAdminMessage(''), 3000)
    } catch (error) {
      setAdminMessage(error.message)
    }
  }

  const handleServiceEdit = (service) => {
    setEditingServiceId(service.id)
    setServiceForm({
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || '',
      active: service.active
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleServiceCancelEdit = () => {
    setEditingServiceId(null)
    setServiceForm({
      title: '',
      description: '',
      icon: '',
      active: true
    })
  }

  const handleServiceDelete = async (id) => {
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
    } catch (error) {
      setAdminMessage(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Panel Administrador</h1>
          <p className={styles.heroSubtitle}>Gestiona productos, servicios e imagenes</p>
        </section>

        {!isAdmin && (
          <section className={styles.errorSection}>
            <p>No tienes permisos de administrador.</p>
          </section>
        )}

        {isAdmin && (
          <section className={styles.adminSection}>
            {adminMessage && <p className={`${styles.message} ${adminMessageType === 'success' ? styles.success : styles.error}`}>{adminMessage}</p>}

            <div className={styles.columns}>
              <div className={styles.column}>
                <h2>Productos</h2>
                <form className={styles.form} onSubmit={handleProductSubmit}>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={productForm.name}
                    onChange={(event) => setProductForm({ ...productForm, name: event.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Descripcion"
                    value={productForm.description}
                    onChange={(event) => setProductForm({ ...productForm, description: event.target.value })}
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Precio"
                    value={productForm.price}
                    onChange={(event) => setProductForm({ ...productForm, price: event.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Categoria"
                    value={productForm.category}
                    onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={productForm.stock}
                    onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })}
                  />
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={productForm.active}
                      onChange={(event) => setProductForm({ ...productForm, active: event.target.checked })}
                    />
                    Activo
                  </label>
                  <div className={styles.formButtons}>
                    <button type="submit">
                      {editingProductId ? 'Actualizar Producto' : 'Crear Producto'}
                    </button>
                    {editingProductId && (
                      <button type="button" onClick={handleProductCancelEdit} className={styles.cancelButton}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                <div className={styles.list}>
                  {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/120x120/f5f5f5/000000?text=Producto'}
                        alt={product.name}
                      />
                      <div className={styles.cardContent}>
                        <h3>{product.name}</h3>
                        <p>${Number(product.price || 0).toFixed(2)}</p>
                        <div className={styles.cardActions}>
                          <button onClick={() => handleProductEdit(product)}>Editar</button>
                          <button onClick={() => handleProductDelete(product.id)}>Eliminar</button>
                        </div>
                        <div className={styles.imageGrid}>
                          {product.images?.map((image, index) => (
                            <div
                              key={image.id}
                              className={styles.imageItem}
                              draggable
                              onDragStart={(e) => handleDragStart(e, index)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, product.id, index, product.images)}
                            >
                              <img src={image.dataUrl} alt={product.name} />
                              <div className={styles.imageItemActions}>
                                <span className={styles.dragHandle}>⋮⋮</span>
                                <button
                                  className={styles.imageDelete}
                                  onClick={() => handleProductImageDelete(product.id, image.id)}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(event) => {
                            const files = Array.from(event.target.files || [])
                            if (files.length) {
                              Promise.all(files.map((file) => handleProductImageUpload(product.id, file)))
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.column}>
                <h2>Servicios</h2>
                <form className={styles.form} onSubmit={handleServiceSubmit}>
                  <input
                    type="text"
                    placeholder="Titulo"
                    value={serviceForm.title}
                    onChange={(event) => setServiceForm({ ...serviceForm, title: event.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Descripcion"
                    value={serviceForm.description}
                    onChange={(event) => setServiceForm({ ...serviceForm, description: event.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Icono (emoji)"
                    value={serviceForm.icon}
                    onChange={(event) => setServiceForm({ ...serviceForm, icon: event.target.value })}
                  />
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={serviceForm.active}
                      onChange={(event) => setServiceForm({ ...serviceForm, active: event.target.checked })}
                    />
                    Activo
                  </label>
                  <div className={styles.formButtons}>
                    <button type="submit">
                      {editingServiceId ? 'Actualizar Servicio' : 'Crear Servicio'}
                    </button>
                    {editingServiceId && (
                      <button type="button" onClick={handleServiceCancelEdit} className={styles.cancelButton}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                <div className={styles.list}>
                  {services.map((service) => (
                    <div key={service.id} className={styles.card}>
                      <div className={styles.cardContent}>
                        <h3>{service.icon} {service.title}</h3>
                        <p>{service.description}</p>
                        <div className={styles.cardActions}>
                          <button onClick={() => handleServiceEdit(service)}>Editar</button>
                          <button onClick={() => handleServiceDelete(service.id)}>Eliminar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
