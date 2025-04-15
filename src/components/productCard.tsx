import React from 'react';
import { Link } from 'react-router-dom';

interface PlanCardProps {
  imagen: string;
  title: string;
  price: string;
}

const productCard: React.FC<PlanCardProps> = ({ title, price,imagen}) => {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 max-w-sm mx-auto">

      {/* Contenido */}
      <div className="p-6">
        <img src={imagen} alt="Imagen del producto" className="w-full h-32 object-fill mb-4 rounded-lg" />
        {/* Título y precio */}
        <h2 className="text-gray-800 text-xl font-bold">{title}</h2>
        <p className="text-2xl font-bold text-gray-800 mb-2">{price}</p>
        {/* Botón */}
        <Link to="/contacto" className="bg-secondary text-white w-full py-2 rounded-md hover:bg-orange-700 transition-colors text-center block">
          AGREGAR
        </Link>
      </div>
    </div>
  );
};

export default productCard;