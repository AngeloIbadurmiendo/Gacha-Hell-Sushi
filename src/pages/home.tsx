import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../components/productCard';
import ProductModal from '../components/product_modal';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Productos de ejemplo para cada sección
const bestSellers: Product[] = [
  {
    id: 1,
    name: 'Sushi Roll',
    description: 'Sushi con ingredientes A y B',
    price: 15000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
  {
    id: 2,
    name: 'Sushi Deluxe',
    description: 'Sushi con ingredientes C y D',
    price: 20000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
  {
    id: 9,
    name: 'Nori Roll',
    description: 'Sushi con ingredientes G y H',
    price: 20000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
];

const discountsToday: Product[] = [
  {
    id: 3,
    name: 'Tabla Nigiri',
    description: 'Contiene rolls A, B y C',
    price: 12000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
  {
    id: 4,
    name: 'Tabla Tempura',
    description: 'Contiene rolls D, E y F',
    price: 10000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
  {
    id: 8,
    name: 'California Roll',
    description: 'Sushi con ingredientes C y D',
    price: 10000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
];

const sharingTables: Product[] = [
  {
    id: 5,
    name: 'Tabla Fukushima',
    description: 'Potente',
    price: 35000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
  {
    id: 6,
    name: 'Tabla Nagasaki',
    description: 'Explosiva',
    price: 40000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
  {
    id: 7,
    name: 'Tabla Vegana',
    description: 'Tranqui',
    price: 40000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
];

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const renderSection = (title: string, products: Product[]) => (
    <div className="mb-12">
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
      <Swiper
        className="swiper-custom-style"
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ padding: 35, paddingBottom: '70px' }}
        navigation
        pagination={{ clickable: true }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard
              imagen={product.image}
              title={product.name}
              price={`$${product.price}`}
              onClick={() => handleOpenModal(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <div className="container m-auto max-w-screen-xl relative bg-gradient-to-r from-transparent via-white to-transparent">
      {renderSection('Los más vendidos', bestSellers)}
      {renderSection('Descuentos de hoy', discountsToday)}
      {renderSection('Tablas para compartir', sharingTables)}

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
