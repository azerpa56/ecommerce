package com.gorazer.ecommerceGorazer.service;

import com.gorazer.ecommerceGorazer.model.CurrencyRate;
import com.gorazer.ecommerceGorazer.repository.CurrencyRateRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class BcvScraperService {

    private static final Logger logger = LoggerFactory.getLogger(BcvScraperService.class);
    private static final String BCV_URL = "https://www.bcv.org.ve/";
    private static final String CURRENCY_CODE = "USD_BS";
    private static final String SOURCE = "BCV";

    @Autowired
    private CurrencyRateRepository currencyRateRepository;

    /**
     * Obtiene la tasa de cambio del BCV mediante web scraping
     * Cache de 1 hora para no sobrecargar el sitio
     */
    @Cacheable(value = "bcvRate", unless = "#result == null")
    public BigDecimal fetchBcvRate() {
        try {
            logger.info("Iniciando scraping del BCV...");
            
            Document doc = Jsoup.connect(BCV_URL)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(10000)
                    .get();

            // Buscar el div con la clase específica que contiene la tasa
            Elements rateElements = doc.select("div.col-sm-6.col-xs-6.centrado strong");
            
            if (!rateElements.isEmpty()) {
                String rateText = rateElements.first().text().trim();
                // Remover espacios y convertir comas a puntos
                rateText = rateText.replace(".", "").replace(",", ".").trim();
                
                BigDecimal rate = new BigDecimal(rateText);
                logger.info("Tasa BCV obtenida exitosamente: {}", rate);
                
                // Guardar en la base de datos
                saveOrUpdateRate(rate);
                
                return rate;
            } else {
                logger.warn("No se pudo encontrar la tasa del dólar en la página del BCV");
                return getFallbackRate();
            }
            
        } catch (Exception e) {
            logger.error("Error al obtener la tasa del BCV: {}", e.getMessage(), e);
            return getFallbackRate();
        }
    }

    /**
     * Guarda o actualiza la tasa en la base de datos
     */
    private void saveOrUpdateRate(BigDecimal rate) {
        try {
            CurrencyRate currencyRate = currencyRateRepository.findByCurrency(CURRENCY_CODE)
                    .orElse(new CurrencyRate());
            
            currencyRate.setCurrency(CURRENCY_CODE);
            currencyRate.setRate(rate);
            currencyRate.setSource(SOURCE);
            currencyRate.setLastUpdated(LocalDateTime.now());
            
            if (currencyRate.getId() == null) {
                currencyRate.setCreatedAt(LocalDateTime.now());
            }
            
            currencyRateRepository.save(currencyRate);
            logger.info("Tasa guardada en la base de datos: {}", rate);
        } catch (Exception e) {
            logger.error("Error al guardar la tasa en la base de datos: {}", e.getMessage());
        }
    }

    /**
     * Obtiene la tasa de fallback desde la base de datos
     */
    private BigDecimal getFallbackRate() {
        try {
            return currencyRateRepository.findByCurrency(CURRENCY_CODE)
                    .map(CurrencyRate::getRate)
                    .orElse(new BigDecimal("40.00")); // Valor por defecto si no hay nada
        } catch (Exception e) {
            logger.error("Error al obtener tasa de fallback: {}", e.getMessage());
            return new BigDecimal("40.00");
        }
    }

    /**
     * Tarea programada para actualizar la tasa cada 6 horas
     * Cron: 0 0 asterisco-barra-6 * * * = Cada 6 horas
     */
    @Scheduled(cron = "0 0 */6 * * *")
    public void scheduleRateUpdate() {
        logger.info("Ejecutando actualización programada de la tasa BCV");
        fetchBcvRate();
    }

    /**
     * Obtiene la última tasa guardada en la base de datos
     */
    public BigDecimal getLatestRate() {
        return currencyRateRepository.findByCurrency(CURRENCY_CODE)
                .map(CurrencyRate::getRate)
                .orElseGet(this::fetchBcvRate);
    }
}
