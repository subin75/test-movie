import React, { useState, useEffect } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header';

const API_KEY = 'f89a6c1f22aca3858a4ae7aef10de967';
const BASE_URL = 'https://api.themoviedb.org/3';

function TVSeries() {
  const [tvSeries, setTvSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // 초기 인기 TV 시리즈 불러오기 (page 1)
    fetchTVSeries(1, false, '');
  }, []);

  const fetchTVSeries = async (pageNum, isLoadMore, query) => {
    setLoading(true);
    try {
      const url =
        query.trim() === ''
          ? `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=${pageNum}`
          : `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
              query
            )}&page=${pageNum}`;
      const res = await axios.get(url);

      if (isLoadMore) {
        setTvSeries((prev) => [...prev, ...res.data.results]);
      } else {
        setTvSeries(res.data.results);
      }

      setTotalPages(res.data.total_pages);
      setPage(pageNum);
      setIsSearching(query.trim() !== '');
    } catch (error) {
      console.error('TV 시리즈 데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchTVSeries(1, false, searchTerm);
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      fetchTVSeries(page + 1, true, searchTerm);
    }
  };

  return (
    <div className="movies-page" style={{ backgroundColor: 'black' }}>
      <Header />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && page === 1 ? (
        <p style={{ color: 'white' }}>로딩 중...</p>
      ) : tvSeries.length === 0 ? (
        <p style={{ color: 'white' }}>
          {isSearching ? '검색 결과가 없습니다.' : 'TV 시리즈가 없습니다.'}
        </p>
      ) : (
        <>
          <div className="movie-grid">
            {tvSeries.map((tv) => (
              <NavLink to={`/tvdetail/${tv.id}`} key={tv.id} className="movie-card">
                <img
                  src={tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : ''}
                  alt={tv.name}
                />
                <p className="moviename">{tv.name}</p>
              </NavLink>
            ))}
          </div>

          {page < totalPages && (
            <div style={{ textAlign: 'center', margin: '20px' }}>
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loading}
                style={{ padding: '10px 20px', fontSize: '16px' }}
              >
                {loading ? '로딩 중...' : '더보기'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TVSeries;