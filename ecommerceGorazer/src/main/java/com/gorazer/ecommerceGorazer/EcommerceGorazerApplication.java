package com.gorazer.ecommerceGorazer;

import com.gorazer.ecommerceGorazer.model.User;
import com.gorazer.ecommerceGorazer.repository.ProductRepository;
import com.gorazer.ecommerceGorazer.repository.ServiceItemRepository;
import com.gorazer.ecommerceGorazer.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableCaching
public class EcommerceGorazerApplication {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ServiceItemRepository serviceItemRepository;

	public static void main(String[] args) {
		SpringApplication.run(EcommerceGorazerApplication.class, args);
	}

	@PostConstruct
	public void init() {
		System.out.println("Application started successfully!");
		
		// Limpiar productos y servicios existentes
		productRepository.deleteAll();
		serviceItemRepository.deleteAll();
		System.out.println("Base de datos limpiada: productos y servicios eliminados");
		
		// Crear usuario administrador por defecto si no existe
		String adminEmail = "admin@gorazer.com";
		if (!userRepository.existsByEmail(adminEmail)) {
			User admin = new User();
			admin.setEmail(adminEmail);
			admin.setPassword(passwordEncoder.encode("admin123"));
			admin.setFullName("Administrador");
			admin.setEnabled(true);
			
			Set<String> roles = new HashSet<>();
			roles.add("ROLE_ADMIN");
			admin.setRoles(roles);
			
			userRepository.save(admin);
			System.out.println("Usuario administrador creado:");
			System.out.println("Email: " + adminEmail);
			System.out.println("Password: admin123");
		} else {
			System.out.println("Usuario administrador ya existe");
		}
	}

}
