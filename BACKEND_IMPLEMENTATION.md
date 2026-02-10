# Backend - Documentación de Cambios

## Fecha: 10 de febrero de 2026

---

## 📋 RESUMEN DE IMPLEMENTACIÓN

Se ha completado exitosamente la implementación del Backend para el proyecto de ecommerce Gorazer con las siguientes mejoras:

### ✅ Fase 1: Modelos de Datos

#### **Product.java** (Actualizado)
- ✅ `costPrice` - Precio de costo
- ✅ `salePrice` - Precio de venta
- ✅ `alertStock` - Stock de alerta
- ✅ `isFeatured` - Producto destacado
- ✅ `isNew()` - Método que retorna true si el producto tiene menos de 30 días

#### **Nuevos Modelos Creados:**
1. ✅ **InventoryTransaction.java**
   - Gestiona entradas y salidas de inventario
   - Campos: productId, quantity, costPrice, salePrice, transactionType (IN/OUT), date, userEmail

2. ✅ **CurrencyRate.java**
   - Almacena tasas de cambio USD/BS
   - Campos: currency, rate, source, lastUpdated

3. ✅ **SalesReport.java**
   - Reportes de ganancias por día
   - Campos: reportDate, totalSales, totalCost, profit, productsSold, ordersCount

4. ✅ **ServiceItem.java** (Actualizado)
   - Agregado campo `price` para precios de servicios
   - Agregados timestamps: createdAt, updatedAt

---

### ✅ Fase 2: Repositorios

Se crearon repositorios para todos los nuevos modelos:
- ✅ `InventoryTransactionRepository.java`
- ✅ `CurrencyRateRepository.java`
- ✅ `SalesReportRepository.java`
- ✅ `ServiceItemRepository.java` (ya existía)

---

### ✅ Fase 3: Servicios

#### 1. **BcvScraperService.java**
- Web scraping de https://www.bcv.org.ve/
- Parsea el precio del dólar BCV
- Cache de 1 hora para no sobrecargar el sitio
- Task programada cada 6 horas: `@Scheduled(cron = "0 0 */6 * * *")`
- Fallback: usa última tasa guardada si falla el scraping

**Métodos principales:**
```java
BigDecimal fetchBcvRate()           // Obtiene tasa del BCV
BigDecimal getLatestRate()          // Retorna última tasa guardada
void scheduleRateUpdate()           // Task automática
```

#### 2. **CurrencyService.java**
- Gestión de conversión de monedas
- Métodos de conversión USD ↔ BS

**Métodos principales:**
```java
BigDecimal getCurrentRate()
BigDecimal convertUsdToBs(BigDecimal usdAmount)
BigDecimal convertBsToUsd(BigDecimal bsAmount)
CurrencyRate updateRate(BigDecimal newRate, String source)
BigDecimal forceUpdateFromBcv()
```

#### 3. **InventoryService.java**
- Gestión de carga de inventario
- Registro de ventas
- Historial de transacciones

**Métodos principales:**
```java
InventoryTransaction loadInventory(productId, quantity, costPrice, salePrice, userEmail, notes)
InventoryTransaction registerSale(productId, quantity, costPrice, salePrice, userEmail)
List<InventoryTransaction> getProductHistory(productId)
Integer getCalculatedStock(productId)
```

#### 4. **SalesReportService.java**
- Generación de reportes de ganancias
- Resumen de ventas por período
- Ganancias por producto

**Métodos principales:**
```java
SalesReport generateDailyReport(LocalDate date)
Map<String, Object> getProfitReport(LocalDate start, LocalDate end)
List<Map<String, Object>> getProfitByProduct(LocalDate start, LocalDate end)
Map<String, Object> getSalesSummary()
```

---

### ✅ Fase 4: Controladores y Endpoints

#### **ProductController.java** (Actualizado)

**Nuevos endpoints:**
```
GET    /api/products/new              - Productos nuevos (< 30 días)
GET    /api/products/featured         - Productos destacados
PUT    /api/admin/products/{id}/featured   - Marcar/desmarcar como destacado
POST   /api/admin/products/inventory  - Cargar inventario
```

