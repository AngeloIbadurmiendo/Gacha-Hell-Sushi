import React, { useState } from 'react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to the cart.`);
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
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-fill rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
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