package com.gorazer.ecommerceGorazer.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "sales_reports", schema = "ecommerce")
@Data
@NoArgsConstructor
public class SalesReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "report_date", nullable = false)
    private LocalDate reportDate;

    @Column(name = "total_sales", nullable = false, precision = 20, scale = 2)
    private BigDecimal totalSales = BigDecimal.ZERO;

    @Column(name = "total_cost", nullable = false, precision = 20, scale = 2)
    private BigDecimal totalCost = BigDecimal.ZERO;

    @Column(name = "profit", nullable = false, precision = 20, scale = 2)
    private BigDecimal profit = BigDecimal.ZERO;

    @Column(name = "products_sold")
    private Integer productsSold = 0;

    @Column(name = "orders_count")
    private Integer ordersCount = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