**Endpoints actualizados:**
- `POST /api/admin/products` - Ahora soporta costPrice, salePrice, alertStock, isFeatured
- `PUT /api/admin/products/{id}` - Actualizado con nuevos campos

**Response actualizado (ProductResponse):**
```json
{
  "id": 1,
  "name": "Producto",
  "description": "...",
  "price": 100.00,
  "costPrice": 50.00,
  "salePrice": 100.00,
  "category": "Electronics",
  "stock": 50,
  "alertStock": 10,
  "isFeatured": true,
  "isNew": true,
  "active": true,
  "images": [...]
}
```

#### **CurrencyController.java** (Nuevo)

**Endpoints:**
```
GET    /api/currency/bcv                    - Obtener tasa actual del BCV
POST   /api/currency/bcv/update            - Forzar actualización desde BCV (Admin)
GET    /api/currency/convert/usd-to-bs     - Convertir USD a BS (?amount=100)
GET    /api/currency/convert/bs-to-usd     - Convertir BS a USD (?amount=38527.20)
POST   /api/admin/rate                     - Actualizar tasa manualmente (Admin)
```

**Ejemplo de uso:**
```bash
# Obtener tasa BCV
curl http://localhost:8080/api/currency/bcv

# Convertir 100 USD a BS
curl http://localhost:8080/api/currency/convert/usd-to-bs?amount=100

# Respuesta:
{
  "amount": 100.00,
  "fromCurrency": "USD",
  "toCurrency": "BS",
  "convertedAmount": 38527.20,
  "rate": 385.272
}
```

#### **SalesReportController.java** (Nuevo)

**Endpoints (todos requieren ADMIN):**
```
GET    /api/admin/reports/profits          - Reporte por rango de fechas
       Params: startDate, endDate (ISO format: 2026-01-01)
       
GET    /api/admin/reports/summary          - Resumen últimos 30 días

GET    /api/admin/reports/by-product       - Ganancias por producto
       Params: startDate, endDate
       
POST   /api/admin/reports/generate-daily   - Generar reporte manual
       Params: date
```

**Ejemplo de respuesta (profits):**
```json
{
  "startDate": "2026-01-01",
  "endDate": "2026-02-10",
  "totalSales": 50000.00,
  "totalCost": 30000.00,
  "totalProfit": 20000.00,
  "totalProductsSold": 150,
  "totalOrders": 45,
  "dailyReports": [...]
}
```

#### **ServiceItemController.java** (Actualizado)

**Endpoints actualizados:**
```
GET    /api/services                - Listar servicios activos
GET    /api/services/{id}           - Obtener servicio por ID
POST   /api/admin/services          - Crear servicio (con price)
PUT    /api/admin/services/{id}     - Actualizar servicio
DELETE /api/admin/services/{id}     - Eliminar servicio
```

**Request DTO (ServiceRequest):**
```json
{
  "title": "Reparación de PC",
  "description": "Servicio de reparación...",
  "price": 25.00,
  "icon": "wrench",
  "active": true
}
```

---

### ✅ Fase 5: DTOs (Request/Response)

**Nuevos Request DTOs:**
1. ✅ `InventoryLoadRequest.java` - Cargar inventario
2. ✅ `ServiceRequest.java` - Crear/actualizar servicios
3. ✅ `FeaturedProductRequest.java` - Marcar producto destacado

**Nuevos Response DTOs:**
1. ✅ `CurrencyRateResponse.java` - Info de tasa de cambio
2. ✅ `ConversionResponse.java` - Resultado de conversión
3. ✅ `ServiceResponse.java` - Respuesta de servicios

**DTOs Actualizados:**
1. ✅ `ProductRequest.java` - Agregados: costPrice, salePrice, alertStock, isFeatured
2. ✅ `ProductResponse.java` - Agregados: costPrice, salePrice, alertStock, isFeatured, isNew

---

### ✅ Fase 6: Configuración

