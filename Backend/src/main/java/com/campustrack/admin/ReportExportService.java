package com.campustrack.admin;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReportExportService {

    public String generateCsv(List<AdminReportDto> rows) {
        StringBuilder sb = new StringBuilder();
        sb.append("ID,Name,Description,Category,Date,Location,Status,ReporterId,ImageUrl\n");
        for (AdminReportDto r : rows) {
            sb.append(r.getId()).append(",")
                    .append(safe(r.getName())).append(",")
                    .append(safe(r.getDescription())).append(",")
                    .append(safe(r.getCategory())).append(",")
                    .append(safe(r.getDateReported())).append(",") // ✅ fixed field name
                    .append(safe(r.getLocation())).append(",")
                    .append(safe(r.getStatus())).append(",")
                    .append(r.getReporterId()).append(",")
                    .append(safe(r.getImageUrl())).append("\n");
        }
        return sb.toString();
    }

    public byte[] generateSimplePdf(AdminStatsDto stats) {
        String text = "Analytics Report\n"
                + "Total Reports: " + stats.getTotalReports() + "\n"
                + "Lost: " + stats.getLostCount() + "\n"
                + "Found: " + stats.getFoundCount() + "\n"
                + "Matched: " + stats.getMatchedCount() + "\n"
                + "Resolved: " + stats.getResolvedCount() + "\n";
        return text.getBytes();
    }

    private String safe(String s) {
        return s == null ? "" : s.replace(",", " ");
    }
}