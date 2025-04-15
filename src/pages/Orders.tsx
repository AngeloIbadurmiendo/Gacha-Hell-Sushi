import React from 'react';

interface Order {
  id: number;
  status: 'en curso' | 'completado' | 'cancelado';
  date: string;
}

const Orders: React.FC = () => {
  const orders: Order[] = [
    {
      id: 4353,
      status: 'en curso',
      date: '23/03/2025',
    },
    {
      id: 3781,
      status: 'completado',
      date: '23/02/2025',
    },
    {
      id: 1890,
      status: 'cancelado',
      date: '23/01/2025',
    },
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'en curso':
        return 'text-orange-500';
      case 'completado':
        return 'text-green-600';
      case 'cancelado':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'en curso':
        return '⏰';
      case 'completado':
        return '✅';
      case 'cancelado':
        return '❌';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg max-w-md mx-auto shadow-lg relative w-11/12 mt-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">Tus pedidos</h2>
        <button className="text-2xl font-light text-gray-600">×</button>
      </div>

      {/* Lista de pedidos */}
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md"
          >
            {/* Icono + info */}
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {getStatusIcon(order.status)}
              </div>
              <div>
                <p className="font-bold">Pedido #{order.id}</p>
                <p className={`${getStatusColor(order.status)} text-sm font-semibold`}>
                  pedido {order.status}
                </p>
                <p className="text-xs text-gray-500">{order.date}</p>
              </div>
            </div>

            {/* Botón detalle */}
            <button className="bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium px-4 py-1 rounded-lg">
              Detalle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
