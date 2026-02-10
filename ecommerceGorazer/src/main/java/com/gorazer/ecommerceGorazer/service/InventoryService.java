package com.gorazer.ecommerceGorazer.service;

import com.gorazer.ecommerceGorazer.model.InventoryTransaction;
import com.gorazer.ecommerceGorazer.model.Product;
import com.gorazer.ecommerceGorazer.repository.InventoryTransactionRepository;
import com.gorazer.ecommerceGorazer.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryTransactionRepository inventoryTransactionRepository;

    @Autowired
    private ProductRepository productRepository;

    /**
     * Carga inventario de un producto (entrada)
     */
    @Transactional
    public InventoryTransaction loadInventory(Long productId, Integer quantity, 
                                              BigDecimal costPrice, BigDecimal salePrice, 
                                              String userEmail, String notes) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Crear transacción de entrada
        InventoryTransaction transaction = new InventoryTransaction();
        transaction.setProduct(product);
        transaction.setQuantity(quantity);
        transaction.setCostPrice(costPrice);
        transaction.setSalePrice(salePrice);
        transaction.setTransactionType(InventoryTransaction.TransactionType.IN);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setUserEmail(userEmail);
        transaction.setNotes(notes);

        // Actualizar stock del producto
        Integer currentStock = product.getStock() != null ? product.getStock() : 0;
        product.setStock(currentStock + quantity);
        
        // Actualizar precios del producto
        product.setCostPrice(costPrice);
        product.setSalePrice(salePrice);
        product.setPrice(salePrice); // Mantener compatibilidad
        product.setUpdatedAt(LocalDateTime.now());
        
        productRepository.save(product);

        return inventoryTransactionRepository.save(transaction);
    }

    /**
     * Registra una salida de inventario (venta)
     */
    @Transactional
    public InventoryTransaction registerSale(Long productId, Integer quantity, 
                                             BigDecimal costPrice, BigDecimal salePrice, 
                                             String userEmail) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Verificar stock disponible
        Integer currentStock = product.getStock() != null ? product.getStock() : 0;
        if (currentStock < quantity) {
            throw new RuntimeException("Stock insuficiente. Disponible: " + currentStock);
        }

        // Crear transacción de salida
        InventoryTransaction transaction = new InventoryTransaction();
        transaction.setProduct(product);
        transaction.setQuantity(quantity);
        transaction.setCostPrice(costPrice);
        transaction.setSalePrice(salePrice);
        transaction.setTransactionType(InventoryTransaction.TransactionType.OUT);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setUserEmail(userEmail);

        // Actualizar stock del producto
        product.setStock(currentStock - quantity);
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product);

        return inventoryTransactionRepository.save(transaction);
    }

    /**
     * Obtiene el historial de transacciones de un producto
     */
    public List<InventoryTransaction> getProductHistory(Long productId) {
        return inventoryTransactionRepository.findByProductIdOrderByTransactionDateDesc(productId);
    }

    /**
     * Obtiene transacciones en un rango de fechas
     */
    public List<InventoryTransaction> getTransactionsByDateRange(LocalDateTime start, LocalDateTime end) {
        return inventoryTransactionRepository.findByTransactionDateBetween(start, end);
    }

    /**
     * Obtiene el stock actual calculado desde las transacciones
     */
    public Integer getCalculatedStock(Long productId) {
        Integer totalIn = inventoryTransactionRepository.getTotalInQuantityByProductId(productId);
        Integer totalOut = inventoryTransactionRepository.getTotalOutQuantityByProductId(productId);
        
        totalIn = totalIn != null ? totalIn : 0;
        totalOut = totalOut != null ? totalOut : 0;
        
        return totalIn - totalOut;
    }
}
