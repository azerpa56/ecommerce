package com.gorazer.ecommerceGorazer.repository;

import com.gorazer.ecommerceGorazer.model.SalesReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SalesReportRepository extends JpaRepository<SalesReport, Long> {
    
    Optional<SalesReport> findByReportDate(LocalDate date);
    
    List<SalesReport> findByReportDateBetweenOrderByReportDateDesc(LocalDate start, LocalDate end);
    
    @Query("SELECT SUM(sr.profit) FROM SalesReport sr WHERE sr.reportDate BETWEEN :start AND :end")
    Optional<java.math.BigDecimal> getTotalProfitBetween(@Param("start") LocalDate start, @Param("end") LocalDate end);
}
