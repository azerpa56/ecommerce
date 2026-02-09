package com.gorazer.ecommerceGorazer.repository;

import com.gorazer.ecommerceGorazer.model.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
    List<ServiceItem> findByActiveTrue();
}
