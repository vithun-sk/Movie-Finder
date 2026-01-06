import React, { useEffect, useState } from "react";
import "./Searchmovies.css";
import { fetchMovies } from "../../services/api";
import { FaSearch } from "react-icons/fa";

const API_KEY = "60f32e9f4ccbea87a65c980c191560dc";
const BASE_URL = "https://api.themoviedb.org/3";

function Searchmovies({ likedMovies, setLikedMovies }) {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [Movies, setMovies] = useState([]);
  const [SelectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies("movie/popular", 1);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (!SelectedMovie) {
      return;
    }
    const fetchMovieData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${SelectedMovie.id}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    fetchMovieData();
  }, [SelectedMovie]);

  const searchInputValue = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    try {
      let movieMap = new Map();
      for (let page = 1; page <= 10; page++) {
        const data = await fetchMovies("search/movie", page, searchInput);
        data.forEach((movie) => {
        movieMap.set(movie.id, movie);
        });
      }
      setMovies([...movieMap.values()]);
    } catch (error) {
      console.error("Error Fetching in Searching ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search_box">
        <div>
          <input
            placeholder="Search Movies"
            type="text"
            className="search_input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput.trim() !== "" && (
            <button className="search_button" onClick={searchInputValue}>
               <FaSearch />
            </button>
          )}
        </div>
      </div>
      {SelectedMovie && movieDetails && (
        <div className="movie-overlay">
          <div className="movie-inner-overlay">
            <button
              onClick={() => {
                setSelectedMovie(null);
                setMovieDetails(null);
              }}
              className="close-btn"
            >
              X
            </button>
            <div className="movie-panel">
              <section className="panel-img">
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
              </section>
              <section className="panel-details">
                <div>
                  <p>
                    <b>Name of the Movie : </b>
                    {movieDetails.title}
                  </p>
                  <p>
                    <b>Release Date : </b>
                    {movieDetails.release_date}
                  </p>
                  <p>
                    <b>Runtime : </b> {movieDetails.runtime} mins
                  </p>
                  <p>
                    <b>Rating : </b> ⭐ {movieDetails.vote_average} / 10
                  </p>
                  <p>
                    <b>Genres : </b>
                    {movieDetails.genres.map((g) => g.name).join(", ")}
                  </p>
                  <p>
                    <b>Description : </b>{" "}
                    <span style={{ textAlign: "center" }}>
                      {movieDetails.overview}
                    </span>
                  </p>
                  <p>
                    <b>Budget : </b>{" "}
                    {movieDetails.budget === 0 ? "N/A" : movieDetails.budget}
                  </p>
                  <p>
                    <b>Revenue : </b>{" "}
                    {movieDetails.revenue === 0 ? "N/A" : movieDetails.revenue}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      <div className="movie_container">
        {loading ? (
          <p className="loadingMovies">Loading Movies......</p>
        ) : Movies.length > 0 ? (
          Movies.map((movie) => (
            <MovieList
              key={movie.id}
              movie={movie}
              showMovieInfo={() => setSelectedMovie(movie)}
              setLikedMovies={setLikedMovies}
              likedMovies={likedMovies}
            />
          ))
        ) : (
          <p className="noMoviesFound">No Movies Found 😕</p>
        )}
      </div>
    </>
  );
}
// To See the Images of the Popular Movies and Searched Movies

function MovieList({ movie, showMovieInfo, setLikedMovies, likedMovies }) {
  const isLiked = likedMovies?.some((m) => m.id === movie.id) || false;
  const toggleFavourite = () => {
    setLikedMovies((prev) => {
      if (isLiked) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <>
      <div className="movie_card">
        <div className="movie_img">
          <img
            loading="lazy"
            src={
              movie.poster_path !== "N/A"
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/200x300"
            }
            alt={movie.title}
            className="movie_poster"
          />
          <button
            onClick={toggleFavourite}
            className={`favorite_btn ${
              isLiked ? "liked_anime" : "notliked_anime"
            }`}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
          <button className="details-btn" onClick={showMovieInfo}>
            More info {">>"}
          </button>
        </div>
        <div className="movie_details">
          <h4 className="movie_Title">{movie.title}</h4>
          <h4 className="movie_year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </h4>
        </div>
      </div>
    </>
  );
}

export default Searchmovies;
