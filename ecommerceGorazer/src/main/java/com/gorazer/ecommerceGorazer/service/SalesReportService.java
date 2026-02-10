package com.gorazer.ecommerceGorazer.service;

import com.gorazer.ecommerceGorazer.model.InventoryTransaction;
import com.gorazer.ecommerceGorazer.model.SalesReport;
import com.gorazer.ecommerceGorazer.repository.InventoryTransactionRepository;
import com.gorazer.ecommerceGorazer.repository.SalesReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SalesReportService {

    @Autowired
    private SalesReportRepository salesReportRepository;

    @Autowired
    private InventoryTransactionRepository inventoryTransactionRepository;

    /**
     * Genera o actualiza el reporte de ventas para una fecha específica
     */
    public SalesReport generateDailyReport(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        // Obtener todas las transacciones de salida (ventas) del día
        List<InventoryTransaction> sales = inventoryTransactionRepository
                .findByTransactionDateBetween(startOfDay, endOfDay)
                .stream()
                .filter(t -> t.getTransactionType() == InventoryTransaction.TransactionType.OUT)
                .toList();

        BigDecimal totalSales = BigDecimal.ZERO;
        BigDecimal totalCost = BigDecimal.ZERO;
        int productsSold = 0;

        for (InventoryTransaction sale : sales) {
            BigDecimal saleAmount = sale.getSalePrice().multiply(new BigDecimal(sale.getQuantity()));
            BigDecimal costAmount = sale.getCostPrice().multiply(new BigDecimal(sale.getQuantity()));

            totalSales = totalSales.add(saleAmount);
            totalCost = totalCost.add(costAmount);
            productsSold += sale.getQuantity();
        }

        BigDecimal profit = totalSales.subtract(totalCost);

        // Buscar o crear reporte
        SalesReport report = salesReportRepository.findByReportDate(date)
                .orElse(new SalesReport());

        report.setReportDate(date);
        report.setTotalSales(totalSales);
        report.setTotalCost(totalCost);
        report.setProfit(profit);
        report.setProductsSold(productsSold);
        report.setOrdersCount(sales.size());
        report.setUpdatedAt(LocalDateTime.now());

        if (report.getId() == null) {
            report.setCreatedAt(LocalDateTime.now());
        }

        return salesReportRepository.save(report);
    }

    /**
     * Obtiene reporte de ganancias por rango de fechas
     */
    public Map<String, Object> getProfitReport(LocalDate startDate, LocalDate endDate) {
        List<SalesReport> reports = salesReportRepository
                .findByReportDateBetweenOrderByReportDateDesc(startDate, endDate);

        BigDecimal totalSales = BigDecimal.ZERO;
        BigDecimal totalCost = BigDecimal.ZERO;
        BigDecimal totalProfit = BigDecimal.ZERO;
        int totalProductsSold = 0;
        int totalOrders = 0;

        for (SalesReport report : reports) {
            totalSales = totalSales.add(report.getTotalSales());
            totalCost = totalCost.add(report.getTotalCost());
            totalProfit = totalProfit.add(report.getProfit());
            totalProductsSold += report.getProductsSold();
            totalOrders += report.getOrdersCount();
        }

        Map<String, Object> result = new HashMap<>();
        result.put("startDate", startDate);
        result.put("endDate", endDate);
        result.put("totalSales", totalSales);
        result.put("totalCost", totalCost);
        result.put("totalProfit", totalProfit);
        result.put("totalProductsSold", totalProductsSold);
        result.put("totalOrders", totalOrders);
        result.put("dailyReports", reports);

        return result;
    }

    /**
     * Obtiene resumen de ganancias por producto
     */
    public List<Map<String, Object>> getProfitByProduct(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.plusDays(1).atStartOfDay();

        List<InventoryTransaction> sales = inventoryTransactionRepository
                .findByTransactionDateBetween(start, end)
                .stream()
                .filter(t -> t.getTransactionType() == InventoryTransaction.TransactionType.OUT)
                .toList();

        Map<Long, Map<String, Object>> productProfits = new HashMap<>();

        for (InventoryTransaction sale : sales) {
            Long productId = sale.getProduct().getId();
            
            BigDecimal saleAmount = sale.getSalePrice().multiply(new BigDecimal(sale.getQuantity()));
            BigDecimal costAmount = sale.getCostPrice().multiply(new BigDecimal(sale.getQuantity()));
            BigDecimal profit = saleAmount.subtract(costAmount);

            if (!productProfits.containsKey(productId)) {
                Map<String, Object> productData = new HashMap<>();
                productData.put("productId", productId);
                productData.put("productName", sale.getProduct().getName());
                productData.put("totalSales", BigDecimal.ZERO);
                productData.put("totalCost", BigDecimal.ZERO);
                productData.put("totalProfit", BigDecimal.ZERO);
                productData.put("quantitySold", 0);
                productProfits.put(productId, productData);
            }

            Map<String, Object> data = productProfits.get(productId);
            data.put("totalSales", ((BigDecimal) data.get("totalSales")).add(saleAmount));
            data.put("totalCost", ((BigDecimal) data.get("totalCost")).add(costAmount));
            data.put("totalProfit", ((BigDecimal) data.get("totalProfit")).add(profit));
            data.put("quantitySold", (Integer) data.get("quantitySold") + sale.getQuantity());
        }

        return productProfits.values().stream().toList();
    }

    /**
     * Obtiene el resumen general de ventas
     */
    public Map<String, Object> getSalesSummary() {
        LocalDate today = LocalDate.now();
        LocalDate thirtyDaysAgo = today.minusDays(30);

        return getProfitReport(thirtyDaysAgo, today);
    }
}
