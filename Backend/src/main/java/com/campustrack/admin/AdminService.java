package com.campustrack.admin;

import com.campustrack.entity.Item;
import com.campustrack.service.ItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    private final ItemService itemService;

    public AdminService(ItemService itemService) {
        this.itemService = itemService;
    }

    public List<AdminReportDto> getAllReports() {
        return itemService.findAll().stream().map(AdminReportDto::from).toList();
    }

    // If you need raw items for other purposes
    public List<Item> getAllItems() {
        return itemService.findAll();
    }

    public AdminStatsDto getStats() {
        List<Item> all = itemService.findAll();
        long lost = all.stream().filter(i -> "LOST".equalsIgnoreCase(i.getStatus())).count();
        long found = all.stream().filter(i -> "FOUND".equalsIgnoreCase(i.getStatus())).count();

        AdminStatsDto dto = new AdminStatsDto();
        dto.setTotalReports(all.size());
        dto.setLostCount((int) lost);
        dto.setFoundCount((int) found);
        dto.setMatchedCount(0);   // extend later if you add matching
        dto.setResolvedCount(0);  // extend later if you add resolution flag
        return dto;
    }
}
