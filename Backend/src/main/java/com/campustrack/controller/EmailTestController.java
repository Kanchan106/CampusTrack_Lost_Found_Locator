package com.campustrack.controller;

import com.campustrack.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send-test-email")
    public ResponseEntity<String> sendTestEmail() {
        emailService.sendEmail(
                "yourgmail@gmail.com",   // replace with your email
                "CampusTrack Test Email",
                "Hello Rashmi! 🎉 This is a test email from your CampusTrack backend."
        );
        return ResponseEntity.ok("Test email sent successfully!");
    }
}
