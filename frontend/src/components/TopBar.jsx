import React from 'react';
import logo from './Assets/LogoBarako.png'; // Asegúrate de que el archivo exista en esta ruta

export default function TopBar() {
  return (
    <div className="topbar">
      <img src={logo} alt="Logo Barako" />
      <button className="logout-btn">LogOut</button>
    </div>
  );
}