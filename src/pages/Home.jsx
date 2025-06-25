import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainSlide from '../component/MainSlide';
import '../App.css';
import Header from '../component/Header';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Home() {
  const [data, setData] = useState();
  const [mainContent, setMainContent] = useState(null);
  const [mainType, setMainType] = useState('movie'); 
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
      language: 'ko-KR',
    },
  });

  function allData(t1, t2) {
    return instance.get(`/${t1}/${t2}`);
  }

  const fetchTrailer = (type, id) => {
    instance
      .get(`/${type}/${id}/videos`)
      .then((res) => {
        const trailer = res.data.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);
        else setTrailerKey(null);
      })
      .catch(() => setTrailerKey(null));
  };

  useEffect(() => {
    Promise.all([
      allData('movie', 'popular'),
      allData('movie', 'top_rated'),
      allData('tv', 'popular'),
      allData('tv', 'top_rated'),
    ]).then((results) => {
      const mPop = results[0].data.results;
      const mTop = results[1].data.results;
      const tPop = results[2].data.results;
      const tTop = results[3].data.results;

      setData({ mPop, mTop, tPop, tTop });
      setMainContent(mPop[0]);
      setMainType('movie');
      fetchTrailer('movie', mPop[0].id);
    });
  }, []);

  if (!data || !mainContent) return null;

  const goToDetail = () => {
    navigate(`/detail/${mainContent.id}`);
  };

  const handleWatchTrailer = () => {
    if (trailerKey) setShowTrailer(true);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  const handleMainContentChange = (item, type) => {
    setMainContent(item);
    setMainType(type);
    fetchTrailer(type, item.id);
  };

  return (
    <div className="home">
      <Header />

      <section className="hero-swiper-section" style={{ padding: '40px', backgroundColor: '#000' }}>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          grabCursor={true}
          style={{ paddingBottom: '40px' }}
        >
          {data.mPop.slice(0, 10).map((item) => {
            const backgroundImageUrl = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
            const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

            return (
              <SwiperSlide key={item.id}>
                <div
                  className="hero-slide"
                  style={{
                    position: 'relative',
                    height: '80vh',
                    color: 'white',
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '80px',
                  }}
                >
                  <div className="hero-content" style={{ flex: 1 }}>
                    <h1>{item.title || item.name}</h1>
                    <p style={{ maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.overview}</p>
                    <div className="hero-buttons" style={{ marginTop: '20px' }}>
                      <button className="watch-now" onClick={() => navigate(`/detail/${item.id}`)}>
                        Watch now
                      </button>
                      <button
                        className="watch-trailer"
                        onClick={() => {
                          fetchTrailer('movie', item.id);
                          setShowTrailer(true);
                        }}
                        style={{ marginLeft: '10px' }}
                      >
                        Watch trailer
                      </button>
                    </div>
                  </div>
                  <div className="hero-poster" style={{ flexShrink: 0 }}>
                    <img
                      src={imageUrl}
                      alt={item.title || item.name}
                      style={{ width: '430px', borderRadius: '10px' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      <MainSlide
        title="Trending Movies"
        data={data.mPop}
        type="movie"
        onMainContentChange={handleMainContentChange}
      />
      <MainSlide
        title="Top Rated Movies"
        data={data.mTop}
        type="movie"
        onMainContentChange={handleMainContentChange}
      />
      <MainSlide
        title="Trending TV"
        data={data.tPop}
        type="tv"
        onMainContentChange={handleMainContentChange}
      />
      <MainSlide
        title="Top Rated TV"
        data={data.tTop}
        type="tv"
        onMainContentChange={handleMainContentChange}
      />

      {showTrailer && (
        <div className="trailer-modal">
          <button className="close-btn" onClick={closeTrailer}>
            ×
          </button>
          <div className="trailer-content">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;