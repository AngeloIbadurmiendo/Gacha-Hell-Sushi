import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import PlanCard from '../components/productCard';
import '../index.css';

const best_sellers = [
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi1',
    price: '$15.000',

  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi2',
    price: '$20.000',

  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi3',
    price: '$25.000',
  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi4',
    price: '$30.000',
  },
];
const plans1 = [
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi1',
    price: '$15.000',

  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi2',
    price: '$20.000',

  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi3',
    price: '$25.000',
  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi4',
    price: '$30.000',
  },
];
const plans2 = [
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi1',
    price: '$15.000',

  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi2',
    price: '$20.000',

  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi3',
    price: '$25.000',
  },
  { 
    imagen: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png',
    title: 'sushi14',
    price: '$30.000',
  },
];




const Home = () => {
  return (
    
    <div className="container m-auto max-w-screen-xl relative bg-gradient-to-r from-transparent via-white to-transparent">
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
          pagination={{ clickable: true}}
        >
          {best_sellers.map((plan, index) => (
            <SwiperSlide key={index}>
                <PlanCard {...plan} />
            </SwiperSlide>
          ))}
        </Swiper>
        

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
          pagination={{ clickable: true}}
        >
          {plans1.map((plan, index) => (
            <SwiperSlide key={index}>
                <PlanCard {...plan} />
            </SwiperSlide>
          ))}
        </Swiper>

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
          pagination={{ clickable: true}}
        >
          {plans2.map((plan, index) => (
            <SwiperSlide key={index}>
                <PlanCard {...plan} />
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
  );
}

export default Home