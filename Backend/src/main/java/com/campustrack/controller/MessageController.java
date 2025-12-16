package com.campustrack.controller;

import com.campustrack.entity.Message;
import com.campustrack.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")   // ✅ user-only scope
@CrossOrigin
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/reporter/{reporterId}")
    public List<Message> getMessagesByReporter(@PathVariable Long reporterId) {
        return messageService.getMessagesByReporterId(reporterId);
    }

    @GetMapping("/report/{reportId}")
    public List<Message> getMessagesByReport(@PathVariable Long reportId) {
        return messageService.getMessagesByReportId(reportId);
    }

    // ✅ New conversation endpoint (filters by reporterId)
    @GetMapping("/conversation/{reporterId}/{reportId}")
    public List<Message> getConversation(
            @PathVariable Long reporterId,
            @PathVariable Long reportId) {

        return messageService.getMessagesByReportId(reportId).stream()
                .filter(m -> m.getReporterId().equals(reporterId))
                .toList();
    }

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }
}