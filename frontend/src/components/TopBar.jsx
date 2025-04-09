// src/components/TopBar.jsx
import React from 'react';
import logo from './Assets/LogoBarako.png';

export default function TopBar() {
  const username = "Usuario "; // O bien, obtén este dato dinámicamente

  return (
    <div className="topbar">
      <img src={logo} alt="Logo Barako" className="logo" />
      <div className="user-info">
        <span className="username">{username}</span>
        <button className="logout-btn">LogOut</button>
      </div>
    </div>
  );
}