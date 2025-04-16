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
}

const OrderDetail: React.FC<OrderProps & { onBack?: () => void }> = ({
  orderNumber,
  orderDate,
  customer,
  items,
  deliveryFee,
  onBack, // Nueva prop para manejar el botón de regreso
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

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