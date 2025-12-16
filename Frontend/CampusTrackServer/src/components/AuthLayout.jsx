import React from 'react';
import '../styles/auth.css';
import logo from '../assets/logo.png';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page"> {/* ✅ page-level wrapper for centering */}
      <div className="auth-wrapper">
        {/* Left branding section */}
        <div className="auth-left">
          <img src={logo} alt="Campus Track Logo" className="auth-logo" />
          <h1>CAMPUS TRACK</h1>
          <h2>Lost & Found Locator</h2>
          <p>
            Welcome<br />
            Login or create a new account to get started
          </p>
        </div>

        {/* Right form section */}
        <div className="auth-right">
          {children}
        </div>
      </div>
    </div>
  );
}
