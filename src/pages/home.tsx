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
    image: 'https://www.smartienda.cl/smartwebsite/pruebas/7013/rpa.jpg',
  },
  {
    id: 2,
    name: 'Sushi Deluxe',
    description: 'Sushi con ingredientes C y D',
    price: 20000,
    image: 'https://img.freepik.com/foto-gratis/primer-plano-rollo-sushi-sobre-placa-piedra-negra_181624-22537.jpg?semt=ais_hybrid&w=740',
  },
  {
    id: 9,
    name: 'Nori Roll',
    description: 'Sushi con ingredientes G y H',
    price: 20000,
    image: 'https://www.creativefabrica.com/wp-content/uploads/2023/03/02/Sushi-California-Roll-Single-Slice-62976322-1.png',
  },
];

const discountsToday: Product[] = [
  {
    id: 3,
    name: 'Tabla Nigiri',
    description: 'Contiene rolls A, B y C',
    price: 12000,
    image: 'https://img1.picmix.com/output/stamp/normal/6/8/7/4/2284786_75cf4.png',
  },
  {
    id: 4,
    name: 'Tabla Tempura',
    description: 'Contiene rolls D, E y F',
    price: 10000,
    image: 'https://assets.niusushi.cl/production/images/a755ce26-74fc-4086-b5a3-35e0a30e6c94/large/spicy-sake.webp?1717393871',
  },
  {
    id: 8,
    name: 'California Roll',
    description: 'Sushi con ingredientes C y D',
    price: 10000,
    image: 'https://sushiblues.cl/cdn/shop/files/RollYasai.jpg?v=1710212178',
  },
];

const sharingTables: Product[] = [
  {
    id: 5,
    name: 'Tabla Fukushima',
    description: 'Potente',
    price: 35000,
    image: 'https://w7.pngwing.com/pngs/139/708/png-transparent-california-roll-sashimi-sushi-makizushi-unagi-sushi-food-seafood-recipe-thumbnail.png',
  },
  {
    id: 6,
    name: 'Tabla Nagasaki',
    description: 'Explosiva',
    price: 40000,
    image: 'https://itsu-production-assets.s3.eu-west-2.amazonaws.com/sushi_sustainability_2_194526c4ff.png',
  },
  {
    id: 7,
    name: 'Tabla Vegana',
    description: 'Tranqui',
    price: 40000,
    image: 'https://png.pngtree.com/png-clipart/20240316/original/pngtree-japanese-sushi-food-png-image_14602804.png',
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
