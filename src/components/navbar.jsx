import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {

 const[menuOpen , setMenuOpen] = useState(false)

  return (
    <nav>
      <h1 className="nav_head">
        <i>Movie</i>
        <i style={{ color: "cyan" }}>Finder</i>
      </h1>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
       {menuOpen ? "✕" : "☰"}
      </div>

      <ul className={ `nav_lists ${menuOpen ? "show" : ""}`}>
        <li>
          <NavLink to="/" className="nav_link">
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className="nav_link">
            <span>Search Movies</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/topmovies" className="nav_link">
            <span>Top Movies</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/favourites" className="nav_link">
            <span>Favourites</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
