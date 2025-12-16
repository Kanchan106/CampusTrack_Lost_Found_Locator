// src/components/FilterBar.jsx
export default function FilterBar({ filter, setFilter, category, setCategory }) {
  return (
  <div className="filters-bar">
  <input
    type="text"
    placeholder="Search items..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
    <option value="ALL">All Status</option>
    <option value="LOST">Lost</option>
    <option value="FOUND">Found</option>
  </select>

  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
    <option value="ALL">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Clothing">Clothing</option>
    <option value="Books">Books</option>
    <option value="Accessories">Accessories</option>
    <option value="Others">Others</option>
  </select>

  <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
    Dashboard
  </button>
</div>

  );
}