import React from 'react';

interface ProductCardProps {
  imagen: string; // URL de la imagen del producto
  title: string; // Título del producto
  price: string; // Precio del producto (formateado como string)
  onClick: () => void; // Función para manejar el clic en la tarjeta
}

const ProductCard: React.FC<ProductCardProps> = ({ imagen, title, price, onClick }) => {
  return (
    <div
      onClick={onClick} // Llama a la función onClick al hacer clic en la tarjeta
      className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition"
    >
      <img
        src={imagen}
        alt={title}
        className="w-full h-32 object-contain rounded-lg mb-2"
      />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-lg font-semibold mt-2">{price}</p>
    </div>
  );
};

export default ProductCard;