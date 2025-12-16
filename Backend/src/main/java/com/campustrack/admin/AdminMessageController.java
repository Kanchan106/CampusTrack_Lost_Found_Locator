package com.campustrack.admin;

import com.campustrack.admin.dto.AdminMessageDto;
import com.campustrack.admin.service.AdminMessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/messages")
public class AdminMessageController {

    private final AdminMessageService adminMessageService;

    public AdminMessageController(AdminMessageService adminMessageService) {
        this.adminMessageService = adminMessageService;
    }

    @GetMapping
    public List<AdminMessageDto> getAllMessages() {
        return adminMessageService.getAllMessages();
    }
}