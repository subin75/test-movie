import React, { useState, useEffect } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header';

const API_KEY = 'f89a6c1f22aca3858a4ae7aef10de967';
const BASE_URL = 'https://api.themoviedb.org/3';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(1, false);  // 초기 데이터 1페이지 로드
  }, []);

  // 영화 데이터 요청 함수
  const fetchMovies = async (pageNum, append = true) => {
    setLoading(true);
    try {
      let url = '';
      if (searchTerm.trim() === '') {
        url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${pageNum}`;
      } else {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(searchTerm)}&page=${pageNum}`;
      }
      const res = await axios.get(url);
      setTotalPages(res.data.total_pages);

      if (append) {
        setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
      } else {
        setMovies(res.data.results);
      }
      setPage(pageNum);
    } catch (error) {
      console.error('영화 데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  // 검색 처리 함수 (검색어 변경 시 페이지 1부터 다시 로드)
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      fetchMovies(1, false);
    } else {
      setIsSearching(true);
      fetchMovies(1, false);
    }
  };

  // '더 보기' 버튼 클릭 핸들러
  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchMovies(page + 1, true);
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
        <p>로딩 중...</p>
      ) : movies.length === 0 ? (
        <p>{isSearching ? '검색 결과가 없습니다.' : '영화가 없습니다.'}</p>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <NavLink to={`/detail/${movie.id}`} key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="moviename">{movie.title}</p>
              </NavLink>
            ))}
          </div>

          {loading && page > 1 && <p>더 불러오는 중...</p>}

          {page < totalPages && !loading && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              더 보기
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Movies;