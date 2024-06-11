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
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 50,
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
          <Image src={tshirt} alt="tshirt" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={shoes} alt="shoes" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={jacket} alt="jacket" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={shorts} alt="shorts" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={pants} alt="pants" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={formalsuit} alt="formalsuit" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={socks} alt="socks" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={handbag} alt="handbag" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={watch} alt="watch" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={tie} alt="tie" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={dress} alt="dress" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={glasses} alt="glasses" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel2;
