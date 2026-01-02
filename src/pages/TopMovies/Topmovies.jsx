import React, { useState } from "react";
import "./Topmovies.css";
import { fetchMovies } from "../../services/api";
import { useEffect } from "react";

const API_KEY = "60f32e9f4ccbea87a65c980c191560dc";
const BASE_URL = "https://api.themoviedb.org/3";

function Topmovies({setLikedMovies , likedMovies}) {
  const [TopRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setloading] = useState(true);

  const [SelectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    const loadMovies = async () => {
      try {
        let allMovies = [];
        const data = await fetchMovies("movie/top_rated", 1);
        allMovies = [...allMovies, ...data];
        setTopRatedMovies(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setloading(false);
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

  return (
    <>
      <div className="topmovies_head">
        <h1>🔥 What's Trending Now</h1>
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
                    <b>Genres : </b>{" "}
                    {movieDetails.genres?.map((g) => g.name).join(", ")}
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
        {loading && <p className="loadingMovies">Loading...</p>}
        {TopRatedMovies.map((movie) => (
          <MovieList
            key={movie.id}
            movie={movie}
            showMovieInfo={() => setSelectedMovie(movie)}
            setLikedMovies={ setLikedMovies}
            likedMovies={likedMovies}
          />
        ))}
      </div>
    </>
  );
}

function MovieList({ movie, showMovieInfo , setLikedMovies ,likedMovies }) {

  const isLiked = likedMovies?.some((m)=>m.id === movie.id)|| false
  const toggleFavourite = () =>{
    setLikedMovies((prev) =>{
      if(isLiked){
        return prev.filter((m) => m.id !== movie.id);
      }else {
        return [...prev, movie];
      }
    })
  }
 
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
            type="button" 
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

export default Topmovies;
