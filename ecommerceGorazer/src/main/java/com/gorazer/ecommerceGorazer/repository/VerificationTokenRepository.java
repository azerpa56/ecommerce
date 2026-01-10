package com.gorazer.ecommerceGorazer.repository;

import com.gorazer.ecommerceGorazer.model.VerificationToken;
import com.gorazer.ecommerceGorazer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);
    VerificationToken findByUser(User user);
}
