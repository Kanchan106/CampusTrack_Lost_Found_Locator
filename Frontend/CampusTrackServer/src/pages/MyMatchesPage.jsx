import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuggestedMatchesModal from "../components/SuggestedMatchesModal";
import "./MyMatches.css";

function MyMatchesPage() {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const reporterId = localStorage.getItem("reporterId");
  const navigate = useNavigate();

  const resolveImageUrl = (url) => {
    if (!url || url === "null" || url === "undefined") return "/placeholder.png";
    if (url.startsWith("/")) return `http://localhost:8081${url}`;
    return url;
  };

  useEffect(() => {
    if (!reporterId) {
      console.error("Missing reporterId in localStorage");
      return;
    }

    fetch(`http://localhost:8081/api/items/my-matches/${reporterId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.warn("Unexpected response format:", data);
          return;
        }

        const flattened = [];
        data.forEach(({ item, matches }) => {
          if (item?.id) flattened.push(item);
          matches?.forEach(({ item: matchItem, score }) => {
            if (matchItem?.id) {
              flattened.push({
                ...matchItem,
                matchScore: score,
              });
            }
          });
        });

        setItems(flattened);
      })
      .catch((err) => console.error("Error fetching matches:", err));
  }, [reporterId]);

  return (
    <div className="matches-page">
      <div className="page-container">
        <div className="top-bar">
          <h2>My Reports and Match</h2>
          <button className="dashboard-button" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>

        <div className="scroll-container">
          {items.length === 0 ? (
            <p className="empty-message">No reports or matches found.</p>
          ) : (
            <div className="grid-container">
              {items
                .filter((item) => item && item.id)
                .map((item) => (
                  <div key={item.id} className="item-card">
                    <img
                      src={resolveImageUrl(item.imageUrl)}
                      alt={item.name || "Item image"}
                      className="item-image"
                      onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                      loading="lazy"
                    />
                    <div className="item-info">
                      <div className={`status-badge ${item.status?.toLowerCase()}`}>
                        {item.status === "found" ? "FOUND" : "LOST"}
                      </div>
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <p><strong>Category:</strong> {item.category}</p>
                      <p><strong>Date:</strong> {item.date}</p>
                      <p><strong>Location:</strong> {item.location}</p>
                      {item.reporterName && item.reporterId && (
                        <p><strong>Reporter:</strong> {item.reporterName} ({item.reporterId})</p>
                      )}
                      {item.matchScore && (
                        <p><strong>Match Score:</strong> {(item.matchScore * 100).toFixed(1)}%</p>
                      )}
                      <div className="actions">
                        <button onClick={() => setSelectedItemId(item.id)}>
                          Suggested Matches
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {selectedItemId && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedItemId(null)}></div>
          <SuggestedMatchesModal itemId={selectedItemId} onClose={() => setSelectedItemId(null)} />
        </>
      )}
    </div>
  );
}

export default MyMatchesPage;