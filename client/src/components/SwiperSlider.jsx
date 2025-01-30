import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/swiper-bundle.css"; // Import Swiper styles

const SwiperSlider = () => {
  const mockupImage =
    "https://res.cloudinary.com/shivsundar/image/upload/v1736787607/social-media/loginPage/u5aflmybzxigtnrz2x2i.png";

  const images = [
    "https://res.cloudinary.com/shivsundar/image/upload/v1736787617/social-media/loginPage/gxaemgxookuq5ovfw91p.png",
    "https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/mso7jr6ir4swoluqxo3g.png",
    "https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/nmkv4n4lqk13g2mjyyx5.png",
    "https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/mxa9dtahp4braqu5owrl.png",
  ];

  return (
   
        <>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Pass modules here
          slidesPerView={1}
          autoplay={{ delay: 2000 }}
          loop
          className="absolute top-0 left-0 z-10"
          >
          {images.map((url, index) => (
              <SwiperSlide
              key={index}
              className="flex justify-center items-center"
              >
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="rounded-lg"
                />
            </SwiperSlide>
          ))}
        </Swiper>
          </>
     
  );
};

export default SwiperSlider;
