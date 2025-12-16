import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPassword from './pages/ForgotPassword';
import ResetPasswordForm from './pages/ResetPasswordForm';

// User
import Dashboard from './dashboard/Dashboard';
import LostItemForm from './dashboard/LostItemForm';
import FoundItemForm from './dashboard/FoundItemForm';
import ReportItemPage from './pages/ReportItemPage';
import ItemsListingPage from './pages/ItemsListingPage';
import MyMatchesPage from './pages/MyMatchesPage';
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminReports from "./pages/AdminReports";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminUsers from "./pages/AdminUsers";
import AdminMessages from "./pages/AdminMessages";
import AdminMatches from "./pages/AdminMatches";

const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("role");
  if ((role || "").toLowerCase() !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />

      {/* User */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/items" element={<ItemsListingPage />} />
      <Route path="/matches" element={<MyMatchesPage />} />
      <Route path="/report-lost" element={<LostItemForm />} />
      <Route path="/report-found" element={<FoundItemForm />} />
      <Route path="/report" element={<ReportItemPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Admin */}
      <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
      <Route path="/admin/reports" element={<RequireAdmin><AdminReports /></RequireAdmin>} />
      <Route path="/admin/analytics" element={<RequireAdmin><AdminAnalytics /></RequireAdmin>} />
      <Route path="/admin/users" element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
      <Route path="/admin/messages" element={<RequireAdmin><AdminMessages /></RequireAdmin>} />
      <Route path="/admin/matches" element={<RequireAdmin><AdminMatches /></RequireAdmin>} />
    </Routes>
  );
}
