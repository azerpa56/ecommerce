# 📌 QUICK REFERENCE - ENDPOINTS

## 🔓 PÚBLICOS (Sin autenticación)

### Productos
```
GET    /api/products              - Listar todos los productos activos
GET    /api/products/{id}         - Obtener producto por ID
GET    /api/products/new          - Productos nuevos (< 30 días)
GET    /api/products/featured     - Productos destacados
```

### Servicios
```
GET    /api/services              - Listar servicios activos
GET    /api/services/{id}         - Obtener servicio por ID
```

### Moneda
```
GET    /api/currency/bcv                    - Tasa BCV actual
GET    /api/currency/convert/usd-to-bs      - Convertir USD a BS (?amount=100)
GET    /api/currency/convert/bs-to-usd      - Convertir BS a USD (?amount=38527)
```

---

## 🔐 ADMIN (Requiere: Authorization: Bearer TOKEN)

### Productos
```
POST   /api/admin/products                  - Crear producto
PUT    /api/admin/products/{id}             - Actualizar producto
DELETE /api/admin/products/{id}             - Eliminar producto
PUT    /api/admin/products/{id}/featured    - Marcar como destacado
POST   /api/admin/products/inventory        - Cargar inventario
```

### Servicios
```
POST   /api/admin/services                  - Crear servicio
PUT    /api/admin/services/{id}             - Actualizar servicio
DELETE /api/admin/services/{id}             - Eliminar servicio
```

### Moneda
```
POST   /api/currency/bcv/update             - Forzar actualización BCV
POST   /api/admin/rate                      - Actualizar tasa manual (?rate=385.27&source=MANUAL)
```

### Reportes
```
GET    /api/admin/reports/profits           - Reporte por fechas (?startDate=2026-01-01&endDate=2026-02-10)
GET    /api/admin/reports/summary           - Resumen últimos 30 días
GET    /api/admin/reports/by-product        - Ganancias por producto (?startDate&endDate)
POST   /api/admin/reports/generate-daily    - Generar reporte diario (?date=2026-02-09)
```

---

## 📝 BODY EXAMPLES

### Crear Producto
```json
{
  "name": "Laptop Dell",
  "description": "Laptop profesional",
  "costPrice": 800.00,
  "salePrice": 1200.00,
  "category": "Electronics",
  "stock": 15,
  "alertStock": 5,
  "isFeatured": true,
  "active": true
}
```

### Cargar Inventario
```json
{
  "productId": 1,
  "quantity": 50,
  "costPrice": 800.00,
  "salePrice": 1200.00,
  "notes": "Restock mensual"
}
```

### Crear Servicio
```json
{
  "title": "Reparación de PC",
  "description": "Servicio completo",
  "price": 25.00,
  "icon": "wrench",
  "active": true
}
```

### Marcar Destacado
```json
{
  "isFeatured": true
}
```

---

## 🔑 AUTENTICACIÓN

### Login
```
POST /api/auth/signin
Body: {
  "email": "admin@gorazer.com",
  "password": "admin123"
}
```

Usar el token retornado en header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
