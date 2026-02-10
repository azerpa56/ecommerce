package com.gorazer.ecommerceGorazer.repository;

import com.gorazer.ecommerceGorazer.model.CurrencyRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CurrencyRateRepository extends JpaRepository<CurrencyRate, Long> {
    
    Optional<CurrencyRate> findByCurrency(String currency);
    
    Optional<CurrencyRate> findFirstByOrderByLastUpdatedDesc();
}
