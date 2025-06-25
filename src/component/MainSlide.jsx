import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { NavLink, useNavigate } from 'react-router-dom';

function MainSlide({ title, data, type }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    if (type === 'movie') {
      navigate('/movies');
    } else if (type === 'tv') {
      navigate('/tv');
    }
  };

  return (
    <div className="main-slide-container">
      <div className="main-slide-header">
        <h2>{title}</h2>
        <button className="view-more-btn" onClick={handleViewMore}>
          view more
        </button>
      </div>

      <Swiper
        slidesPerView={6}
        spaceBetween={24}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="main-slide-swiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <NavLink
              to={type === 'tv' ? `/tvdetail/${item.id}` : `/detail/${item.id}`}
              className="slide-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={type === 'movie' ? item.title : item.name}
              />
              <div className="slide-title">
                {type === 'movie' ? item.title : item.name}
              </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainSlide;