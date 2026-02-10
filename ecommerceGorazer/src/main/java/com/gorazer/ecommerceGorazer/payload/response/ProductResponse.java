package com.gorazer.ecommerceGorazer.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal costPrice;
    private BigDecimal salePrice;
    private String category;
    private Integer stock;
    private Integer alertStock;
    private boolean isFeatured;
    private boolean isNew;
    private boolean active;
    private List<ProductImageResponse> images;
}
