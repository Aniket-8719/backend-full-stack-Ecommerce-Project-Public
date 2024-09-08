import React from 'react';
import landscape from "../assests/slides/landscape.png"
import carosel1 from "../assests/slides/carosel 1.jpg";
import carosel2 from "../assests/slides/carosel 2.jpg";
import carosel3 from "../assests/slides/carosel 3.jpg";
import carosel4 from "../assests/slides/carosel 4.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const slides =[
    landscape,
    carosel1,
    carosel2,
    carosel3,
    carosel4
  ];
export default function Carosal() {
  return (
    <>
 
     <div className='mb-16'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        initialSlide={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[30vh] lg:h-[50vh]"
      >
        {slides.map((d)=>{
            return (
                <SwiperSlide>
            <div className='w-[100%] '>     
          
              <img className='w-full h-[30vh] lg:h-[50vh] ' src={d} alt="carosalImg"></img>
                </div>
           
             </SwiperSlide>
           
            )
            })}        
      </Swiper>
      </div>
    </>
  );
}
