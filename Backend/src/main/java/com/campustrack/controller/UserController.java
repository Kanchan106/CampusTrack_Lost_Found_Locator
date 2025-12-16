package com.campustrack.controller;

import com.campustrack.entity.User;
import com.campustrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")  // all admin endpoints start here
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 🔹 Get all users (for Admin Panel)
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestHeader(value = "X-ROLE", required = false) String role) {
        // Simple role guard
        if (role == null || !role.equalsIgnoreCase("Admin")) {
            return ResponseEntity.status(403).build();
        }
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // 🔹 Get a single user by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id,
                                            @RequestHeader(value = "X-ROLE", required = false) String role) {
        if (role == null || !role.equalsIgnoreCase("Admin")) {
            return ResponseEntity.status(403).build();
        }
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Delete a user (optional for admin)
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id,
                                           @RequestHeader(value = "X-ROLE", required = false) String role) {
        if (role == null || !role.equalsIgnoreCase("Admin")) {
            return ResponseEntity.status(403).build();
        }
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
