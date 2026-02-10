package com.gorazer.ecommerceGorazer.controller;

import com.gorazer.ecommerceGorazer.model.ServiceItem;
import com.gorazer.ecommerceGorazer.payload.request.ServiceRequest;
import com.gorazer.ecommerceGorazer.payload.response.ServiceResponse;
import com.gorazer.ecommerceGorazer.repository.ServiceItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ServiceItemController {

    @Autowired
    private ServiceItemRepository serviceItemRepository;

    @GetMapping("/services")
    public ResponseEntity<List<ServiceResponse>> getServices() {
        List<ServiceItem> services = serviceItemRepository.findByActiveTrue();
        return ResponseEntity.ok(services.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<ServiceResponse> getServiceById(@PathVariable Long id) {
        return serviceItemRepository.findById(id)
                .map(service -> ResponseEntity.ok(toResponse(service)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/admin/services")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceResponse> createService(@RequestBody ServiceRequest request) {
        ServiceItem serviceItem = new ServiceItem();
        serviceItem.setTitle(request.getTitle());
        serviceItem.setDescription(request.getDescription());
        serviceItem.setPrice(request.getPrice());
        serviceItem.setIcon(request.getIcon());
        serviceItem.setActive(request.getActive() == null || request.getActive());
        serviceItem.setCreatedAt(LocalDateTime.now());
        serviceItem.setUpdatedAt(LocalDateTime.now());
        ServiceItem saved = serviceItemRepository.save(serviceItem);
        return ResponseEntity.ok(toResponse(saved));
    }

    @PutMapping("/admin/services/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceResponse> updateService(@PathVariable Long id, @RequestBody ServiceRequest request) {
        return serviceItemRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(request.getTitle());
                    existing.setDescription(request.getDescription());
                    if (request.getPrice() != null) {
                        existing.setPrice(request.getPrice());
                    }
                    existing.setIcon(request.getIcon());
                    if (request.getActive() != null) {
                        existing.setActive(request.getActive());
                    }
                    existing.setUpdatedAt(LocalDateTime.now());
                    ServiceItem saved = serviceItemRepository.save(existing);
                    return ResponseEntity.ok(toResponse(saved));
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

    private ServiceResponse toResponse(ServiceItem service) {
        return new ServiceResponse(
            service.getId(),
            service.getTitle(),
            service.getDescription(),
            service.getPrice(),
            service.getIcon(),
            service.isActive()
        );
    }
}
