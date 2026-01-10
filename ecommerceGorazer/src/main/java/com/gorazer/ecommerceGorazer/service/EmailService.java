package com.gorazer.ecommerceGorazer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Verificación de Correo - Gorazer Ecommerce");
        message.setText("Para confirmar tu cuenta, por favor ingresa el siguiente token en la aplicación: " + token);
        // In a real app, this would be a link or HTML email
        mailSender.send(message);
    }
}
