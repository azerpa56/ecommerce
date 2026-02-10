# 🧪 GUÍA DE PRUEBAS - API ENDPOINTS

## Configuración Inicial

**Base URL:** `http://localhost:8080/api`

**Token de Autenticación:**
```bash
# 1. Login como admin
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gorazer.com",
    "password": "admin123"
  }'

# Respuesta incluirá el token JWT
# Usar en headers: Authorization: Bearer {token}
```

---

## 📦 PRODUCTOS

### 1. Crear Producto (con nuevos campos)
```bash
curl -X POST http://localhost:8080/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Laptop Dell XPS 15",
    "description": "Laptop profesional con Intel i7, 16GB RAM, 512GB SSD",
    "costPrice": 800.00,
    "salePrice": 1200.00,
    "category": "Electronics",
    "stock": 15,
    "alertStock": 5,
    "isFeatured": true,
    "active": true
  }'
```

### 2. Obtener Productos Nuevos
```bash
curl http://localhost:8080/api/products/new
```

### 3. Obtener Productos Destacados
```bash
curl http://localhost:8080/api/products/featured
```

### 4. Marcar Producto como Destacado
```bash
curl -X PUT http://localhost:8080/api/admin/products/1/featured \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "isFeatured": true
  }'
```

### 5. Cargar Inventario
```bash
curl -X POST http://localhost:8080/api/admin/products/inventory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productId": 1,
    "quantity": 50,
    "costPrice": 750.00,
    "salePrice": 1150.00,
    "notes": "Restock mensual - proveedor ABC"
  }'
```

### 6. Actualizar Producto
```bash
curl -X PUT http://localhost:8080/api/admin/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Laptop Dell XPS 15 (Actualizado)",
    "description": "Nueva descripción",
    "costPrice": 780.00,
    "salePrice": 1180.00,
    "category": "Electronics",
    "stock": 20,
    "alertStock": 5,
    "isFeatured": true,
    "active": true
  }'
```

---

## 💱 MONEDA / CONVERSIÓN

### 1. Obtener Tasa BCV Actual
```bash
curl http://localhost:8080/api/currency/bcv
```

**Respuesta esperada:**
```json
{
  "currency": "USD_BS",
  "rate": 385.27200000,
  "source": "BCV",
  "lastUpdated": "2026-02-10T10:30:00"
}
```

### 2. Convertir USD a Bolívares
```bash
curl "http://localhost:8080/api/currency/convert/usd-to-bs?amount=100"
```

**Respuesta esperada:**
```json
{
  "amount": 100.00,
  "fromCurrency": "USD",
  "toCurrency": "BS",
  "convertedAmount": 38527.20,
  "rate": 385.272
}
```

### 3. Convertir Bolívares a USD
```bash
curl "http://localhost:8080/api/currency/convert/bs-to-usd?amount=38527.20"
```

### 4. Forzar Actualización desde BCV (Admin)
```bash
curl -X POST http://localhost:8080/api/currency/bcv/update \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Actualizar Tasa Manualmente (Admin)
```bash
curl -X POST "http://localhost:8080/api/admin/rate?rate=390.50&source=MANUAL" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🛠️ SERVICIOS

### 1. Crear Servicio
```bash
curl -X POST http://localhost:8080/api/admin/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Reparación de PC",
    "description": "Servicio completo de diagnóstico, limpieza y reparación de computadoras",
    "price": 25.00,
    "icon": "wrench",
    "active": true
  }'
```

### 2. Listar Servicios Activos
```bash
curl http://localhost:8080/api/services
```

### 3. Actualizar Servicio
```bash
curl -X PUT http://localhost:8080/api/admin/services/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Reparación de PC - Premium",
    "description": "Servicio premium con garantía extendida",
    "price": 35.00,
    "icon": "wrench",
    "active": true
  }'
```

### 4. Eliminar Servicio
```bash
curl -X DELETE http://localhost:8080/api/admin/services/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 REPORTES DE GANANCIAS

### 1. Obtener Reporte por Rango de Fechas
```bash
curl "http://localhost:8080/api/admin/reports/profits?startDate=2026-01-01&endDate=2026-02-10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Respuesta esperada:**
```json
{
  "startDate": "2026-01-01",
  "endDate": "2026-02-10",
  "totalSales": 50000.00,
  "totalCost": 30000.00,
  "totalProfit": 20000.00,
  "totalProductsSold": 150,
  "totalOrders": 45,
  "dailyReports": [
    {
      "reportDate": "2026-02-10",
      "totalSales": 1200.00,
      "totalCost": 700.00,
      "profit": 500.00,
      "productsSold": 3,
      "ordersCount": 2
    }
  ]
}
```

