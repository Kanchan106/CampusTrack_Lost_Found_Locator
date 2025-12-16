package com.campustrack.repository;

import com.campustrack.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    // 🔹 General listings
    List<Item> findAllByOrderByDateDesc();

    // 🔹 Filter by status (LOST/FOUND)
    List<Item> findByStatusOrderByDateDesc(String status);
    List<Item> findByStatus(String status);

    // 🔹 Filter by category
    List<Item> findByCategoryOrderByDateDesc(String category);

    // 🔹 Filter by reporter
    List<Item> findByReporterId(Long reporterId);
    List<Item> findByReporterIdOrderByDateDesc(Long reporterId);

    // 🔹 Per-user counts
    long countByReporterIdAndStatus(Long reporterId, String status);

    // 🔹 Global counts
    long countByStatus(String status);
}
