import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemGrid from "../components/ItemGrid";
import SuggestedMatchesModal from "../components/SuggestedMatchesModal";
import ChatWindow from "../components/ChatWindow";

const ItemsListingPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activeChatItem, setActiveChatItem] = useState(null);

  const navigate = useNavigate();

  const resolveImageUrl = (url) => {
    if (!url || url === "null" || url === "undefined") return "/placeholder.png";
    if (url.startsWith("/")) return `http://localhost:8081${url}`;
    return url;
  };

  useEffect(() => {
    fetch("http://localhost:8081/api/items/reports")
      .then((res) => res.json())
      .then((data) => {
        const normalized = (Array.isArray(data) ? data : []).map((i) => ({
          id: i.id,
          reporterId: i.reporterId,
          name: i.name ?? "",
          description: i.description ?? "",
          category: (i.category ?? "").trim(),
          categoryUpper: (i.category ?? "").trim().toUpperCase(),
          location: i.location ?? "",
          date: i.date ?? "",
          status: (i.status ?? "").trim(),
          statusUpper: (i.status ?? "").trim().toUpperCase(),
          imageUrl: resolveImageUrl(i.imageUrl),
        }));

        setItems(normalized);
        setFilteredItems(normalized);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  useEffect(() => {
    let filtered = [...items];
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (item) => item.statusUpper === statusFilter.toUpperCase()
      );
    }
    if (categoryFilter !== "ALL") {
      filtered = filtered.filter(
        (item) => item.categoryUpper === categoryFilter.toUpperCase()
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    setFilteredItems(filtered);
  }, [statusFilter, categoryFilter, searchQuery, items]);

  const clearFilters = () => {
    setStatusFilter("ALL");
    setCategoryFilter("ALL");
    setSearchQuery("");
    setFilteredItems(items);
  };

  return (
    <div className="items-page">
      <div className="filters-bar">
        <div className="filters-group">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="LOST">Lost</option>
            <option value="FOUND">Found</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Accessories">Accessories</option>
            <option value="Others">Others</option>
          </select>

          <button className="clear-btn" onClick={clearFilters}>
            Clear filters
          </button>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>

      <div className="item-grid-wrapper">
        <ItemGrid
          items={filteredItems}
          onShowMatches={(id) => setSelectedItemId(id)}
          onShowChat={(id) => {
            const item = items.find((i) => i.id === id);
            if (item) setActiveChatItem(item);
          }}
        />
      </div>

      {selectedItemId && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setSelectedItemId(null)}
          ></div>
          <SuggestedMatchesModal
            itemId={selectedItemId}
            onClose={() => setSelectedItemId(null)}
          />
        </>
      )}

      {activeChatItem && (
        <ChatWindow
          reportId={activeChatItem.id}
          reporterId={activeChatItem.reporterId}
          itemName={activeChatItem.name}
          onClose={() => setActiveChatItem(null)}
        />
      )}
    </div>
  );
};

export default ItemsListingPage;
