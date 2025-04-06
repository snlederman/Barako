// src/components/AlertCard.js
import React, { useState } from 'react';

export default function AlertCard({ alert }) {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState(alert.status || 'pendiente');

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleStatusChange = () => {
    // Aquí se simula el cambio de estado. En producción, llamarías a tu API.
    setStatus('atendido');
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg mb-4">
      <p className="text-gray-700">{alert.message}</p>
      <p className="text-sm text-gray-500">Estado: {status}</p>

      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="Escribe tu intervención..."
          value={response}
          onChange={handleResponseChange}
        />
      </div>

      <div className="mt-2 flex justify-end">
        <button
          onClick={handleStatusChange}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Cambiar estatus
        </button>
      </div>
    </div>
  );
}