// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoneyCheckAlt, FaBell, FaUtensils, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarStyle = {
    backgroundColor: 'rgba(40, 42, 73, 0.85)', // #282a49 con opacidad 0.85
    width: collapsed ? '60px' : '200px',
    transition: 'width 0.3s ease, padding 0.3s ease',
    padding: collapsed ? '10px' : '20px',
    boxSizing: 'border-box',
    color: 'white',
    height: '100%'
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    padding: '10px',
    marginBottom: '10px',
    textDecoration: 'none',
    borderRadius: '4px'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#3b3f59'
  };

  return (
    <div style={sidebarStyle}>
      {/* Botón para colapsar/expandir el sidebar */}
      <button
        onClick={toggleSidebar}
        style={{
          marginBottom: '20px',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Enlace para Pagos */}
      <Link
        to="/payments"
        style={pathname === '/payments' ? activeLinkStyle : linkStyle}
      >
        {collapsed ? (
          <FaMoneyCheckAlt size={20} />
        ) : (
          <>
            <FaMoneyCheckAlt size={20} style={{ marginRight: '8px' }} />
            Pagos
          </>
        )}
      </Link>

      {/* Enlace para Alertas */}
      <Link
        to="/alerts"
        style={pathname === '/alerts' ? activeLinkStyle : linkStyle}
      >
        {collapsed ? (
          <FaBell size={20} />
        ) : (
          <>
            <FaBell size={20} style={{ marginRight: '8px' }} />
            Alertas
          </>
        )}
      </Link>

      {/* Enlace para Menu */}
      <Link
        to="/menu"
        style={pathname === '/menu' ? activeLinkStyle : linkStyle}
      >
        {collapsed ? (
          <FaUtensils size={20} />
        ) : (
          <>
            <FaUtensils size={20} style={{ marginRight: '8px' }} />
            Menu
          </>
        )}
      </Link>
    </div>
  );
}