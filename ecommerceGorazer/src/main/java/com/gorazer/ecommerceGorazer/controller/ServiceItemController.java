package com.gorazer.ecommerceGorazer.controller;

import com.gorazer.ecommerceGorazer.model.ServiceItem;
import com.gorazer.ecommerceGorazer.repository.ServiceItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ServiceItemController {

    @Autowired
    private ServiceItemRepository serviceItemRepository;

    @GetMapping("/services")
    public ResponseEntity<List<ServiceItem>> getServices() {
        return ResponseEntity.ok(serviceItemRepository.findByActiveTrue());
    }

    @PostMapping("/admin/services")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceItem> createService(@RequestBody ServiceItem serviceItem) {
        serviceItem.setId(null);
        return ResponseEntity.ok(serviceItemRepository.save(serviceItem));
    }

    @PutMapping("/admin/services/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceItem> updateService(@PathVariable Long id, @RequestBody ServiceItem serviceItem) {
        return serviceItemRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(serviceItem.getTitle());
                    existing.setDescription(serviceItem.getDescription());
                    existing.setIcon(serviceItem.getIcon());
                    existing.setActive(serviceItem.isActive());
                    return ResponseEntity.ok(serviceItemRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/services/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        if (!serviceItemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceItemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
