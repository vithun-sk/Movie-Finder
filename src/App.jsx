import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home/Home";
import SearchMovies from "./pages/Search/Searchmovies";
import TopMovies from "./pages/TopMovies/Topmovies";
import Favourites from "./pages/Favourites/Favourites.jsx";


function App() {
  const[ likedMovies , setLikedMovies ]= useState([])
  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<SearchMovies likedMovies={likedMovies}  setLikedMovies={setLikedMovies} />}></Route>
          <Route
            path="/topmovies"
            element={<TopMovies likedMovies={likedMovies}  setLikedMovies={setLikedMovies}/>}
          ></Route>
          <Route path="/favourites" element={< Favourites likedMovies={likedMovies}  setLikedMovies={setLikedMovies}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
