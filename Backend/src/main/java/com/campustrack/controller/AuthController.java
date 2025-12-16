package com.campustrack.controller;

import com.campustrack.entity.User;
import com.campustrack.entity.PasswordResetToken;
import com.campustrack.repository.UserRepository;
import com.campustrack.repository.PasswordResetTokenRepository;
import com.campustrack.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ✅ Register (Signup)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        String fullName = request.get("fullName");
        String contactNumber = request.get("contactNumber");
        String email = request.get("email");
        String password = request.get("password");
        String role = request.get("role");
        String department = request.get("department");

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(400).body(Map.of("message", "Email already exists"));
        }

        User user = new User();
        user.setFullName(fullName);
        user.setContactNumber(contactNumber);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // hash password
        user.setRole(role);
        user.setDepartment(department);

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            User user = userOpt.get();

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful!");
            response.put("userId", user.getId());          // ✅ add this
            response.put("fullName", user.getFullName());
            response.put("role", user.getRole());
            response.put("department", user.getDepartment());

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }


    // ✅ Forgot Password
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = UUID.randomUUID().toString();

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUser(user);
            resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
            tokenRepository.save(resetToken);

            // ✅ Make sure this matches your frontend port (5173)
            String resetLink = "http://localhost:5173/reset-password?token=" + token;
            emailService.sendEmail(
                    email,
                    "Password Reset Request",
                    "Click the link to reset your password: " + resetLink
            );

            return ResponseEntity.ok(Map.of("message", "Password reset link sent to email!"));
        }
        return ResponseEntity.status(404).body(Map.of("message", "User not found"));
    }

    // ✅ Reset Password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token,
                                           @RequestBody Map<String, String> request) {
        String newPassword = request.get("password");

        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isPresent() && tokenOpt.get().getExpiryDate().isAfter(LocalDateTime.now())) {
            User user = tokenOpt.get().getUser();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "Password reset successful!"));
        }
        return ResponseEntity.status(400).body(Map.of("message", "Invalid or expired token"));
    }
}
