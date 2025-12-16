package com.campustrack.service;

import com.campustrack.entity.Message;
import com.campustrack.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessagesByReporterId(Long reporterId) {
        List<Message> messages = messageRepository.findByReporterId(reporterId);
        messages.sort(Comparator.comparing(Message::getTimestamp));
        return messages;
    }

    public List<Message> getMessagesByReportId(Long reportId) {
        List<Message> messages = messageRepository.findByReportId(reportId);
        messages.sort(Comparator.comparing(Message::getTimestamp));
        return messages;
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
}