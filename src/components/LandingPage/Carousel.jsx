import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import bg1 from "@/assets/Images/Carousel1.png";
import bg2 from "@/assets/Images/Carousel2.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Carousel1 = () => {
  return (
    <div className="container mt-5">
      <Swiper
        navigation={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
        }}
        spaceBetween={400}
        onSlideChange
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={bg1} alt="bg1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={bg2} alt="bg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={bg1} alt="bg1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={bg2} alt="bg2" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel1;
