// En vez de los mocks bestSellers, discountsToday, etc:
import { useEffect, useState } from 'react';
import ProductCard from '../components/productCard';
import ProductModal from '../components/product_modal';

interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precioBase: number;
  descuento: number;
  disponibilidad: number;
  imagenURL: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Nuevo: cargar productos reales
  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container m-auto max-w-screen-xl relative bg-gradient-to-r from-transparent via-white to-transparent">
      <h1 className="text-2xl font-semibold mb-4">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            imagen={product.imagenURL}
            title={product.nombre}
            price={`$${product.precioBase}`}
            onClick={() => handleOpenModal(product)}
          />
        ))}
      </div>
      {/* Modal de producto */}
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Home;
