import { useEffect, useState } from "react";
import getEnvs from "../helpers/getEnvs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import reactSvg from "../assets/react.svg";

const AdminPanel = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = getEnvs();

  useEffect(() => {
    if (!user || !user.admin) navigate("/");
    else fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  const handleMovieDelete = async (movieId, name) => {
    const confirmDelete = confirm("Do you want to delete " + name);
    if (!confirmDelete) return;
    try {
      const { data } = await axios.delete(serverUrl + "/movie/" + movieId, {
        withCredentials: true,
      });
      if (!data?.message.toLowerCase().includes("success"))
        throw new Error(data?.message || "Internal Server Error");
      alert(data.message);
      setMovies((movies) => movies.filter((m) => m._id !== movieId));
    } catch (error) {
      alert(error.message || "Internal Server Error");
    }
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col">
          <h2>Admin Panel - Manage Movies</h2>
          <Link to="/admin/movie/new" className="btn btn-primary float-end">
            Add New Movie
          </Link>
        </div>
      </div>
      {!loading ? (
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table border">
                <thead>
                  <tr>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id}>
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
                      <td>
                        <Link
                          to={"/admin/movie/edit/" + movie._id}
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleMovieDelete(movie._id, movie.Title)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h5>loading...</h5>
      )}
    </div>
  );
};

export default AdminPanel;
