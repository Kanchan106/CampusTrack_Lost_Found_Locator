import React, { useState, useEffect } from "react";

export default function ChatWindow({ reportId, reporterId, itemName, onClose }) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  // ✅ Load existing messages for this report
  useEffect(() => {
    if (!reportId) return;
    fetch(`http://localhost:8081/api/messages/report/${reportId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setChatLog(data);
        }
      })
      .catch((err) => console.error("Error loading chat:", err));
  }, [reportId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      reportId,
      reporterId,
      itemName,
      message,
    };

    fetch("http://localhost:8081/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then((saved) => {
        setChatLog((prev) => [...prev, saved]);
        setMessage("");
      })
      .catch((err) => console.error("Send failed:", err));
  };

  return (
    <div className="chat-window">
      <h4>Chat about: {itemName}</h4>

      <div className="chat-log">
        {chatLog.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.reporterId === reporterId ? "You" : "Them"}:</strong>{" "}
            {msg.message}
          </p>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <button onClick={onClose} style={{ marginTop: "0.5rem" }}>
        Close
      </button>
    </div>
  );
}