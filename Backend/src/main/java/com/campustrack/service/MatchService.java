package com.campustrack.service;

import com.campustrack.dto.MatchDTO;
import com.campustrack.dto.MatchBundle;
import com.campustrack.dto.MatchResult;
import com.campustrack.entity.Item;
import com.campustrack.entity.Match;
import com.campustrack.repository.ItemRepository;
import com.campustrack.repository.MatchRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MatchService {

    private final ItemRepository itemRepository;
    private final MatchRepository matchRepository;

    public MatchService(ItemRepository itemRepository, MatchRepository matchRepository) {
        this.itemRepository = itemRepository;
        this.matchRepository = matchRepository;
    }

    // 🔹 Used by SuggestedMatchesModal
    public List<MatchResult> findMatchesForItem(Long itemId) {
        Item source = itemRepository.findById(itemId).orElse(null);
        if (source == null) return new ArrayList<>();

        List<Item> candidates = itemRepository.findAll();
        List<MatchResult> results = new ArrayList<>();

        for (Item target : candidates) {
            if (target.getId().equals(source.getId())) continue;

            // ✅ Null-safe status comparison
            if (source.getStatus() != null &&
                    source.getStatus().equalsIgnoreCase(target.getStatus())) {
                continue;
            }

            double score = computeSimilarity(source, target);
            if (score > 0.5) {
                results.add(new MatchResult(target, score));
            }
        }

        return results;
    }

    // 🔹 Used by MyMatchesPage.jsx
    public List<MatchBundle> getMatchesForReporter(Long reporterId) {
        List<Item> reportedItems = itemRepository.findByReporterId(reporterId);
        List<MatchBundle> bundles = new ArrayList<>();

        for (Item item : reportedItems) {
            List<MatchResult> matches = findMatchesForItem(item.getId());
            bundles.add(new MatchBundle(item, matches));
        }

        return bundles;
    }

    private double computeSimilarity(Item a, Item b) {
        double score = 0.0;

        // ✅ Null-safe comparisons
        if (a.getCategory() != null && b.getCategory() != null &&
                a.getCategory().equalsIgnoreCase(b.getCategory())) {
            score += 0.3;
        }

        if (a.getLocation() != null && b.getLocation() != null &&
                a.getLocation().equalsIgnoreCase(b.getLocation())) {
            score += 0.2;
        }

        if (a.getDescription() != null && b.getDescription() != null) {
            String[] aWords = a.getDescription().toLowerCase().split("\\s+");
            String[] bWords = b.getDescription().toLowerCase().split("\\s+");

            int matchCount = 0;
            for (String word : aWords) {
                for (String other : bWords) {
                    if (word.equals(other)) matchCount++;
                }
            }

            double descScore = Math.min(0.5, matchCount * 0.05);
            score += descScore;
        }

        return score;
    }

    // 🔹 Used by Admin Panel
    public List<MatchDTO> getAllMatchesForAdmin() {
        return matchRepository.findAll().stream()
                .map(match -> new MatchDTO(
                        match.getId(),
                        match.getLostItem() != null ? match.getLostItem().getName() : "—",
                        match.getFoundItem() != null ? match.getFoundItem().getName() : "—",
                        match.getScore(),
                        match.getStatus(),
                        match.getNotes()
                ))
                .toList();
    }
}