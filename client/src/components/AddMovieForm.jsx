import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getEnvs from "../helpers/getEnvs";

function AddMovieForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    Title: "",
    Type: "",
    Year: "",
    Poster: "",
  });
  const { serverUrl } = getEnvs();

  useEffect(() => {
    if (!user || !user.admin) navigate("/");
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(serverUrl + "/movie/", formData);
      if (!data.message.toLowerCase().includes("success"))
        throw new Error(data.error || "Internal server error");
      alert(data.message);
      setFormData({
        Title: "",
        Type: "",
        Year: "",
        Poster: "",
      });
    } catch (error) {
      alert(error.message || "Internal server error, try again later");
    }
  };

  return (
    <div className="container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Type" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control"
            id="Type"
            name="Type"
            value={formData.Type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Year" className="form-label">
            Year
          </label>
          <input
            type="text"
            className="form-control"
            id="Year"
            name="Year"
            value={formData.Year}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Poster" className="form-label">
            Poster
          </label>
          <input
            type="text"
            className="form-control"
            id="Poster"
            name="Poster"
            value={formData.Poster}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddMovieForm;
