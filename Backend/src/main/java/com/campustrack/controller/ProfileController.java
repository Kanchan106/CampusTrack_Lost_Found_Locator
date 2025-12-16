package com.campustrack.controller;

import com.campustrack.entity.User;
import com.campustrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Get profile by userId
    @GetMapping
    public ResponseEntity<?> getProfile(@RequestParam Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
    }

    // ✅ Update profile fields
    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestParam Long userId,
                                           @RequestBody Map<String, String> updates) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setFullName(updates.getOrDefault("fullName", user.getFullName()));
            user.setContactNumber(updates.getOrDefault("contactNumber", user.getContactNumber()));
            user.setDepartment(updates.getOrDefault("department", user.getDepartment()));
            user.setEmail(updates.getOrDefault("email", user.getEmail()));
            user.setRole(updates.getOrDefault("role", user.getRole()));
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Profile updated successfully!"));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
    }
}
