package com.gorazer.ecommerceGorazer.payload.response;

import com.gorazer.ecommerceGorazer.model.Order;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private BigDecimal totalAmount;
    private String status;
    private String paymentIntentId;
    private List<OrderItemResponse> items;
    private LocalDateTime createdAt;

    @Data
    @AllArgsConstructor
    public static class OrderItemResponse {
        private Long id;
        private String productName;
        private BigDecimal price;
        private Integer quantity;
    }
}
