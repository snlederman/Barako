import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="layout">
      <TopBar />
      <div className="layout-container">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}