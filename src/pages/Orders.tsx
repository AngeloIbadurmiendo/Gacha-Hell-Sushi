import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { orders } from "../data/orders"; 

const Orders: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en curso":
        return "text-orange-500";
      case "completado":
        return "text-green-600";
      case "cancelado":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "en curso":
        return "⏳";
      case "completado":
        return "✅"; 
      case "cancelado":
        return "❌"; 
      default:
        return "ℹ️"; 
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg max-w-md mx-auto relative w-11/12 mt-4">
      {/* Botón "Volver al perfil" como una X */}
      <Link
        to="/profile"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        aria-label="Cerrar"
      >
        &times;
      </Link>

      <h2 className="text-3xl font-bold mb-4 text-center">Tus pedidos</h2>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.orderNumber}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.5)] hover:shadow-lg transition-shadow"
          >
            {/* Icono del estado */}
            <div className="flex items-center gap-3">
              <span className={`text-2xl ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
              </span>
              {/* Información del pedido */}
              <div>
                <p className="font-bold text-lg">Pedido #{order.orderNumber}</p>
                <p className="text-sm text-gray-500">{order.orderDate}</p>
                <p className={`text-sm font-semibold ${getStatusColor(order.status)}`}>
                  Estado: {order.status}
                </p>
              </div>
            </div>

            {/* Botón de detalle */}
            <button
              onClick={() => navigate(`/orders/${order.orderNumber}`)} // Navega al detalle del pedido
              className="bg-blue-400 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
            >
              Detalle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
