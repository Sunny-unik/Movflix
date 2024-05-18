import { Fragment, useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import reactSvg from "../assets/react.svg";
import getEnvs from "../helpers/getEnvs";

const UserRegistration = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!user) navigate("/");
    else fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        getEnvs().serverUrl + "/booking/" + user._id,
        { withCredentials: true }
      );
      setBookings({ data: data.data, loading: false });
    } catch (error) {
      alert(
        error.message || "Unable to fetch bookings right now, try again later"
      );
      setBookings({ loading: false, error });
    }
  };

  return (
    <div>
      <h2>User Profile Info</h2>
      <div className="card align-items-center">
        <div className="h3 card-body mb-0">Name: {user?.name}</div>
        <div className="h5 card-body">Email: {user?.email}</div>
      </div>
      <div className="my-4"></div>
      <h4>Bookings</h4>
      <div className="card border-0">
        <div className="card-body">
          {!bookings.loading ? (
            <>
              {bookings.data ? (
                <div className="table-responsive">
                  <table className="table border">
                    <thead>
                      <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Year</th>
                        <th>Movie Hall</th>
                        <th>Show Starts</th>
                        <th>Show End</th>
                        <th>Seat Numbers</th>
                        <th>Payment Method</th>
                        <th>Visit Movie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.data.length ? (
                        bookings.data.map(
                          ({ _id, movieId: movie, seats, paymentMethod }) => (
                            <tr key={_id}>
                              <td>
                                <img
                                  src={
                                    movie.Poster === "N/A" || !movie.Poster
                                      ? reactSvg
                                      : movie.Poster
                                  }
                                  alt={movie.Title}
                                  height={200}
                                  width={150}
                                />
                              </td>
                              <td>{movie.Title}</td>
                              <td>{movie.Type}</td>
                              <td>{movie.Year}</td>
                              {movie.showTimings.map((show) =>
                                show.bookingIds.includes(_id) ? (
                                  <Fragment key={"show-" + show.id}>
                                    <td>{show.hall}</td>
                                    <td>
                                      {new Date(show.startTime)
                                        .toDateString()
                                        .split(" ")
                                        .join("/")
                                        .replace("/", " ") +
                                        " " +
                                        new Date(
                                          show.startTime
                                        ).toLocaleTimeString()}
                                    </td>
                                    <td>
                                      {new Date(show.endTime)
                                        .toDateString()
                                        .split(" ")
                                        .join("/")
                                        .replace("/", " ") +
                                        " " +
                                        new Date(
                                          show.endTime
                                        ).toLocaleTimeString()}
                                    </td>
                                  </Fragment>
                                ) : null
                              )}
                              <td>{seats.join(" | ")}</td>
                              <td>{paymentMethod}</td>
                              <td>
                                <Link
                                  className="btn btn-primary"
                                  to={"/movie/" + movie._id}
                                >
                                  Goto Movie
                                </Link>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <h3 className="text-center p-2">
                          You have not booked any for now
                        </h3>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h2 className="text-center border p-4 text-danger">
                  Error: {bookings.error?.message || "Internal Server Error"}
                </h2>
              )}
            </>
          ) : (
            <h2 className="text-center border p-4 text-secondary">
              loading...
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
