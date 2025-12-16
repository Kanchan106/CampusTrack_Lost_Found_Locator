package com.campustrack.dto;

import java.time.LocalDateTime;

public class MessageDTO {
    private Long id;
    private String senderName;
    private String receiverName;
    private String itemName;
    private String content;
    private LocalDateTime timestamp;

    // Constructor
    public MessageDTO(Long id, String senderName, String receiverName,
                      String itemName, String content, LocalDateTime timestamp) {
        this.id = id;
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.itemName = itemName;
        this.content = content;
        this.timestamp = timestamp;
    }

    // Getters
    public Long getId() { return id; }
    public String getSenderName() { return senderName; }
    public String getReceiverName() { return receiverName; }
    public String getItemName() { return itemName; }
    public String getContent() { return content; }
    public LocalDateTime getTimestamp() { return timestamp; }
}