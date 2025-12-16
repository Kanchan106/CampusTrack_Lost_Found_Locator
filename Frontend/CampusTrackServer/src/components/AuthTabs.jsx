import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AuthTabs() {
  const { pathname } = useLocation();

  return (
    <div className="auth-tabs">
      <Link to="/login" className={pathname === '/login' ? 'active' : ''}>
        Login
      </Link>
      <Link to="/signup" className={pathname === '/signup' ? 'active' : ''}>
        Register
      </Link>
    </div>
  );
}
