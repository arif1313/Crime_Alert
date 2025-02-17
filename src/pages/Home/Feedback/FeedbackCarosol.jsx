
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './stylesfeedbac.css';

// import required modules
import { Pagination } from 'swiper/modules';
import FeedbackCard from './FeedbackCard';


const FeedbackCarosol = () => {
 
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
    {/*  */}
    <FeedbackCard></FeedbackCard>

</SwiperSlide>
       
       
    
        <SwiperSlide><FeedbackCard></FeedbackCard></SwiperSlide>
        <SwiperSlide><FeedbackCard></FeedbackCard></SwiperSlide>
        <SwiperSlide><FeedbackCard></FeedbackCard></SwiperSlide>
        <SwiperSlide><FeedbackCard></FeedbackCard></SwiperSlide>
        <SwiperSlide><FeedbackCard></FeedbackCard></SwiperSlide>
      </Swiper>
    </>
  );
}

export default FeedbackCarosol