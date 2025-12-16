package com.campustrack.dto;

import com.campustrack.entity.Item;

public class MatchResult {
    private Item item;
    private double score;
    private Long reporterId;

    public MatchResult(Item item, double score) {
        this.item = item;
        this.score = score;
        this.reporterId = item.getReporterId();
    }

    public Item getItem() { return item; }
    public void setItem(Item item) { this.item = item; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public Long getReporterId() { return reporterId; }
    public void setReporterId(Long reporterId) { this.reporterId = reporterId; }
}
