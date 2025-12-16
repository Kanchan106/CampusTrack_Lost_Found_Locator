package com.campustrack.admin;

import com.campustrack.entity.Item;

public class AdminReportDto {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String dateReported; // ✅ safe string field
    private String location;
    private String status;
    private String imageUrl;
    private Long reporterId;

    public static AdminReportDto from(Item item) {
        AdminReportDto dto = new AdminReportDto();
        dto.id = item.getId();
        dto.name = item.getName();
        dto.description = item.getDescription();
        dto.category = item.getCategory();
        dto.dateReported = item.getDate() != null ? item.getDate().toString() : ""; // ✅ null-safe
        dto.location = item.getLocation();
        dto.status = item.getStatus();
        dto.imageUrl = item.getImageUrl();
        dto.reporterId = item.getReporterId();
        return dto;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public String getDateReported() { return dateReported; } // ✅ matches ReportExportService
    public String getLocation() { return location; }
    public String getStatus() { return status; }
    public String getImageUrl() { return imageUrl; }
    public Long getReporterId() { return reporterId; }
}