import React from "react";
import "./ItemGrid.css";

export default function ItemGrid({ items = [], onShowMatches, onShowChat }) {
  if (!items.length) {
    return <div className="empty-state">No items found.</div>;
  }

  return (
    <div className="items-grid">
      {items.map((item, idx) => (
        <div key={idx} className={`item-card ${item.status.toLowerCase()}-theme`}>
          <div className="item-image-wrap">
            <img
              src={item.imageUrl}
              alt={item.name || "Item image"}
              className="item-image"
              onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              loading="lazy"
            />
          </div>

          <div className="item-content">
            <h3 className="item-title">{item.name}</h3>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <p><strong>Status:</strong> {item.status}</p>
          </div>

          <div className="item-actions">
            {/* ✅ Wire up handlers passed from parent */}
            <button
              className="match-btn"
              onClick={() => onShowMatches(item.id)}
            >
              Suggested Matches
            </button>
            <button
              className="chat-btn"
              onClick={() => onShowChat(item.reporterId)}
            >
              Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}