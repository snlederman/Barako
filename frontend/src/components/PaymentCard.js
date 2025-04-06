// src/components/PaymentCard.js
import React, { useState } from 'react';

export default function PaymentCard({ order }) {
  const [operatorNote, setOperatorNote] = useState('');
  const [status, setStatus] = useState(order.status || 'pendiente');

  const handleNoteChange = (e) => {
    setOperatorNote(e.target.value);
  };

  const handleConfirmPayment = () => {
    // Aquí se simula la confirmación del pago; en producción, se haría una llamada a la API.
    setStatus('confirmado');
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg mb-4">
      <p className="text-gray-700">
        Pedido #{order.id}: {order.description}
      </p>
      <p className="text-sm text-gray-500">Estado: {status}</p>

      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="Agregar nota del operador..."
          value={operatorNote}
          onChange={handleNoteChange}
        />
      </div>

      <div className="mt-2 flex justify-end">
        <button
          onClick={handleConfirmPayment}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Confirmar Pago
        </button>
      </div>
    </div>
  );
}