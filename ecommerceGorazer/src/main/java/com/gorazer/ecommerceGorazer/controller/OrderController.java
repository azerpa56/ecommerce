package com.gorazer.ecommerceGorazer.controller;

import com.gorazer.ecommerceGorazer.model.Order;
import com.gorazer.ecommerceGorazer.model.OrderItem;
import com.gorazer.ecommerceGorazer.model.Product;
import com.gorazer.ecommerceGorazer.model.User;
import com.gorazer.ecommerceGorazer.payload.request.OrderRequest;
import com.gorazer.ecommerceGorazer.payload.response.MessageResponse;
import com.gorazer.ecommerceGorazer.payload.response.OrderResponse;
import com.gorazer.ecommerceGorazer.repository.OrderRepository;
import com.gorazer.ecommerceGorazer.repository.ProductRepository;
import com.gorazer.ecommerceGorazer.repository.UserRepository;
import com.gorazer.ecommerceGorazer.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request, @RequestHeader("Authorization") String token) {
        try {
            String jwt = token.replace("Bearer ", "");
            String email = jwtUtils.getUserNameFromJwtToken(jwt);
            
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            Order order = new Order();
            order.setUser(user);
            order.setTotalAmount(request.getTotalAmount());
            order.setPaymentIntentId(request.getPaymentIntentId());
            order.setStatus(Order.OrderStatus.PENDING);
            order.setCreatedAt(LocalDateTime.now());
            order.setUpdatedAt(LocalDateTime.now());

            for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
                OrderItem item = new OrderItem();
                item.setOrder(order);
                item.setProductName(itemReq.getProductName());
                item.setPrice(itemReq.getPrice());
                item.setQuantity(itemReq.getQuantity());
                
                if (itemReq.getProductId() != null) {
                    productRepository.findById(itemReq.getProductId())
                            .ifPresent(item::setProduct);
                }
                
                order.getItems().add(item);
            }

            Order saved = orderRepository.save(order);
            return ResponseEntity.ok(toResponse(saved));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error al crear orden: " + e.getMessage()));
        }
    }

    @GetMapping("/my-orders")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getMyOrders(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.replace("Bearer ", "");
            String email = jwtUtils.getUserNameFromJwtToken(jwt);
            
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
            List<OrderResponse> response = orders.stream().map(this::toResponse).collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error al obtener ordenes: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        return orderRepository.findById(id)
                .map(order -> {
                    try {
                        order.setStatus(Order.OrderStatus.valueOf(status.toUpperCase()));
                        order.setUpdatedAt(LocalDateTime.now());
                        Order saved = orderRepository.save(order);
                        return ResponseEntity.ok(toResponse(saved));
                    } catch (IllegalArgumentException e) {
                        return ResponseEntity.badRequest().body(new MessageResponse("Estado invalido"));
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private OrderResponse toResponse(Order order) {
        List<OrderResponse.OrderItemResponse> items = order.getItems().stream()
                .map(item -> new OrderResponse.OrderItemResponse(
                        item.getId(),
                        item.getProductName(),
                        item.getPrice(),
                        item.getQuantity()
                ))
                .collect(Collectors.toList());

        return new OrderResponse(
                order.getId(),
                order.getTotalAmount(),
                order.getStatus().name(),
                order.getPaymentIntentId(),
                items,
                order.getCreatedAt()
        );
    }
}
