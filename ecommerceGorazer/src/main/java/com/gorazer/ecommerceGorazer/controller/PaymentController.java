package com.gorazer.ecommerceGorazer.controller;

import com.gorazer.ecommerceGorazer.payload.request.PaymentRequest;
import com.gorazer.ecommerceGorazer.payload.response.MessageResponse;
import com.gorazer.ecommerceGorazer.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // Adjust for production
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            PaymentIntent paymentIntent = paymentService.createPaymentIntent(
                    paymentRequest.getAmount(),
                    paymentRequest.getCurrency(),
                    paymentRequest.getDescription()
            );

            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", paymentIntent.getClientSecret());
            
            return ResponseEntity.ok(responseData);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error creating payment intent: " + e.getMessage()));
        }
    }
}
