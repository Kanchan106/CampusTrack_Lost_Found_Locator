// src/dashboard/ItemsPage.jsx
/*import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../styles/Items.css";


export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/items");
        const data = await res.json();
        if (res.ok) {
          setItems(data);
          setFilteredItems(data);
        } else {
          toast.error(data.message || "Failed to load items");
        }
      } catch {
        toast.error("Something went wrong while fetching items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...items];
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    if (categoryFilter !== "ALL") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }
    setFilteredItems(filtered);
  }, [statusFilter, categoryFilter, items]);

  return (
    <div className="items-page">
      <h2>Reported Items</h2>

      <div className="filters">
        <label>Status:</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select>

        <label>Category:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Accessories">Accessories</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : filteredItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="items-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className={`item-card ${item.status.toLowerCase()}-theme`}>
              <h3>{item.name}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Status:</strong> {item.status}</p>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="item-image" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}*/