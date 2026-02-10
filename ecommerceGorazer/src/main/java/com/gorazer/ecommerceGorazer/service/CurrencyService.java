package com.gorazer.ecommerceGorazer.service;

import com.gorazer.ecommerceGorazer.model.CurrencyRate;
import com.gorazer.ecommerceGorazer.repository.CurrencyRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CurrencyService {

    @Autowired
    private CurrencyRateRepository currencyRateRepository;

    @Autowired
    private BcvScraperService bcvScraperService;

    /**
     * Obtiene la tasa de cambio actual USD a BS
     */
    public BigDecimal getCurrentRate() {
        return bcvScraperService.getLatestRate();
    }

    /**
     * Convierte USD a BS
     */
    public BigDecimal convertUsdToBs(BigDecimal usdAmount) {
        BigDecimal rate = getCurrentRate();
        return usdAmount.multiply(rate).setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Convierte BS a USD
     */
    public BigDecimal convertBsToUsd(BigDecimal bsAmount) {
        BigDecimal rate = getCurrentRate();
        if (rate.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        return bsAmount.divide(rate, 2, RoundingMode.HALF_UP);
    }

    /**
     * Actualiza manualmente la tasa de cambio
     */
    public CurrencyRate updateRate(BigDecimal newRate, String source) {
        CurrencyRate currencyRate = currencyRateRepository.findByCurrency("USD_BS")
                .orElse(new CurrencyRate());
        
        currencyRate.setCurrency("USD_BS");
        currencyRate.setRate(newRate);
        currencyRate.setSource(source != null ? source : "MANUAL");
        currencyRate.setLastUpdated(LocalDateTime.now());
        
        if (currencyRate.getId() == null) {
            currencyRate.setCreatedAt(LocalDateTime.now());
        }
        
        return currencyRateRepository.save(currencyRate);
    }

    /**
     * Obtiene la información completa de la tasa actual
     */
    public Optional<CurrencyRate> getCurrentRateInfo() {
        return currencyRateRepository.findByCurrency("USD_BS");
    }

    /**
     * Fuerza una actualización de la tasa desde el BCV
     */
    public BigDecimal forceUpdateFromBcv() {
        return bcvScraperService.fetchBcvRate();
    }
}
