package com.gorazer.ecommerceGorazer.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CurrencyRateResponse {
    private String currency;
    private BigDecimal rate;
    private String source;
    private LocalDateTime lastUpdated;
}