#### **pom.xml**
- ✅ Agregada dependencia Jsoup 1.17.2 para web scraping

#### **EcommerceGorazerApplication.java**
- ✅ Agregado `@EnableScheduling` para tareas programadas

#### **Spring Scheduling**
- ✅ Task automática cada 6 horas para actualizar tasa BCV
- ✅ Cache de 1 hora en `fetchBcvRate()`

---

## 🔐 SEGURIDAD

Todos los endpoints administrativos están protegidos con:
```java
@PreAuthorize("hasRole('ADMIN')")
```

**Endpoints públicos:**
- GET /api/products
- GET /api/products/{id}
- GET /api/products/new
- GET /api/products/featured
- GET /api/services
- GET /api/currency/bcv
- GET /api/currency/convert/*

**Endpoints protegidos (ADMIN):**
- Todos los endpoints bajo `/api/admin/**`
- Crear, actualizar, eliminar productos y servicios
- Cargar inventario
- Ver reportes de ganancias
- Gestionar tasas de cambio

---

## 📊 BASE DE DATOS

**Nuevas tablas creadas automáticamente por JPA:**
1. `inventory_transactions` - Transacciones de inventario
2. `currency_rates` - Tasas de cambio
3. `sales_reports` - Reportes de ventas/ganancias

**Tablas actualizadas:**
1. `products` - Nuevas columnas: cost_price, sale_price, alert_stock, is_featured
2. `services` - Nueva columna: price, created_at, updated_at

---

## 🚀 PRÓXIMOS PASOS

1. **Compilar el proyecto:**
   ```bash
   cd ecommerceGorazer
   mvn clean install
   ```

2. **Ejecutar el backend:**
   ```bash
   mvn spring-boot:run
   ```

3. **Verificar endpoints:**
   - El servidor estará en: http://localhost:8080
   - Documentación Swagger (si está configurado): http://localhost:8080/swagger-ui.html

4. **Probar scraping BCV:**
   ```bash
   curl http://localhost:8080/api/currency/bcv
   ```

---

## 📝 NOTAS IMPORTANTES

1. **Web Scraping del BCV:**
   - El scraping puede fallar si la página del BCV cambia su estructura
   - Hay un sistema de fallback que usa la última tasa guardada
   - Se puede actualizar manualmente la tasa si es necesario

2. **Cache:**
   - La tasa BCV se cachea por 1 hora mediante `@Cacheable`
   - Si necesitas invalidar el cache, reinicia la aplicación o usa el endpoint de actualización forzada

3. **Productos Nuevos:**
   - Se consideran "nuevos" los productos creados en los últimos 30 días
   - El cálculo se hace dinámicamente con el método `isNew()`

4. **Inventario:**
   - Cada carga de inventario crea un registro en `inventory_transactions`
   - El stock del producto se actualiza automáticamente
   - Se guarda el email del usuario que realizó la carga

5. **Reportes:**
   - Los reportes diarios se pueden generar manualmente
   - Se recomienda crear un job nocturno para generar reportes automáticamente

---

## ✅ CHECKLIST COMPLETADO

- [x] Actualizar modelo Product con nuevos campos
- [x] Crear modelo InventoryTransaction
- [x] Crear modelo CurrencyRate
- [x] Crear modelo SalesReport
- [x] Actualizar modelo ServiceItem
- [x] Crear todos los repositorios
- [x] Agregar Jsoup al pom.xml
- [x] Crear BcvScraperService con scheduling
- [x] Crear CurrencyService
- [x] Crear InventoryService
- [x] Crear SalesReportService
- [x] Actualizar ProductController
- [x] Crear CurrencyController
- [x] Crear SalesReportController
- [x] Actualizar ServiceItemController
- [x] Crear todos los DTOs necesarios
- [x] Habilitar @EnableScheduling
- [x] Documentar todos los cambios

---

## 🎉 ¡BACKEND COMPLETADO!

Ahora puedes proceder con la implementación del Frontend (Fases 4, 5, 6).
