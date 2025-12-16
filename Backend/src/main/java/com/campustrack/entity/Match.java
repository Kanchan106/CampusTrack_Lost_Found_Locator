package com.campustrack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lost_item_id")
    private Item lostItem;

    @ManyToOne
    @JoinColumn(name = "found_item_id")
    private Item foundItem;

    private String status;
    private String notes;

    private Long userId;
    private Long itemId;
    private double score;

    // Getters and setters
    public Long getId() { return id; }

    public Item getLostItem() { return lostItem; }
    public void setLostItem(Item lostItem) { this.lostItem = lostItem; }

    public Item getFoundItem() { return foundItem; }
    public void setFoundItem(Item foundItem) { this.foundItem = foundItem; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }
}