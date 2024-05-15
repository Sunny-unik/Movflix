/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import reactSvg from "../assets/react.svg";
import getEnvs from "../helpers/getEnvs";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = getEnvs();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(serverUrl + "/movie");
      setMovies(response.data.data);
      setLoading(false);
    } catch (error) {
      const msg = "Error fetching movies: " + error.message;
      console.log(msg);
      setLoading(false);
      alert(msg);
    }
  };

  return (
    <div>
      <h2>Movie Listings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {movies.map((movie) => (
            <div className="col" key={movie._id}>
              <div className="card">
                <img
                  src={
                    movie.Poster === "N/A" || !movie.Poster
                      ? reactSvg
                      : movie.Poster
                  }
                  className="card-img-top"
                  alt={movie.Title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Type: {movie.Type}</p>
                  <p className="card-text">Year: {movie.Year}</p>
                  <NavLink
                    className="btn btn-primary float-end"
                    to={`/movie/${movie._id}`}
                  >
                    Visit
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
