package com.gorazer.ecommerceGorazer.repository;

import com.gorazer.ecommerceGorazer.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();
}
