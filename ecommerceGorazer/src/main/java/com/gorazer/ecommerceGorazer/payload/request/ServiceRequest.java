package com.gorazer.ecommerceGorazer.payload.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ServiceRequest {
    private String title;
    private String description;
    private BigDecimal price;
    private String icon;
    private Boolean active;
}
