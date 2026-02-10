package com.gorazer.ecommerceGorazer.payload.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal costPrice;
    private BigDecimal salePrice;
    private String category;
    private Integer stock;
    private Integer alertStock;
    private Boolean isFeatured;
    private Boolean active;
}
