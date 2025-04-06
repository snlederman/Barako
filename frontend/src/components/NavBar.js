// src/components/NavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './Assets/LogoBarako.png'; // Ajusta la ruta a tu imagen

export default function NavBar() {
  const { pathname } = useLocation();

  // Estilos de Tailwind
  const baseStyle = "px-4 py-2 rounded-lg font-semibold";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "text-blue-600 hover:bg-blue-100";

  return (
    <nav className="bg-white shadow p-4 flex items-center">
      {/* Logo a la izquierda */}
      <img
  src={logo}
  alt="Logo de Barako"
  className="h-4 w-auto object-contain"
  style={{ height: '128px' }}
/>
      {/* Nombre de la compañía (opcional) */}
      <span className="font-bold text-xl mr-8">Mi Compañía</span>

      {/* Enlaces a secciones */}
      <Link
        to="/alerts"
        className={`${baseStyle} ${pathname === "/alerts" ? activeStyle : inactiveStyle} mr-2`}
      >
        Alertas
      </Link>
      <Link
        to="/payments"
        className={`${baseStyle} ${pathname === "/payments" ? activeStyle : inactiveStyle}`}
      >
        Pagos
      </Link>
    </nav>
  );
}