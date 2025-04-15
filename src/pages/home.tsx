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

const best_sellers: Product[] = [
  {
    id: 1,
    name: 'Sushi Roll',
    description: 'Delicious sushi roll with fresh ingredients.',
    price: 15000,
    image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
  },
  {
    id: 2,
    name: 'Sushi Deluxe',
    description: 'Premium sushi platter with assorted rolls.',
    price: 20000,
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

  return (
    <div className="container m-auto max-w-screen-xl relative bg-gradient-to-r from-transparent via-white to-transparent">
      <h1>Los más vendidos</h1>
      <Swiper
        className="swiper-custom-style"
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{
          padding: 35,
          paddingBottom: '70px',
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {best_sellers.map((product, index) => (
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