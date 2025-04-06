// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="sidebar">
      <Link to="/payments" className={pathname === '/payments' ? 'active' : ''}>
        Pagos
      </Link>
      <Link to="/alerts" className={pathname === '/alerts' ? 'active' : ''}>
        Alertas
      </Link>
      <Link to="/menu" className={pathname === '/menu' ? 'active' : ''}>
        Menu
      </Link>
    </div>
  );
}