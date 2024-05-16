import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import reactSvg from "../assets/react.svg";
import getEnvs from "../helpers/getEnvs";
import { useUser } from "../UserContext";

const MovieDetails = () => {
  const { user } = useUser();
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

  const handleBooking = async ({ target }) => {
    if (!user) return alert("You need to login first");
    try {
      target.innerText = "...loading";
      const { data } = await axios.post(
        serverUrl + `/booking`,
        {
          movieId: movie._id,
          showName: target.name,
          paymentMethod: "PayPal",
          seats:
            bookSeats[target.closest("[data-show-index]").dataset.showIndex],
        },
        { withCredentials: true }
      );
      if (!data.data) throw new Error("Internal Server Error");
      setMovie(data.data.movie);
      setBookSeats(Array(data.data.movie.showTimings.length).fill(0));
      setLoading(false);
    } catch (error) {
      const msg = "Error in booking: " + error.message;
      console.error(msg);
      setLoading(false);
      alert(msg);
    } finally {
      target.innerText = "Book Now";
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
              <h3 className="card-title">{movie.Title}</h3>
              <p className="card-text">
                Type: {movie.Type} | Year: {movie.Year}
              </p>
              {movie.showTimings.map((show, i) => {
                return (
                  <div
                    key={show.hall}
                    className="p-3 border rounded text-end"
                    data-show-index={i}
                  >
                    <h4 className="card-title">At: {show.hall}</h4>
                    <p className="my-2">
                      Start:&nbsp;
                      {new Date(show.startTime)
                        .toDateString()
                        .split(" ")
                        .join("/")
                        .replace("/", " ") +
                        " " +
                        new Date(show.startTime).toLocaleTimeString()}
                    </p>
                    <p className="mb-2">
                      End:&nbsp;
                      {new Date(show.endTime)
                        .toDateString()
                        .split(" ")
                        .join("/")
                        .replace("/", " ") +
                        " " +
                        new Date(show.endTime).toLocaleTimeString()}
                    </p>
                    <p className="mb-2">Total Seats: {show.totalSeats}</p>
                    <p className="mb-2">Booked Seats: {show.bookedSeats}</p>
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
                        {...(bookSeats[i] >= show.totalSeats - show.bookedSeats
                          ? { disabled: true }
                          : {})}
                      >
                        +
                      </button>
                    </p>
                    <button
                      {...(!bookSeats[i] ? { disabled: true } : {})}
                      name={show.hall}
                      className="btn btn-primary"
                      onClick={handleBooking}
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
