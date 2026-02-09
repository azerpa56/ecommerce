package com.gorazer.ecommerceGorazer.payload.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequest {
    private BigDecimal totalAmount;
    private String paymentIntentId;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long productId;
        private String productName;
        private BigDecimal price;
        private Integer quantity;
    }
}
