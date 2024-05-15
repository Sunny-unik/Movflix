import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import reactSvg from "../assets/react.svg";
import getEnvs from "../helpers/getEnvs";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = getEnvs();

  useEffect(() => {
    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(serverUrl + `/movie/${id}`);
      setMovie(response.data.data);
      setLoading(false);
    } catch (error) {
      const msg = "Error fetching movie details: " + error.message;
      console.error(msg);
      setLoading(false);
      alert(msg);
    }
  };

  return (
    <div>
      <h2>Movie Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        movie && (
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
              <button
                className="btn btn-primary float-end"
                to={`/movie/${movie._id}`}
              >
                Book Now
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MovieDetails;
