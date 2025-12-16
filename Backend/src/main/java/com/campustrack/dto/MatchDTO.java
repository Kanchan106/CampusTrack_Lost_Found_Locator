package com.campustrack.dto;

public class MatchDTO {
    private Long id;
    private String lostItemName;
    private String foundItemName;
    private double confidence;
    private String status;
    private String notes;

    public MatchDTO(Long id, String lostItemName, String foundItemName, double confidence, String status, String notes) {
        this.id = id;
        this.lostItemName = lostItemName;
        this.foundItemName = foundItemName;
        this.confidence = confidence;
        this.status = status;
        this.notes = notes;
    }

    public Long getId() { return id; }
    public String getLostItemName() { return lostItemName; }
    public String getFoundItemName() { return foundItemName; }
    public double getConfidence() { return confidence; }
    public String getStatus() { return status; }
    public String getNotes() { return notes; }

    public void setId(Long id) { this.id = id; }
    public void setLostItemName(String lostItemName) { this.lostItemName = lostItemName; }
    public void setFoundItemName(String foundItemName) { this.foundItemName = foundItemName; }
    public void setConfidence(double confidence) { this.confidence = confidence; }
    public void setStatus(String status) { this.status = status; }
    public void setNotes(String notes) { this.notes = notes; }
}