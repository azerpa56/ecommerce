-- =====================================================
-- SCRIPT SQL - NUEVAS TABLAS Y MODIFICACIONES
-- Proyecto: Ecommerce Gorazer
-- Fecha: 10 de febrero de 2026
-- Nota: Spring Boot JPA creará estas tablas automáticamente
-- Este script es solo para referencia
-- =====================================================

-- =====================================================
-- 1. MODIFICACIONES A LA TABLA PRODUCTS
-- =====================================================

-- Agregar nuevas columnas a products
ALTER TABLE ecommerce.products
ADD COLUMN IF NOT EXISTS cost_price DECIMAL(20,2),
ADD COLUMN IF NOT EXISTS sale_price DECIMAL(20,2),
ADD COLUMN IF NOT EXISTS alert_stock INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- =====================================================
-- 2. NUEVA TABLA: INVENTORY_TRANSACTIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS ecommerce.inventory_transactions (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    cost_price DECIMAL(20,2) NOT NULL,
    sale_price DECIMAL(20,2) NOT NULL,
    transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('IN', 'OUT')),
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_email VARCHAR(255),
    notes TEXT,
    CONSTRAINT fk_inventory_product 
        FOREIGN KEY (product_id) 
        REFERENCES ecommerce.products(id) 
        ON DELETE CASCADE
);

-- Índices para inventory_transactions
CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON ecommerce.inventory_transactions(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transaction_date ON ecommerce.inventory_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_inventory_transaction_type ON ecommerce.inventory_transactions(transaction_type);

-- =====================================================
-- 3. NUEVA TABLA: CURRENCY_RATES
-- =====================================================

CREATE TABLE IF NOT EXISTS ecommerce.currency_rates (
    id BIGSERIAL PRIMARY KEY,
    currency VARCHAR(50) NOT NULL UNIQUE,
    rate DECIMAL(20,8) NOT NULL,
    source VARCHAR(100) NOT NULL,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para currency_rates
CREATE INDEX IF NOT EXISTS idx_currency_code ON ecommerce.currency_rates(currency);
CREATE INDEX IF NOT EXISTS idx_currency_last_updated ON ecommerce.currency_rates(last_updated);

-- Insertar tasa inicial (opcional)
INSERT INTO ecommerce.currency_rates (currency, rate, source, last_updated, created_at)
VALUES ('USD_BS', 385.272, 'BCV', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (currency) DO NOTHING;

-- =====================================================
-- 4. NUEVA TABLA: SALES_REPORTS
-- =====================================================

CREATE TABLE IF NOT EXISTS ecommerce.sales_reports (
    id BIGSERIAL PRIMARY KEY,
    report_date DATE NOT NULL UNIQUE,
    total_sales DECIMAL(20,2) NOT NULL DEFAULT 0.00,
    total_cost DECIMAL(20,2) NOT NULL DEFAULT 0.00,
    profit DECIMAL(20,2) NOT NULL DEFAULT 0.00,
    products_sold INTEGER DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para sales_reports
CREATE INDEX IF NOT EXISTS idx_sales_report_date ON ecommerce.sales_reports(report_date);

-- =====================================================
-- 5. MODIFICACIONES A LA TABLA SERVICES
-- =====================================================

-- Agregar nuevas columnas a services
ALTER TABLE ecommerce.services
ADD COLUMN IF NOT EXISTS price DECIMAL(20,2),
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- =====================================================
-- 6. CONSULTAS ÚTILES PARA VERIFICACIÓN
-- =====================================================

-- Ver productos nuevos (últimos 30 días)
-- SELECT * FROM ecommerce.products 
-- WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '30 days' 
-- AND active = true;

-- Ver productos destacados
-- SELECT * FROM ecommerce.products 
-- WHERE is_featured = true 
-- AND active = true;

-- Ver últimas transacciones de inventario
-- SELECT 
--     it.*,
--     p.name as product_name
-- FROM ecommerce.inventory_transactions it
-- JOIN ecommerce.products p ON it.product_id = p.id
-- ORDER BY it.transaction_date DESC
-- LIMIT 50;

-- Ver tasa de cambio actual
-- SELECT * FROM ecommerce.currency_rates 
-- WHERE currency = 'USD_BS' 
-- ORDER BY last_updated DESC 
-- LIMIT 1;

-- Ver reportes de ventas del último mes
-- SELECT * FROM ecommerce.sales_reports 
-- WHERE report_date >= CURRENT_DATE - INTERVAL '30 days'
-- ORDER BY report_date DESC;

-- Calcular ganancias totales por período
-- SELECT 
--     DATE_TRUNC('month', report_date) as month,
--     SUM(total_sales) as total_sales,
--     SUM(total_cost) as total_cost,
--     SUM(profit) as total_profit,
--     SUM(products_sold) as total_products_sold
-- FROM ecommerce.sales_reports
-- WHERE report_date >= '2026-01-01'
-- GROUP BY DATE_TRUNC('month', report_date)
-- ORDER BY month DESC;

-- =====================================================
-- 7. TRIGGERS AUTOMÁTICOS (OPCIONAL)
-- =====================================================

-- Trigger para actualizar updated_at automáticamente en products
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a products
DROP TRIGGER IF EXISTS update_products_updated_at ON ecommerce.products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON ecommerce.products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Aplicar trigger a services
DROP TRIGGER IF EXISTS update_services_updated_at ON ecommerce.services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON ecommerce.services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Aplicar trigger a sales_reports
DROP TRIGGER IF EXISTS update_sales_reports_updated_at ON ecommerce.sales_reports;
CREATE TRIGGER update_sales_reports_updated_at
    BEFORE UPDATE ON ecommerce.sales_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 8. DATOS DE PRUEBA (OPCIONAL)
-- =====================================================

-- Insertar producto de prueba con nuevos campos
-- INSERT INTO ecommerce.products 
-- (name, description, price, cost_price, sale_price, category, stock, alert_stock, is_featured, active, created_at, updated_at)
-- VALUES 
-- ('Laptop HP', 'Laptop HP 15.6" Intel i5', 850.00, 600.00, 850.00, 'Electronics', 25, 5, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insertar servicio de prueba
-- INSERT INTO ecommerce.services 
-- (title, description, price, icon, active, created_at, updated_at)
-- VALUES 
-- ('Reparación de PC', 'Servicio completo de diagnóstico y reparación', 25.00, 'wrench', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
