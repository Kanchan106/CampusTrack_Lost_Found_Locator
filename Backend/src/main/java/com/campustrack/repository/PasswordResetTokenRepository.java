// src/main/java/com/campustrack/repository/PasswordResetTokenRepository.java
package com.campustrack.repository;

import com.campustrack.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}