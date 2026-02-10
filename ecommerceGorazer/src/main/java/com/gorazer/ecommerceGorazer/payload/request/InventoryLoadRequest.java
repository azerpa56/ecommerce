package com.gorazer.ecommerceGorazer.payload.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InventoryLoadRequest {
    private Long productId;
    private Integer quantity;
    private BigDecimal costPrice;
    private BigDecimal salePrice;
    private String notes;
}
