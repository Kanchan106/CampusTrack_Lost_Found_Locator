import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";

export default function SuggestedMatchesModal({ itemId, onClose }) {
  const [matches, setMatches] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/api/items/${itemId}/matches`)

      .then((res) => res.json())
      .then((data) => {
        console.log("Matches response:", data); // 🔍 Debug log
        setMatches(data);
      })
      .catch(() => setMatches([]));
  }, [itemId]);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <h3>Suggested Matches</h3>

        {matches.length === 0 ? (
          <p>No matches found.</p>
        ) : (
          matches.map(({ item, score }) => (
            <div key={item.id} className="match-card">
              <img
                src={
                  item.imageUrl
                    ? `http://localhost:8081${item.imageUrl}`
                    : "/placeholder.png"
                }
                alt={item.name}
                className="match-image"
                onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              />
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>
                  <strong>Score:</strong> {(score * 100).toFixed(1)}%
                </p>
                <button
                  disabled={!item.reporterId}
                  onClick={() =>
                    setActiveChat({
                      reportId: item.id,
                      reporterId: item.reporterId,
                      itemName: item.name,
                    })
                  }
                >
                  Chat
                </button>
              </div>
            </div>
          ))
        )}

        <button onClick={onClose}>Close</button>

        {activeChat && (
          <ChatWindow
            reportId={activeChat.reportId}
            reporterId={activeChat.reporterId}
            itemName={activeChat.itemName}
            onClose={() => setActiveChat(null)}
          />
        )}
      </div>
    </>
  );
}
