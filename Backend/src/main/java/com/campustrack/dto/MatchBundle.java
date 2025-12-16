package com.campustrack.dto;

import com.campustrack.entity.Item;
import java.util.List;

public class MatchBundle {
    private Item item;
    private List<MatchResult> matches;

    public MatchBundle(Item item, List<MatchResult> matches) {
        this.item = item;
        this.matches = matches;
    }

    public Item getItem() { return item; }
    public void setItem(Item item) { this.item = item; }

    public List<MatchResult> getMatches() { return matches; }
    public void setMatches(List<MatchResult> matches) { this.matches = matches; }
}
