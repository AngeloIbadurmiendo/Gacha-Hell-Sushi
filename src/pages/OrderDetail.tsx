import React from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderProps {
  orderNumber: string;
  orderDate: string;
  customer: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  items: OrderItem[];
  deliveryFee: number;
  status: 'completado' | 'en curso' | 'cancelado'; // Estados posibles
}

const OrderDetail: React.FC<OrderProps & { onBack?: () => void }> = ({
  orderNumber,
  orderDate,
  customer,
  items,
  deliveryFee,
  status,
  onBack, // Nueva prop para manejar el botón de regreso
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  // Función para determinar el estilo de cada estado
  const getStepStyle = (step: string) => {
    if (step === 'received') {
      return "bg-blue-300 text-gray-600"; // Pedido recibido - Azul claro
    }
    if (step === 'preparing') {
      return "bg-blue-900 text-white"; // En preparación - Azul fuerte (actual)
    }
    return "bg-gray-300 text-gray-600"; // En camino - Gris (aún no ha ocurrido)
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Botón para volver */}
      {onBack && (
        <button
          onClick={onBack}
          className="text-blue-500 underline mb-4 hover:text-blue-700 transition"
        >
          ← Volver a la lista de pedidos
        </button>
      )}

      {/* Encabezado del pedido */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pedido #{orderNumber}</h1>
        <p className="text-gray-600">Pedido realizado el {orderDate}</p>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Barra de seguimiento del pedido - solo visible si el estado es "en curso" */}
      {status === 'en curso' && (
        <div className="flex items-center justify-between my-6">
          {/* Paso 1: Pedido recibido */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-6 h-6 rounded-full ${getStepStyle('received')}`}></div>
            <span className="text-xs mt-2 text-center">
              Pedido<br />recibido
            </span>
          </div>

          <div className="w-6 border-t-4 mx-1"></div>

          {/* Paso 2: En preparación */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-6 h-6 rounded-full ${getStepStyle('preparing')}`}></div>
            <span className="text-xs mt-2 font-semibold text-center">
              Tu producto está<br />siendo preparado
            </span>
          </div>

          <div className="w-6 border-t-4 mx-1"></div>

          {/* Paso 3: En camino */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-6 h-6 rounded-full ${getStepStyle('on-the-way')}`}></div>
            <span className="text-xs mt-2 text-center">
              En camino
            </span>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 my-4"></div>

      {/* Dirección de despacho */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Dirección de despacho</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p className="font-medium">{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.city}</p>
          <p>{customer.country}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Detalle del pedido */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalle</h2>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>
                {item.quantity} <span className="font-medium">{item.name}</span>
              </span>
              <span className="font-medium">${item.price.toLocaleString('es-CL')}</span>
            </div>
          ))}
          <div className="flex justify-between">
            <span>Despacho a domicilio</span>
            <span className="font-medium">${deliveryFee.toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Total */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Total</h2>
        <span className="text-xl font-bold">${total.toLocaleString('es-CL')}</span>
      </div>
    </div>
  );
};

export default OrderDetail;
