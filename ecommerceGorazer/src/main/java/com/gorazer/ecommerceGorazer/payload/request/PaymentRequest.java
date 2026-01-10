package com.gorazer.ecommerceGorazer.payload.request;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long amount; // in cents
    private String currency; // "usd", "eur", etc.
    private String description;
}
