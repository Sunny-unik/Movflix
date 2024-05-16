import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import reactSvg from "../assets/react.svg";
import getEnvs from "../helpers/getEnvs";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookSeats, setBookSeats] = useState([]);
  const { serverUrl } = getEnvs();

  useEffect(() => {
    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(serverUrl + `/movie/${id}`);
      if (!response.data.data) throw new Error("Internal Server Error");
      setMovie(response.data.data);
      setBookSeats(Array(response.data.data.showTimings.length).fill(0));
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
          <div className="row">
            <img
              src={
                movie.Poster === "N/A" || !movie.Poster
                  ? reactSvg
                  : movie.Poster
              }
              className="col-lg-6"
              alt={movie.Title}
            />
            <div className="px-2 card-body col-lg-6">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">
                Type: {movie.Type} | Year: {movie.Year}
              </p>
              {movie.showTimings.map((show, i) => {
                return (
                  <div key={show._id} className="p-3 border rounded text-end">
                    <h5 className="card-title">At: {show.hall}</h5>
                    <p className="card-title">
                      Start:&nbsp;
                      {new Date(show.startTime)
                        .toDateString()
                        .split(" ")
                        .join("/")
                        .replace("/", " ") +
                        " " +
                        new Date(show.startTime).toLocaleTimeString()}
                    </p>
                    <p className="card-title">
                      End:&nbsp;
                      {new Date(show.endTime)
                        .toDateString()
                        .split(" ")
                        .join("/")
                        .replace("/", " ") +
                        " " +
                        new Date(show.endTime).toLocaleTimeString()}
                    </p>
                    <p>
                      Booked Seats: {show.bookedSeats}/{show.totalSeats}
                    </p>
                    <p>
                      <button
                        className="btn btn-danger"
                        {...(bookSeats[i] <= 0 ? { disabled: true } : {})}
                        onClick={() => {
                          const updatedSeats = [...bookSeats];
                          updatedSeats[i] = bookSeats[i] - 1;
                          setBookSeats(updatedSeats);
                        }}
                      >
                        -
                      </button>
                      <span className="mx-2">{bookSeats[i]} Seats</span>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          const updatedSeats = [...bookSeats];
                          updatedSeats[i] = bookSeats[i] + 1;
                          setBookSeats(updatedSeats);
                        }}
                        {...(bookSeats[i] >= show.totalSeats
                          ? { disabled: true }
                          : {})}
                      >
                        +
                      </button>
                    </p>
                    <button
                      className="btn btn-primary"
                      to={`/movie/${movie._id}`}
                    >
                      Book Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MovieDetails;
