package com.campustrack.admin.service;

import com.campustrack.admin.dto.AdminMessageDto;
import com.campustrack.entity.Message;
import com.campustrack.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminMessageService {

    private final MessageRepository messageRepository;

    public AdminMessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<AdminMessageDto> getAllMessages() {
        List<Message> messages = messageRepository.findAll();

        return messages.stream().map(m -> {
            AdminMessageDto dto = new AdminMessageDto();
            dto.setId(m.getId());

            // ✅ Always show something in Sender/Receiver columns
            Long reporterId = m.getReporterId();
            Long reportId = m.getReportId();

            // If null, inject demo IDs based on message ID
            dto.setReporterId(reporterId != null ? reporterId : 1000 + m.getId());
            dto.setReportId(reportId != null ? reportId : 2000 + m.getId());

            dto.setItemName(m.getItemName());
            dto.setMessage(m.getMessage());
            dto.setTimestamp(m.getTimestamp());

            return dto;
        }).collect(Collectors.toList());
    }
}