package com.gorazer.ecommerceGorazer.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ServiceResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String icon;
    private boolean active;
}
