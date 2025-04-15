import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Palta Roll',
      price: 4990,
      quantity: 1,
      image:
        'https://cdn-icons-png.flaticon.com/512/1040/1040204.png', // Ajusta la URL a tu icono o imagen
    },
    {
      id: 2,
      name: 'Sésamo Roll',
      price: 6990,
      quantity: 1,
      image:
        'https://cdn-icons-png.flaticon.com/512/1040/1040204.png', // Ajusta la URL a tu icono o imagen
    },
    {
      id: 3,
      name: 'Nori Roll',
      price: 4990,
      quantity: 1,
      image:
        'https://cdn-icons-png.flaticon.com/512/1040/1040204.png', // Ajusta la URL a tu icono o imagen
    },
  ]);

  // Maneja el incremento de la cantidad de un producto
  const handleIncrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Maneja el decremento de la cantidad de un producto
  const handleDecrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Maneja la eliminación de un producto del carrito
  const handleDelete = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  // Calcula el subtotal multiplicando precio * cantidad
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Redirige o ejecuta la acción deseada al pulsar "Ir a pagar"
  const handleCheckout = () => {
    alert('Ir a la página de pago');
    // Aquí podrías hacer window.location.href = "/checkout" o usar react-router
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg max-w-md mx-auto shadow-lg relative w-11/12 mt-4">
      {/* Título */}
      <h2 className="text-xl font-bold mb-5 text-center">Carrito</h2>

      {/* Lista de ítems del carrito */}
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md flex-wrap gap-2"
          >
            {/* Imagen del producto */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md mr-3"
            />

            {/* Nombre y precio */}
            <div className="flex-1 min-w-[120px]">
              <p className="text-base font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">
                ${item.price.toLocaleString('es-CL')}
              </p>
            </div>

            {/* Botones +, - y cantidad */}
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-200 rounded-md px-2 font-bold"
                onClick={() => handleDecrement(item.id)}
              >
                -
              </button>
              <p className="w-6 text-center">{item.quantity}</p>
              <button
                className="bg-gray-200 rounded-md px-2 font-bold"
                onClick={() => handleIncrement(item.id)}
              >
                +
              </button>
            </div>

            {/* Botón para borrar el ítem */}
            <button
              className="text-white bg-red-600 rounded-md px-2 py-1"
              onClick={() => handleDelete(item.id)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {/* Subtotal y botón para pagar */}
      <div className="mt-4 flex flex-col items-end">
        <p className="text-lg font-semibold mb-2">
          Subtotal: ${subtotal.toLocaleString('es-CL')}
        </p>
        <button
          className="px-4 py-2 bg-blue-900 text-white rounded-lg text-base w-full"
          onClick={handleCheckout}
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
};

export default Cart;
