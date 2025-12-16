package com.campustrack.controller;

import com.campustrack.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private ItemRepository itemRepository;

    // ✅ Per-user stats
    @GetMapping("/counts/{userId}")
    public Map<String, Long> getCounts(@PathVariable Long userId) {
        long lostCount = itemRepository.countByReporterIdAndStatus(userId, "LOST");
        long foundCount = itemRepository.countByReporterIdAndStatus(userId, "FOUND");
        long matchedCount = itemRepository.countByReporterIdAndStatus(userId, "MATCHED");

        Map<String, Long> response = new HashMap<>();
        response.put("lostCount", lostCount);
        response.put("foundCount", foundCount);
        response.put("matchedCount", matchedCount);

        return response;
    }

    @GetMapping("/counts/global")
    public Map<String, Long> getGlobalCounts() {
        long lostCount = itemRepository.countByStatus("LOST");
        long foundCount = itemRepository.countByStatus("FOUND");
        long matchedCount = itemRepository.countByStatus("MATCHED");

        Map<String, Long> response = new HashMap<>();
        response.put("lostCount", lostCount);
        response.put("foundCount", foundCount);
        response.put("matchedCount", matchedCount);

        return response;
    }

}