import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

function MainSlide({title,data,type}) {
    
    
  return (
    <div className="mainname">
        <h2>
            {title}
            <button>view more</button>
        </h2>

        <Swiper
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            data.map((item)=>
                <SwiperSlide key={item.id}>
                    <p> 
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                        {type=='movie'? item.title : item.name} 
                    </p>
                </SwiperSlide>
            )
        }   

        
        
      </Swiper>

         
    </div>
  )
}

export default MainSlide