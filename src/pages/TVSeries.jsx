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

  // 초기 인기 TV 시리즈 불러오기
  useEffect(() => {
    const fetchPopularTV = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR`
        );
        setTvSeries(res.data.results);
        setIsSearching(false);
      } catch (error) {
        console.error('TV 시리즈 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTV();
  }, []);

  // 검색 처리 함수
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR`
        );
        setTvSeries(res.data.results);
      } catch (error) {
        console.error('TV 시리즈 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      setIsSearching(true);
      const res = await axios.get(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
          searchTerm
        )}`
      );
      setTvSeries(res.data.results);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      setLoading(false);
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

      {loading ? (
        <p style={{ color: 'white' }}>로딩 중...</p>
      ) : tvSeries.length === 0 ? (
        <p style={{ color: 'white' }}>{isSearching ? '검색 결과가 없습니다.' : 'TV 시리즈가 없습니다.'}</p>
      ) : (
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
      )}
    </div>
  );
}

export default TVSeries;