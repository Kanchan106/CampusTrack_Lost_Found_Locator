package com.campustrack.controller;

import com.campustrack.entity.Item;
import com.campustrack.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // 🔹 Create a new report (Lost/Found)
    @PostMapping("/report")
    public ResponseEntity<Item> createReport(@RequestBody Item item) {
        Item saved = itemService.save(item);
        return ResponseEntity.ok(saved);
    }

    // 🔹 Get all reports
    @GetMapping("/reports")
    public ResponseEntity<List<Item>> getAllReports() {
        return ResponseEntity.ok(itemService.findAll());
    }

    // 🔹 Get reports by status (LOST/FOUND)
    @GetMapping("/reports/status/{status}")
    public ResponseEntity<List<Item>> getReportsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(itemService.findByStatus(status));
    }

    // 🔹 Get reports by category
    @GetMapping("/reports/category/{category}")
    public ResponseEntity<List<Item>> getReportsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(itemService.findByCategory(category));
    }

    // 🔹 Get reports by reporter
    @GetMapping("/reports/reporter/{reporterId}")
    public ResponseEntity<List<Item>> getReportsByReporter(@PathVariable Long reporterId) {
        return ResponseEntity.ok(itemService.findByReporter(reporterId));
    }

    // 🔹 Per-user counts
    @GetMapping("/reports/reporter/{reporterId}/count/{status}")
    public ResponseEntity<Long> countByReporterAndStatus(@PathVariable Long reporterId,
                                                         @PathVariable String status) {
        return ResponseEntity.ok(itemService.countByReporterAndStatus(reporterId, status));
    }

    // 🔹 Global counts
    @GetMapping("/reports/count/{status}")
    public ResponseEntity<Long> countByStatus(@PathVariable String status) {
        return ResponseEntity.ok(itemService.countByStatus(status));
    }

    // 🔹 Delete a report (Admin only)
    @DeleteMapping("/reports/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id,
                                             @RequestHeader(value = "X-ROLE", required = false) String role) {
        if (role == null || !role.equalsIgnoreCase("Admin")) {
            return ResponseEntity.status(403).build();
        }
        itemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
