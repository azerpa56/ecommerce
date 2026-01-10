package com.gorazer.ecommerceGorazer.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "verificaction_token", schema = "ecommerce")
@Data
@NoArgsConstructor
public class VerificationToken {

    private static final int EXPIRATION = 60 * 24; // 24 hours

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private LocalDateTime expiryDate;

    public VerificationToken(User user) {
        this.user = user;
        this.expiryDate = LocalDateTime.now().plusMinutes(EXPIRATION);
        this.token = UUID.randomUUID().toString();
    }
}
