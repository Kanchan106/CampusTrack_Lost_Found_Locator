package com.campustrack.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "items")
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    private String category;

    private LocalDate date;

    private String location;

    @Column(nullable = false)
    private String status;      // LOST or FOUND

    private String imageUrl;

    private Long reporterId;    // user who reported

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;       // optional if storing raw image

    // Constructors
    public Item() {}

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public LocalDate getDate() { return date; }
    public String getLocation() { return location; }
    public String getStatus() { return status; }
    public String getImageUrl() { return imageUrl; }
    public Long getReporterId() { return reporterId; }
    public byte[] getImage() { return image; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setCategory(String category) { this.category = category; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setLocation(String location) { this.location = location; }
    public void setStatus(String status) { this.status = status; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setReporterId(Long reporterId) { this.reporterId = reporterId; }
    public void setImage(byte[] image) { this.image = image; }
}
