// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Alerts from './pages/Alerts';
import Payments from './pages/Payments';
import Menu from './pages/Menu';  // Importa la nueva página
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirige la raíz a /alerts (puedes cambiarlo si lo prefieres) */}
          <Route index element={<Navigate to="/alerts" replace />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="payments" element={<Payments />} />
          <Route path="menu" element={<Menu />} />  {/* Nueva ruta para Menu */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;