import React from "react";

export default function ItemCard({ item, onShowMatches, onShowChat, showChat = true }) {
  const resolveImageUrl = (url) => {
    if (!url || url === "null" || url === "undefined") return "/placeholder.png";
    if (url.startsWith("/")) return `http://localhost:8081${url}`;
    return url;
  };

  return (
    <div className={`item-card ${item.status ? item.status.toLowerCase() : ""}`}>
      <img
        src={resolveImageUrl(item.imageUrl)}
        alt={item.name || "Item image"}
        className="item-image"
        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
        loading="lazy"
      />

      <div className="item-info">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Date:</strong> {item.date}</p>
        <p><strong>Location:</strong> {item.location}</p>

        {/* ✅ Single status badge */}
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status-badge ${item.status?.toLowerCase()}`}>
            {item.status}
          </span>
        </p>

        <div className="actions">
          <button onClick={() => onShowMatches(item.id)}>Suggested Matches</button>
          {showChat && (
            <button onClick={() => onShowChat(item.reporterId)}>Contact</button>
          )}
        </div>
      </div>
    </div>
  );
}
