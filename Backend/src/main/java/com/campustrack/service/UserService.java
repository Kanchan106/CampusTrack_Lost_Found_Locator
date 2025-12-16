package com.campustrack.service;

import com.campustrack.entity.User;
import com.campustrack.entity.PasswordResetToken;
import com.campustrack.repository.UserRepository;
import com.campustrack.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ✅ Login
    public ResponseEntity<?> loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            User user = userOpt.get();
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful!",
                    "id", user.getId(),
                    "fullName", user.getFullName(),
                    "role", user.getRole()   // 🔹 send role back
            ));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    // ✅ Forgot Password
    public ResponseEntity<?> forgotPassword(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = UUID.randomUUID().toString();

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUser(user);
            resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
            tokenRepository.save(resetToken);

            String resetLink = "http://localhost:5174/reset-password?token=" + token;
            emailService.sendEmail(
                    email,
                    "Password Reset Request",
                    "Click the link to reset your password: " + resetLink
            );

            return ResponseEntity.ok("Password reset link sent to email!");
        }
        return ResponseEntity.status(404).body("User not found");
    }

    // ✅ Reset Password
    public ResponseEntity<?> resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isPresent() && tokenOpt.get().getExpiryDate().isAfter(LocalDateTime.now())) {
            User user = tokenOpt.get().getUser();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return ResponseEntity.ok("Password reset successful!");
        }
        return ResponseEntity.status(400).body("Invalid or expired token");
    }

}