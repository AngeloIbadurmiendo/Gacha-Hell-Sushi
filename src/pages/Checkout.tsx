import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type OrderItem = {
  quantity: number;
  name: string;
  price: number;
};

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1); // Estado para controlar el paso actual
  const navigate = useNavigate(); // Hook para la navegación
  const handleHome = () => {
    navigate("/"); // Redirige al Home
  };

  const address = {
    name: "Juan Perez",
    street: "Av. España 1680",
    city: "Valparaiso",
    country: "Chile",
  };

  const orderItems: OrderItem[] = [
    { quantity: 1, name: "Palta Roll", price: 4990 },
    { quantity: 2, name: "Kanikama Roll", price: 9000 },
    { quantity: 1, name: "Calamari Roll", price: 5500 },
  ];

  const deliveryFee = 1990;
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + deliveryFee;

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString("es-CL")}`;
  };

  // Función para renderizar el contenido según el paso actual
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <section className="bg-gray-100 p-6 md:p-8 lg:p-10 rounded-md shadow-md lg:max-w-full">
            {/* Dirección de despacho */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Dirección de despacho</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">{address.name}</p>
                <p>{address.street}</p>
                <p>{address.city}</p>
                <p>{address.country}</p>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 mt-4">
                Cambiar dirección
              </button>
            </div>

            {/* Detalle del pedido */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Detalle del pedido</h2>
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {item.quantity} <span className="font-medium">{item.name}</span>
                    </span>
                    <span className="font-medium text-gray-900">{formatCurrency(item.price)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Despacho a domicilio</span>
                  <span className="font-medium text-gray-900">{formatCurrency(deliveryFee)}</span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-xl font-bold text-gray-900">{formatCurrency(total)}</span>
            </div>
          </section>
        );
      case 2:
        return (
          <section className="bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Medio de pago</h2>
            <p className="text-sm text-gray-600 mb-6">
              Serás redirigido a un tercero para completar el pago. Por favor, selecciona tu medio de pago preferido.
            </p>
            <div className="flex justify-center">
              <a
                href="https://www.flow.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Ir a Flow
              </a>
            </div>
          </section>
        );
      case 3:
        return (
          <section className="bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Compra finalizada</h2>
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</span>
            </div>
            <p className="text-sm text-gray-600">
              Gracias por tu compra. Tu pedido está en proceso y será despachado pronto.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleHome}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-6"
              >
                Volver al inicio
              </button>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow p-4 md:p-10 lg:max-w-5xl lg:mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h1>

        {/* Indicador de progreso */}
        <div className="flex items-center justify-between mb-8">
          <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-500"}`}>
            1
          </div>
          <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-500"}`}>
            2
          </div>
          <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-500"}`}>
            3
          </div>
        </div>

        {/* Contenido dinámico */}
        {renderStepContent()}

        {/* Botones de navegación */}
        {step < 3 && (
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
              >
                Anterior
              </button>
            )}
            <button
              onClick={() => setStep(step + 1)}
              className="bg-blue-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Siguiente
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;