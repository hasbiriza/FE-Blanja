import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import bg1 from "@/assets/Images/Carousel1.png";
import bg2 from "@/assets/Images/Carousel2.png";
import jacket from "@/assets/Images/jacket.png";
import pants from "@/assets/Images/pants.png";
import shoes from "@/assets/Images/shoes.png";
import shorts from "@/assets/Images/shorts.png";
import tshirt from "@/assets/Images/tshirt.png";
import watch from "@/assets/Images/watch.png";
import tie from "@/assets/Images/tie.png";
import socks from "@/assets/Images/socks.png";
import handbag from "@/assets/Images/handbag.png";
import formalsuit from "@/assets/Images/formalsuit.png";
import dress from "@/assets/Images/dress.png";
import glasses from "@/assets/Images/glasses.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Carousel2 = () => {
  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h1 className="m-0 text-2xl font-bold">Category</h1>{" "}
        <p className="text-muted">What are you currently looking for? </p>
      </div>
      <Swiper
        navigation={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
        }}
        // spaceBetween={50}
        onSlideChange
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          400: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          980: {
            slidesPerView: 5,
            spaceBetween: 70,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide >
          <Image src={tshirt} alt="bg1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={shoes} alt="bg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={jacket} alt="bg1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={shorts} alt="bg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={pants} alt="bg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={formalsuit} alt="bg1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={socks} alt="bg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={handbag} alt="bg1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={watch} alt="bg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={tie} alt="bg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={dress} alt="bg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={glasses} alt="bg2" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel2;
