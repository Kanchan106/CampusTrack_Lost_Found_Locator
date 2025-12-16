import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MessagesPage.css";

function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [activeReportId, setActiveReportId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [lastOpened, setLastOpened] = useState({});
  const reporterId = localStorage.getItem("reporterId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!reporterId) return;

    const fetchMessages = () => {
      // ✅ FIXED endpoint: backend expects /report/{reportId}
      fetch(`http://localhost:8081/api/messages/report/${reporterId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setConversations(data);
          } else {
            setConversations([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching messages:", err);
          setConversations([]);
        });
    };

    fetchMessages(); // initial load
    const interval = setInterval(fetchMessages, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [reporterId]);

  const grouped = conversations.reduce((acc, msg) => {
    const id = msg.reportId;
    if (!acc[id]) acc[id] = [];
    acc[id].push(msg);
    return acc;
  }, {});

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [grouped, activeReportId]);

  const handleSend = () => {
    if (!inputText.trim() || !activeReportId) return;

    // ✅ FIXED payload: removed sender: "me"
    const newMessage = {
      reportId: parseInt(activeReportId),
      reporterId: parseInt(reporterId),
      itemName: grouped[activeReportId]?.[0]?.itemName || "Unknown item",
      message: inputText,
    };

    fetch("http://localhost:8081/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then((saved) => {
        setConversations((prev) => [...prev, saved]);
        setInputText("");
      })
      .catch((err) => console.error("Send failed:", err));
  };

  return (
    <div className="messages-page">
      <div className="page-container">
        {/* ✅ Top bar */}
        <div className="top-bar">
          <h2>Messages</h2>
          <button
            className="dashboard-button"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>

        <div className="messages-layout">
          {/* ✅ Left panel */}
          <div className="conversation-panel">
            <h3>Conversations</h3>
            {Object.keys(grouped).length === 0 ? (
              <p className="empty-message">No conversations started yet!</p>
            ) : (
              Object.keys(grouped).map((reportId) => {
                const unreadCount = grouped[reportId].filter(
                  (msg) =>
                    new Date(msg.timestamp) >
                    new Date(lastOpened[reportId] || 0)
                ).length;

                return (
                  <div
                    key={reportId}
                    className={`conversation-card ${
                      activeReportId === reportId ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveReportId(reportId);
                      setLastOpened((prev) => ({
                        ...prev,
                        [reportId]: new Date().toISOString(),
                      }));
                    }}
                  >
                    <strong>Report ID:</strong> {reportId}
                    <p>{grouped[reportId][0]?.itemName || "Unknown item"}</p>
                    {unreadCount > 0 && (
                      <span className="unread-badge">{unreadCount}</span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* ✅ Right panel */}
          <div className="chat-panel">
            {activeReportId ? (
              <>
                <h3>Chatting about: Report {activeReportId}</h3>
                <div className="chat-box">
                  {grouped[activeReportId].map((msg, index) => {
                    // ✅ FIXED logic: compare IDs, not sender === "me"
                    const isMe = parseInt(reporterId) === msg.reporterId;

                    return (
                      <div
                        key={index}
                        className={`chat-bubble ${isMe ? "me" : "them"}`}
                      >
                        <p>{msg.message}</p>
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="message-input">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button onClick={handleSend}>Send</button>
                </div>
              </>
            ) : (
              <div className="empty-chat">
                <p>Select a conversation to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;