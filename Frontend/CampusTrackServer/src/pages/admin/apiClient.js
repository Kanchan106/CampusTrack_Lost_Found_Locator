const BASE = "http://localhost:8081";

export const ENDPOINTS = {
  adminReports: "/api/admin/reports",
  adminStats: "/api/admin/stats",
  adminExportCsv: "/api/admin/export/csv",
  adminExportPdf: "/api/admin/export/pdf",
  users: "/api/admin/users",
  messages: "/api/admin/messages",
  matches: "/api/admin/matches"
};

async function safeJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

function isArray(x) {
  return Array.isArray(x);
}

/**
 * Admin Reports – includes reporter info + image
 */
export async function getAdminReports() {
  const res = await fetch(`${BASE}${ENDPOINTS.adminReports}`, {
    headers: {
      "Content-Type": "application/json",
      "X-ROLE": "Admin"
    }
  });
  const data = await safeJson(res);
  if (!res.ok) throw new Error(typeof data === "string" ? data : "Failed to fetch reports");
  const arr = isArray(data) ? data : [];
  return arr.map(r => ({
    id: r.id,
    type: r.type,
    title: r.title,
    description: r.description,
    dateReported: r.dateReported,
    location: r.location,
    imageUrl: r.imageUrl,
    category: r.category,
    tags: r.tags,
    status: r.status,
    createdAt: r.createdAt,
    // new fields from AdminReportRes DTO
    reporterName: r.reporterName ?? "Unknown",
    reporterId: r.reporterId ?? "N/A"
  }));
}

export async function getAdminStats() {
  const res = await fetch(`${BASE}${ENDPOINTS.adminStats}`, {
    headers: { "X-ROLE": "Admin" }
  });
  const data = await safeJson(res);
  if (!res.ok) throw new Error(typeof data === "string" ? data : "Failed to fetch stats");
  return {
    totalReports: Number(data.totalReports ?? 0),
    lostCount: Number(data.lostCount ?? 0),
    foundCount: Number(data.foundCount ?? 0),
    matchedCount: Number(data.matchedCount ?? 0),
    resolvedCount: Number(data.resolvedCount ?? 0)
  };
}

export async function exportCsv() {
  const res = await fetch(`${BASE}${ENDPOINTS.adminExportCsv}`, {
    headers: { "X-ROLE": "Admin" }
  });
  if (!res.ok) throw new Error("CSV export failed");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reports.csv";
  a.click();
  window.URL.revokeObjectURL(url);
}

export async function exportPdf() {
  const res = await fetch(`${BASE}${ENDPOINTS.adminExportPdf}`, {
    headers: { "X-ROLE": "Admin" }
  });
  if (!res.ok) throw new Error("PDF export failed");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "analytics.pdf";
  a.click();
  window.URL.revokeObjectURL(url);
}

export async function getAllUsers() {
  const res = await fetch(`${BASE}${ENDPOINTS.users}`, {
    headers: { "X-ROLE": "Admin" }
  });
  const data = await safeJson(res);
  if (!res.ok) throw new Error(typeof data === "string" ? data : "Failed to fetch users");
  const arr = isArray(data) ? data : [];
  return arr.map(u => ({
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    department: u.department,
    contactNumber: u.contactNumber,
    role: u.role
  }));
}

export async function getAllMessages() {
  const res = await fetch(`${BASE}${ENDPOINTS.messages}`, {
    headers: { "X-ROLE": "Admin" }
  });
  const data = await safeJson(res);
  if (!res.ok) throw new Error(typeof data === "string" ? data : "Failed to fetch messages");
  const arr = isArray(data) ? data : [];
  return arr.map(m => ({
    id: m.id,
    sender: m.sender,
    message: m.message,
    itemName: m.itemName,
    timestamp: m.timestamp
  }));
}

export async function getAllMatches() {
  const res = await fetch(`${BASE}${ENDPOINTS.matches}`, {
    headers: { "X-ROLE": "Admin" }
  });
  const data = await safeJson(res);
  if (!res.ok) throw new Error(typeof data === "string" ? data : "Failed to fetch matches");
  const arr = isArray(data) ? data : [];
  return arr.map(m => ({
    id: m.id,
    userId: m.userId,
    itemId: m.itemId,
    score: m.score
  }));
  
}

