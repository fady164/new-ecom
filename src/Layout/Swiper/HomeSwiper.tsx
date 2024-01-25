import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./styles.module.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const { swiper, swiperSlide, swiperSlideImg } = styles;
const HomeSwiper = () => {
  const swiperImgs: string[] = [
    "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1502466650593-b65a2c690da0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <Swiper
      navigation={true}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Navigation, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className={swiper}
    >
      {swiperImgs.map((img, index) => (
        <SwiperSlide className={swiperSlide} key={index}>
          <img className={swiperSlideImg} src={img} alt={`img-${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSwiper;
