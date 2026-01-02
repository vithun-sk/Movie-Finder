import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import image1 from "./home-moviesimg/image1.png";
import image2 from "./home-moviesimg/image2.png";
import image3 from "./home-moviesimg/image3.png";
import image4 from "./home-moviesimg/image4.png";
import image5 from "./home-moviesimg/image5.png";
import image6 from "./home-moviesimg/image6.png";
import image7 from "./home-moviesimg/image7.png";
import image8 from "./home-moviesimg/image8.png";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="section1">
        <div className="image-slider">
        {[image1 , image2 , image3, image4, image5, image6, image7, image8 ,
          image1 , image2 , image3, image4, image5, image6, image7, image8
         ].map((img,index)=> <img key={index} src={img} alt="movie-image" className="sliding-img"/>)}
        </div>
      </section>
      <section>
        <div className="home_content">
          <h2 className="home_head">Discover Your Next Favorite Movie</h2>
          <p className="home_content1">
            <i>Movie<span style={{color:"cyan"}}>Finder</span> </i> helps you explore thousands of movies with ease.
            Search by name, discover trending movies, check ratings, view
            posters, and learn more about every film in seconds.
          </p>
          <h3 className="home_content2">Start your movie journey now!</h3>

          <div className="search_btn_parent">
            <button className="search_btn" onClick={() => navigate("/search")}>
              🔍 Discover Movies
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
