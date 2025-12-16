package com.campustrack.repository;

import com.campustrack.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    // ✅ Find all matches for a given item
    List<Match> findByItemId(Long itemId);

    // ✅ (Optional) Find all matches created by a specific user
    List<Match> findByUserId(Long userId);
}
