package com.campustrack.controller;

import com.campustrack.dto.AdminReportRes;
import com.campustrack.service.AdminReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminReportController {

    private final AdminReportService adminReportService;

    public AdminReportController(AdminReportService adminReportService) {
        this.adminReportService = adminReportService;
    }

    @GetMapping("/reports")
    public List<AdminReportRes> getReports() {
        return adminReportService.getAllReports();
    }
}
