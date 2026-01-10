package com.gorazer.ecommerceGorazer.controller;

import com.gorazer.ecommerceGorazer.model.User;
import com.gorazer.ecommerceGorazer.model.VerificationToken;
import com.gorazer.ecommerceGorazer.payload.request.LoginRequest;
import com.gorazer.ecommerceGorazer.payload.request.SignupRequest;
import com.gorazer.ecommerceGorazer.payload.response.JwtResponse;
import com.gorazer.ecommerceGorazer.payload.response.MessageResponse;
import com.gorazer.ecommerceGorazer.repository.UserRepository;
import com.gorazer.ecommerceGorazer.repository.VerificationTokenRepository;
import com.gorazer.ecommerceGorazer.security.jwt.JwtUtils;
import com.gorazer.ecommerceGorazer.security.services.UserDetailsImpl;
import com.gorazer.ecommerceGorazer.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    VerificationTokenRepository tokenRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailService emailService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        
        // Optional: Check if user is verified before allowing full login, or allow login but limit access
         if (!userDetails.isEnabled()) {
             return ResponseEntity.badRequest().body(new MessageResponse("Error: User email is not verified."));
         }

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<String> roles = new HashSet<>();

        if (strRoles == null) {
            roles.add("ROLE_USER");
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        roles.add("ROLE_ADMIN");
                        break;
                    default:
                        roles.add("ROLE_USER");
                }
            });
        }

        user.setRoles(roles);
        user.setFullName(signUpRequest.getFullName());
        user.setAddress(signUpRequest.getAddress());
        userRepository.save(user);
        
        // Generate Token
        VerificationToken token = new VerificationToken(user);
        tokenRepository.save(token);
        
        // Send Email
        try {
            emailService.sendVerificationEmail(user.getEmail(), token.getToken());
        } catch (Exception e) {
            // Log error, but don't fail registration completely? Or fail?
            // For now, let's just log print.
            System.out.println("Error sending email: " + e.getMessage());
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully! Please check your email for verification."));
    }
    
    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam("token") String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);
        
        if (verificationToken == null) {
             return ResponseEntity.badRequest().body(new MessageResponse("Invalid token."));
        }
        
        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Token expired."));
        }
        
        User user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        
        return ResponseEntity.ok(new MessageResponse("Account verified successfully!"));
    }
}
