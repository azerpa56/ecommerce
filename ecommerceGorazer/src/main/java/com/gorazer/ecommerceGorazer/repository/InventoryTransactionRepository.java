package com.gorazer.ecommerceGorazer.repository;

import com.gorazer.ecommerceGorazer.model.InventoryTransaction;
import com.gorazer.ecommerceGorazer.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {
    
    List<InventoryTransaction> findByProduct(Product product);
    
    List<InventoryTransaction> findByProductIdOrderByTransactionDateDesc(Long productId);
    
    List<InventoryTransaction> findByTransactionDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(it.quantity) FROM InventoryTransaction it WHERE it.product.id = :productId AND it.transactionType = 'IN'")
    Integer getTotalInQuantityByProductId(@Param("productId") Long productId);
    
    @Query("SELECT SUM(it.quantity) FROM InventoryTransaction it WHERE it.product.id = :productId AND it.transactionType = 'OUT'")
    Integer getTotalOutQuantityByProductId(@Param("productId") Long productId);
}
