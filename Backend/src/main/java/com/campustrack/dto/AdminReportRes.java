package com.campustrack.dto;

public record AdminReportRes(
        Long id,
        String type,
        String title,
        String description,
        String dateReported,
        String location,
        String imageUrl,
        String category,
        String tags,
        String status,
        String createdAt,
        String reporterName,
        String reporterId
) {}
