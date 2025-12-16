package com.campustrack.dto;

import jakarta.validation.constraints.NotBlank;

public class ItemDtos {

    public record CreateItemReq(
            @NotBlank String type,
            @NotBlank String title,
            @NotBlank String description,
            @NotBlank String dateReported, // ISO yyyy-MM-dd
            @NotBlank String location,
            String imageUrl,               // optional
            String category,               // optional
            String tags                    // optional
    ) {}

    public record ItemRes(
            Long id, String type, String title, String description,
            String dateReported, String location, String imageUrl,
            String category, String tags, String status, String createdAt
    ) {}
}