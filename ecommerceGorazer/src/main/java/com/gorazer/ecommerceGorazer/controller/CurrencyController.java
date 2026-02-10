package com.gorazer.ecommerceGorazer.controller;

import com.gorazer.ecommerceGorazer.model.CurrencyRate;
import com.gorazer.ecommerceGorazer.payload.response.ConversionResponse;
import com.gorazer.ecommerceGorazer.payload.response.CurrencyRateResponse;
import com.gorazer.ecommerceGorazer.payload.response.MessageResponse;
import com.gorazer.ecommerceGorazer.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

@RestController
@RequestMapping("/api/currency")
@CrossOrigin(origins = "*")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    /**
     * Obtener la tasa actual del BCV
     */
    @GetMapping("/bcv")
    public ResponseEntity<CurrencyRateResponse> getBcvRate() {
        BigDecimal rate = currencyService.getCurrentRate();
        Optional<CurrencyRate> rateInfo = currencyService.getCurrentRateInfo();
        
        if (rateInfo.isPresent()) {
            CurrencyRate cr = rateInfo.get();
            return ResponseEntity.ok(new CurrencyRateResponse(
                cr.getCurrency(),
                cr.getRate(),
                cr.getSource(),
                cr.getLastUpdated()
            ));
        }
        
        return ResponseEntity.ok(new CurrencyRateResponse(
            "USD_BS",
            rate,
            "BCV",
            java.time.LocalDateTime.now()
        ));
    }

    /**
     * Forzar actualización desde el BCV
     */
    @PostMapping("/bcv/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> forceUpdateBcv() {
        try {
            BigDecimal rate = currencyService.forceUpdateFromBcv();
            return ResponseEntity.ok(new MessageResponse("Tasa actualizada: " + rate));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error al actualizar tasa: " + e.getMessage()));
        }
    }

    /**
     * Convertir USD a BS
     */
    @GetMapping("/convert/usd-to-bs")
    public ResponseEntity<ConversionResponse> convertUsdToBs(@RequestParam BigDecimal amount) {
        BigDecimal rate = currencyService.getCurrentRate();
        BigDecimal converted = currencyService.convertUsdToBs(amount);
        
        return ResponseEntity.ok(new ConversionResponse(
            amount,
            "USD",
            "BS",
            converted,
            rate
        ));
    }

    /**
     * Convertir BS a USD
     */
    @GetMapping("/convert/bs-to-usd")
    public ResponseEntity<ConversionResponse> convertBsToUsd(@RequestParam BigDecimal amount) {
        BigDecimal rate = currencyService.getCurrentRate();
        BigDecimal converted = currencyService.convertBsToUsd(amount);
        
        return ResponseEntity.ok(new ConversionResponse(
            amount,
            "BS",
            "USD",
            converted,
            rate
        ));
    }

    /**
     * Actualizar tasa manualmente (solo admin)
     */
    @PostMapping("/admin/rate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> updateRateManually(
            @RequestParam BigDecimal rate,
            @RequestParam(required = false) String source) {
        try {
            currencyService.updateRate(rate, source);
            return ResponseEntity.ok(new MessageResponse("Tasa actualizada exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}
