import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Pedido = {
  _id: string;
  fechaHora: string;
  estado: string;
  precioTotal: number;
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Pedido[]>([]);
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setError("No has iniciado sesión.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/pedidos?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        else setError(data.message || "No se pudieron cargar los pedidos.");
        setLoading(false);
      })
      .catch(() => {
        setError("Error al conectar al servidor.");
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendiente":
      case "en curso":
        return "text-orange-500";
      case "completado":
        return "text-green-600";
      case "cancelado":
      case "anulado":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendiente":
      case "en curso":
        return "⏳";
      case "completado":
        return "✅";
      case "cancelado":
      case "anulado":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  if (loading)
    return (
      <div className="text-center p-10 text-gray-500">Cargando pedidos...</div>
    );
  if (error)
    return (
      <div className="text-center p-10 text-red-500 font-bold">{error}</div>
    );

  return (
    <div className="bg-gray-100 p-5 rounded-lg max-w-md mx-auto relative w-11/12 mt-4">
      {/* Botón "Volver al perfil" como una X */}
      <Link
        to="/perfil"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        aria-label="Cerrar"
      >
        &times;
      </Link>

      <h2 className="text-3xl font-bold mb-4 text-center">Tus pedidos</h2>
      <div className="flex flex-col gap-4">
        {orders.length === 0 ? (
          <div className="text-center text-gray-500">No tienes pedidos aún.</div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow"
            >
              {/* Icono del estado */}
              <div className="flex items-center gap-3">
                <span className={`text-2xl ${getStatusColor(order.estado)}`}>
                  {getStatusIcon(order.estado)}
                </span>
                {/* Información del pedido */}
                <div>
                  <p className="font-bold text-lg">
                    Pedido #{order._id.substring(0, 6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.fechaHora).toLocaleString()}
                  </p>
                  <p
                    className={`text-sm font-semibold ${getStatusColor(
                      order.estado
                    )}`}
                  >
                    Estado: {order.estado}
                  </p>
                  <p className="text-sm">Total: ${order.precioTotal.toLocaleString()}</p>
                </div>
              </div>

              {/* Botón de detalle */}
              <button
                onClick={() => navigate(`/orders/${order._id}?userId=${userId}`)}
                className="bg-blue-400 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
              >
                Detalle
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
