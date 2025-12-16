package com.campustrack.service;

import com.campustrack.dto.AdminReportRes;
import com.campustrack.entity.Item;
import com.campustrack.entity.User;
import com.campustrack.repository.ItemRepository;
import com.campustrack.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminReportService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public AdminReportService(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public List<AdminReportRes> getAllReports() {
        return itemRepository.findAll().stream()
                .map(item -> {
                    User reporter = item.getReporterId() != null
                            ? userRepository.findById(item.getReporterId()).orElse(null)
                            : null;

                    return new AdminReportRes(
                            item.getId(),
                            item.getStatus(), // type = LOST or FOUND
                            item.getName(),   // title
                            item.getDescription(),
                            item.getDate() != null ? item.getDate().toString() : "", // ✅ null-safe
                            item.getLocation(),
                            item.getImageUrl(),
                            item.getCategory(),
                            null, // tags (not present)
                            item.getStatus(),
                            null, // createdAt (not present)
                            reporter != null ? reporter.getFullName() : "Unknown",
                            reporter != null ? reporter.getId().toString() : "N/A"
                    );
                })
                .toList();
    }
}