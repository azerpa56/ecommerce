package com.gorazer.ecommerceGorazer.controller;

import com.gorazer.ecommerceGorazer.model.Product;
import com.gorazer.ecommerceGorazer.model.ProductImage;
import com.gorazer.ecommerceGorazer.payload.request.ImagePositionRequest;
import com.gorazer.ecommerceGorazer.payload.request.ProductRequest;
import com.gorazer.ecommerceGorazer.payload.response.ProductImageResponse;
import com.gorazer.ecommerceGorazer.payload.response.ProductResponse;
import com.gorazer.ecommerceGorazer.repository.ProductImageRepository;
import com.gorazer.ecommerceGorazer.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getProducts() {
        List<Product> products = productRepository.findByActiveTrue();
        return ResponseEntity.ok(products.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> ResponseEntity.ok(toResponse(product)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/admin/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setStock(request.getStock());
        product.setActive(request.getActive() == null || request.getActive());
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        Product saved = productRepository.save(product);
        return ResponseEntity.ok(toResponse(saved));
    }

    @PutMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
        return productRepository.findById(id)
                .map(existing -> {
                    existing.setName(request.getName());
                    existing.setDescription(request.getDescription());
                    existing.setPrice(request.getPrice());
                    existing.setCategory(request.getCategory());
                    existing.setStock(request.getStock());
                    if (request.getActive() != null) {
                        existing.setActive(request.getActive());
                    }
                    existing.setUpdatedAt(LocalDateTime.now());
                    Product saved = productRepository.save(existing);
                    return ResponseEntity.ok(toResponse(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/admin/products/{id}/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> uploadProductImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            ProductImage image = new ProductImage();
            image.setData(file.getBytes());
            image.setContentType(file.getContentType() == null ? "image/jpeg" : file.getContentType());
            image.setProduct(product);
            
            // Asignar la siguiente posición disponible
            int nextPosition = product.getImages().stream()
                    .mapToInt(img -> img.getPosition() == null ? 0 : img.getPosition())
                    .max()
                    .orElse(-1) + 1;
            image.setPosition(nextPosition);
            
            product.getImages().add(image);
            productImageRepository.save(image);
            Product saved = productRepository.save(product);
            return ResponseEntity.ok(toResponse(saved));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/admin/products/{id}/images/{imageId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> deleteProductImage(@PathVariable Long id, @PathVariable Long imageId) {
        return productRepository.findById(id)
                .map(product -> {
                    product.getImages().removeIf(image -> image.getId().equals(imageId));
                    productImageRepository.deleteById(imageId);
                    Product saved = productRepository.save(product);
                    return ResponseEntity.ok(toResponse(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/admin/products/{id}/images/reorder")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> reorderProductImages(@PathVariable Long id, @RequestBody List<ImagePositionRequest> positions) {
        return productRepository.findById(id)
                .map(product -> {
                    // Actualizar la posición de cada imagen
                    for (ImagePositionRequest positionRequest : positions) {
                        productImageRepository.findById(positionRequest.getImageId())
                                .ifPresent(image -> {
                                    image.setPosition(positionRequest.getPosition());
                                    productImageRepository.save(image);
                                });
                    }
                    // Refrescar el producto para obtener las imágenes actualizadas
                    Product refreshed = productRepository.findById(id).orElse(product);
                    return ResponseEntity.ok(toResponse(refreshed));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private ProductResponse toResponse(Product product) {
        List<ProductImageResponse> images = product.getImages() == null
                ? Collections.emptyList()
                : product.getImages().stream()
                .sorted((a, b) -> {
                    Integer posA = a.getPosition() == null ? 0 : a.getPosition();
                    Integer posB = b.getPosition() == null ? 0 : b.getPosition();
                    return posA.compareTo(posB);
                })
                .map(image -> {
                    String contentType = image.getContentType() == null ? "image/jpeg" : image.getContentType();
                    String base64 = Base64.getEncoder().encodeToString(image.getData());
                    String dataUrl = "data:" + contentType + ";base64," + base64;
                    return new ProductImageResponse(image.getId(), dataUrl);
                })
                .collect(Collectors.toList());

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory(),
                product.getStock(),
                product.isActive(),
                images
        );
    }
}
