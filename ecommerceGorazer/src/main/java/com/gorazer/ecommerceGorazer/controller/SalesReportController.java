package com.gorazer.ecommerceGorazer.controller;

import com.gorazer.ecommerceGorazer.service.SalesReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/reports")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class SalesReportController {

    @Autowired
    private SalesReportService salesReportService;

    /**
     * Obtener reporte de ganancias por rango de fechas
     */
    @GetMapping("/profits")
    public ResponseEntity<Map<String, Object>> getProfitReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        Map<String, Object> report = salesReportService.getProfitReport(startDate, endDate);
        return ResponseEntity.ok(report);
    }

    /**
     * Obtener resumen general de ventas (últimos 30 días)
     */
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSalesSummary() {
        Map<String, Object> summary = salesReportService.getSalesSummary();
        return ResponseEntity.ok(summary);
    }

    /**
     * Obtener ganancias por producto
     */
    @GetMapping("/by-product")
    public ResponseEntity<List<Map<String, Object>>> getProfitByProduct(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        List<Map<String, Object>> report = salesReportService.getProfitByProduct(startDate, endDate);
        return ResponseEntity.ok(report);
    }

    /**
     * Generar reporte diario manualmente
     */
    @PostMapping("/generate-daily")
    public ResponseEntity<?> generateDailyReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        try {
            salesReportService.generateDailyReport(date);
            return ResponseEntity.ok(Map.of("message", "Reporte generado exitosamente para " + date));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Error al generar reporte: " + e.getMessage()));
        }
    }
}
