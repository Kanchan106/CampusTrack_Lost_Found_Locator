package com.campustrack.controller;

import com.campustrack.dto.MatchBundle;
import com.campustrack.dto.MatchResult;
import com.campustrack.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MatchController {

    @Autowired
    private MatchService matchService;

    // 🔹 Used by MyMatchesPage.jsx
    @GetMapping("/api/items/my-matches/{reporterId}")
    public ResponseEntity<List<MatchBundle>> getMyMatches(@PathVariable Long reporterId) {
        return ResponseEntity.ok(matchService.getMatchesForReporter(reporterId));
    }

    // 🔹 Used by SuggestedMatchesModal.jsx
    @GetMapping("/api/items/{itemId}/matches")
    public ResponseEntity<List<MatchResult>> getMatchesForItem(@PathVariable Long itemId) {
        return ResponseEntity.ok(matchService.findMatchesForItem(itemId));
    }
}
