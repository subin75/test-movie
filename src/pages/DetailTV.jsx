import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../Detail.css';

function DetailTV() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${id}`, {
        params: {
          api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
          append_to_response: 'credits,videos,similar',
          language: 'ko-KR',
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const {
    name,
    overview,
    genres,
    poster_path,
    credits,
    videos,
    similar,
  } = data;

  const cast = credits?.cast?.slice(0, 5);
  const trailer = videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const similarTVs = similar?.results?.slice(0, 6); // 최대 6개

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={name}
          />
        </div>
        <div className="info">
          <h1 className="name">{name}</h1>
          <div className="genres">
            {genres.map((genre) => (
              <span className="genre-tag" key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <p className="overview">{overview}</p>
          <h2>Casts</h2>
          <div className="cast-list">
            {cast?.map((actor) => (
              <div key={actor.id} className="cast-item">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : 'https://via.placeholder.com/185x278?text=No+Image'
                  }
                  alt={actor.name}
                />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {trailer && (
        <div className="trailer-full">
          <h2>Trailer</h2>
          <div className="trailer-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {similarTVs?.length > 0 && (
        <div className="similar-section">
          <h2>Similar TV Shows</h2>
          <div className="similar-movie-list">
            {similarTVs.map((tv) => (
              <Link to={`/tvdetail/${tv.id}`} key={tv.id} className="similar-movie-item">
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/w200${tv.poster_path}`
                      : 'https://via.placeholder.com/200x300?text=No+Image'
                  }
                  alt={tv.name}
                />
                <p>{tv.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailTV;