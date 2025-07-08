import React, { useState } from 'react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    _id: string;
    nombre: string;
    descripcion: string;
    precioBase: number;
    descuento?: number;
    imagenURL: string;
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
  // Leer el carrito actual
  const cartStr = localStorage.getItem("cart");
  let cart = cartStr ? JSON.parse(cartStr) : [];

  // Buscar si ya existe el producto en el carrito (usa _id)
  const existingIndex = cart.findIndex((item: any) => item._id === product._id);

  if (existingIndex !== -1) {
    // Sumar la cantidad
    cart[existingIndex].quantity += quantity;
  } else {
    // Agregar como nuevo
    cart.push({
      _id: product._id,
      nombre: product.nombre,
      precioBase: product.precioBase,
      imagenURL: product.imagenURL,
      quantity: quantity
    });
  }

  // Guardar actualizado
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
  onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Product Details */}
        <div className="p-4">
          <img
            src={product.imagenURL}
            alt={product.nombre}
            className="w-full h-48 object-contain rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold">{product.nombre}</h2>
          <p className="text-gray-600">{product.descripcion}</p>
          <p className="text-lg font-semibold mt-2">${product.precioBase.toFixed(2)}</p>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
