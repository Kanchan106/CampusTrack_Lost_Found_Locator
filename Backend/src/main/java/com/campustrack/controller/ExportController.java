package com.campustrack.controller;

import com.campustrack.entity.Item;
import com.campustrack.repository.ItemRepository;
import com.campustrack.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.List;

// OpenPDF (LibrePDF) imports
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

@RestController
@RequestMapping("/api/admin")
public class ExportController {

    private final ItemRepository itemRepository;
    private final MatchRepository matchRepository;

    @Autowired
    public ExportController(ItemRepository itemRepository, MatchRepository matchRepository) {
        this.itemRepository = itemRepository;
        this.matchRepository = matchRepository;
    }

    // Export all item reports as CSV
    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportReportsCsv(
            @RequestHeader(value = "X-ROLE", required = false) String role) {

        if (role == null || !role.equalsIgnoreCase("Admin")) {
            return ResponseEntity.status(403).build();
        }

        List<Item> items = itemRepository.findAll();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(out);

        // Header row
        writer.println("ID,Name,Category,Status,Location,Date,ReporterId,ImageUrl");

        // Data rows (escape commas and nulls safely)
        for (Item item : items) {
            String name = safe(item.getName());
            String cat = safe(item.getCategory());
            String status = safe(item.getStatus());
            String loc = safe(item.getLocation());
            String date = item.getDate() == null ? "" : item.getDate().toString();
            String reporterId = item.getReporterId() == null ? "" : item.getReporterId().toString();
            String imageUrl = safe(item.getImageUrl());

            writer.printf("%d,%s,%s,%s,%s,%s,%s,%s%n",
                    item.getId(), name, cat, status, loc, date, reporterId, imageUrl
            );
        }

        writer.flush();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reports.csv")
                .contentType(MediaType.TEXT_PLAIN)
                .body(out.toByteArray());
    }

    // Export analytics overview as PDF (counts pulled from DB)
    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportAnalyticsPdf(
            @RequestHeader(value = "X-ROLE", required = false) String role) {

        if (role == null || !role.equalsIgnoreCase("Admin")) {
            return ResponseEntity.status(403).build();
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        Document document = new Document();
        PdfWriter.getInstance(document, out);

        document.open();
        document.add(new Paragraph("CampusTrack Analytics Report"));
        document.add(new Paragraph(" "));

        long totalReports = itemRepository.count();
        long lostCount = itemRepository.findByStatus("Lost").size();
        long foundCount = itemRepository.findByStatus("Found").size();
        long matchedCount = matchRepository.count();

        // Example resolved definition: score >= 0.8
        long resolvedCount = matchRepository.findAll().stream()
                .filter(m -> m.getScore() >= 0.8)
                .count();

        document.add(new Paragraph("Total Reports: " + totalReports));
        document.add(new Paragraph("Lost Items: " + lostCount));
        document.add(new Paragraph("Found Items: " + foundCount));
        document.add(new Paragraph("Matches: " + matchedCount));
        document.add(new Paragraph("Resolved Matches (≥80%): " + resolvedCount));

        document.close();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=analytics.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(out.toByteArray());
    }

    // Small helper to make CSV-safe values
    private String safe(String s) {
        if (s == null) return "";
        String v = s.replace("\"", "\"\"");
        if (v.contains(",") || v.contains("\n")) {
            return "\"" + v + "\"";
        }
        return v;
    }
}
