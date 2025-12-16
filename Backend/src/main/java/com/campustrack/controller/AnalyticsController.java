package com.campustrack.controller;

import com.campustrack.repository.ItemRepository;
import com.campustrack.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AnalyticsController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private MatchRepository matchRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(@RequestHeader(value = "X-ROLE", required = false) String role) {
        if (role == null || !role.equalsIgnoreCase("Admin")) {
            return ResponseEntity.status(403).build();
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalReports", itemRepository.count());
        stats.put("lostCount", itemRepository.findByStatus("Lost").size());
        stats.put("foundCount", itemRepository.findByStatus("Found").size());
        stats.put("matchedCount", matchRepository.count());
        stats.put("resolvedCount", matchRepository.findAll().stream()
                .filter(m -> m.getScore() >= 0.8) // example: resolved if confidence ≥ 80%
                .count());

        return ResponseEntity.ok(stats);
    }
}