### 2. Obtener Resumen General (Últimos 30 días)
```bash
curl http://localhost:8080/api/admin/reports/summary \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Obtener Ganancias por Producto
```bash
curl "http://localhost:8080/api/admin/reports/by-product?startDate=2026-01-01&endDate=2026-02-10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Respuesta esperada:**
```json
[
  {
    "productId": 1,
    "productName": "Laptop Dell XPS 15",
    "totalSales": 12000.00,
    "totalCost": 8000.00,
    "totalProfit": 4000.00,
    "quantitySold": 10
  },
  {
    "productId": 2,
    "productName": "Mouse Logitech",
    "totalSales": 500.00,
    "totalCost": 300.00,
    "totalProfit": 200.00,
    "quantitySold": 25
  }
]
```

### 4. Generar Reporte Diario Manualmente
```bash
curl -X POST "http://localhost:8080/api/admin/reports/generate-daily?date=2026-02-09" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔍 CASOS DE USO COMPLETOS

### Caso 1: Crear producto y cargarlo con inventario

```bash
# 1. Crear el producto
PRODUCT_ID=$(curl -X POST http://localhost:8080/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Teclado Mecánico RGB",
    "description": "Teclado mecánico gaming con iluminación RGB",
    "costPrice": 30.00,
    "salePrice": 60.00,
    "category": "Peripherals",
    "stock": 0,
    "alertStock": 10,
    "isFeatured": false,
    "active": true
  }' | jq -r '.id')

# 2. Cargar inventario inicial
curl -X POST http://localhost:8080/api/admin/products/inventory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "{
    \"productId\": $PRODUCT_ID,
    \"quantity\": 50,
    \"costPrice\": 30.00,
    \"salePrice\": 60.00,
    \"notes\": \"Stock inicial\"
  }"

# 3. Marcar como destacado
curl -X PUT http://localhost:8080/api/admin/products/$PRODUCT_ID/featured \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"isFeatured": true}'
```

### Caso 2: Ver conversión de precios

```bash
# 1. Obtener tasa actual
RATE=$(curl -s http://localhost:8080/api/currency/bcv | jq -r '.rate')
echo "Tasa actual: $RATE"

# 2. Convertir precio de un producto
PRICE_USD=100
PRICE_BS=$(curl -s "http://localhost:8080/api/currency/convert/usd-to-bs?amount=$PRICE_USD" | jq -r '.convertedAmount')
echo "$PRICE_USD USD = $PRICE_BS BS"
```

### Caso 3: Ver todos los productos nuevos y destacados

```bash
# Productos nuevos
echo "=== PRODUCTOS NUEVOS ==="
curl -s http://localhost:8080/api/products/new | jq '.[] | {id, name, price, createdAt}'

# Productos destacados
echo "=== PRODUCTOS DESTACADOS ==="
curl -s http://localhost:8080/api/products/featured | jq '.[] | {id, name, price, isFeatured}'
```

---

## 🐛 TROUBLESHOOTING

### Error: "Access Denied" / 403
**Solución:** Verificar que el token JWT sea válido y que el usuario tenga rol ADMIN

### Error: Scraping BCV falla
**Solución:** Usar el endpoint de actualización manual:
```bash
curl -X POST "http://localhost:8080/api/admin/rate?rate=385.27&source=MANUAL" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Verificar que el scheduling funcione
**Solución:** Revisar logs del backend:
```
Iniciando scraping del BCV...
Tasa BCV obtenida exitosamente: 385.272
Tasa guardada en la base de datos: 385.272
```

---

## 📝 NOTAS

1. **Autenticación:** Todos los endpoints bajo `/api/admin/**` requieren autenticación y rol ADMIN
2. **Formato de fechas:** Usar ISO format: `YYYY-MM-DD`
3. **Tasa BCV:** Se actualiza automáticamente cada 6 horas
4. **Cache:** La tasa BCV tiene cache de 1 hora
5. **Productos nuevos:** Automático para productos creados hace menos de 30 días

---

## ✅ CHECKLIST DE PRUEBAS

- [ ] Login como admin funciona
- [ ] Crear producto con nuevos campos
- [ ] Obtener productos nuevos
- [ ] Obtener productos destacados
- [ ] Cargar inventario
- [ ] Obtener tasa BCV
- [ ] Convertir USD a BS
- [ ] Crear servicio con precio
- [ ] Obtener reporte de ganancias
- [ ] Ver resumen de ventas
- [ ] Verificar que el scheduling funcione (esperar 1 hora o reiniciar)
