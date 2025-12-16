package com.campustrack.controller;

import com.campustrack.dto.MatchDTO;
import com.campustrack.service.MatchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/matches")
@CrossOrigin
public class AdminMatchController {

    private final MatchService matchService;

    public AdminMatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public List<MatchDTO> getAllMatches() {
        return matchService.getAllMatchesForAdmin();
    }
}