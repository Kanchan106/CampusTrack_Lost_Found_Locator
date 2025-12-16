package com.campustrack.admin;

public class AdminStatsDto {
    private int totalReports;
    private int lostCount;
    private int foundCount;
    private int matchedCount;
    private int resolvedCount;

    public int getTotalReports() { return totalReports; }
    public int getLostCount() { return lostCount; }
    public int getFoundCount() { return foundCount; }
    public int getMatchedCount() { return matchedCount; }
    public int getResolvedCount() { return resolvedCount; }

    public void setTotalReports(int totalReports) { this.totalReports = totalReports; }
    public void setLostCount(int lostCount) { this.lostCount = lostCount; }
    public void setFoundCount(int foundCount) { this.foundCount = foundCount; }
    public void setMatchedCount(int matchedCount) { this.matchedCount = matchedCount; }
    public void setResolvedCount(int resolvedCount) { this.resolvedCount = resolvedCount; }
}
